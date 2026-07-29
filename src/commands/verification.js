const {
  SlashCommandBuilder, PermissionFlagsBits, ChannelType,
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle
} = require("discord.js");
const config = require("../config/server");
const { findTextChannel, findRoleByName, findCategory } = require("../utils/find");

async function getVerifiedRole(guild) {
  let role = findRoleByName(guild, config.verifiedRoleName);
  if (!role) role = await guild.roles.create({ name: config.verifiedRoleName, reason: "Vérification MattSlots" });
  return role;
}

async function getVerificationChannel(guild) {
  let channel = findTextChannel(guild, config.channelNames.verification);
  if (channel) return channel;
  return guild.channels.create({
    name: "✅・vérification",
    type: ChannelType.GuildText,
    parent: findCategory(guild, "accueil")?.id,
    reason: "Installation MattSlots V5"
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verification")
    .setDescription("Installe le panneau de vérification 18+.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const role = await getVerifiedRole(interaction.guild);
    const channel = await getVerificationChannel(interaction.guild);

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      ViewChannel: true, SendMessages: false, AddReactions: false,
      CreatePublicThreads: false, CreatePrivateThreads: false, SendMessagesInThreads: false
    });
    await channel.permissionOverwrites.edit(role, { ViewChannel: false });

    const recent = await channel.messages.fetch({ limit: 50 });
    for (const message of recent.values()) {
      if (message.author.id === interaction.client.user.id && message.components.length) {
        await message.delete().catch(() => {});
      }
    }

    const embed = new EmbedBuilder()
      .setColor(config.brandColor)
      .setTitle("✅ VÉRIFICATION • MATTSLOTS")
      .setDescription([
        "Pour accéder au serveur, clique sur le bouton ci-dessous.",
        "",
        "En validant, tu confirmes :",
        "🔞 avoir **18 ans ou plus** ;",
        "📜 avoir lu et accepté le règlement ;",
        "🤝 respecter les membres et le staff ;",
        "🎰 comprendre les risques liés aux jeux d'argent."
      ].join("\n"))
      .setFooter({ text: "MattSlots • 18+ • Joue de manière responsable" })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("verify:accept")
        .setLabel("J'ai 18 ans et j'accepte")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success)
    );

    await channel.send({ embeds: [embed], components: [row] });
    await interaction.editReply(`✅ Vérification installée dans ${channel}.`);
  },

  async handleButton(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const verifiedRole = findRoleByName(interaction.guild, config.verifiedRoleName);
    const memberRole = interaction.guild.roles.cache.get(config.memberRoleId);
    if (!verifiedRole) return interaction.editReply("❌ Le rôle Vérifié est introuvable. Relance `/verification`.");
    if (!memberRole) return interaction.editReply("❌ Le rôle Membre configuré est introuvable.");

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const roleIds = [verifiedRole.id, memberRole.id].filter(id => !member.roles.cache.has(id));
    if (!roleIds.length) return interaction.editReply("✅ Tu es déjà vérifié.");

    await member.roles.add(roleIds, "Vérification MattSlots");
    await interaction.editReply("✅ Vérification réussie ! Bienvenue dans la communauté MattSlots.");
  }
};
