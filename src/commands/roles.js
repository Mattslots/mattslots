const {
  SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle
} = require("discord.js");
const config = require("../config/server");
const { findTextChannel, findRoleByName } = require("../utils/find");

const styles = [ButtonStyle.Danger, ButtonStyle.Success, ButtonStyle.Primary, ButtonStyle.Secondary];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Publie le panneau des rôles personnels.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = findTextChannel(interaction.guild, config.channelNames.roles);
    if (!channel) return interaction.reply({ content: "❌ Salon rôles introuvable.", ephemeral: true });
    await interaction.deferReply({ ephemeral: true });

    const resolved = [];
    for (let i = 0; i < config.selfRoles.length; i += 1) {
      const item = config.selfRoles[i];
      let role = findRoleByName(interaction.guild, item.roleName);
      if (!role) role = await interaction.guild.roles.create({ name: item.roleName, reason: "Auto-rôle MattSlots" });
      resolved.push({ ...item, role, style: styles[i % styles.length] });
    }

    const recent = await channel.messages.fetch({ limit: 50 });
    for (const message of recent.values()) {
      if (message.author.id === interaction.client.user.id && message.components.length) {
        await message.delete().catch(() => {});
      }
    }

    const embed = new EmbedBuilder()
      .setColor(config.brandColor)
      .setTitle("🎭 CHOISIS TES RÔLES")
      .setDescription(
        "Clique sur les boutons pour afficher les salons qui t'intéressent.\n\n" +
        resolved.map(item => `${item.emoji} **${item.label}** — accès aux salons correspondants`).join("\n") +
        "\n\nClique une seconde fois pour retirer le rôle."
      )
      .setFooter({ text: "MattSlots • Sélection des rôles" })
      .setTimestamp();

    const rows = [];
    for (let i = 0; i < resolved.length; i += 5) {
      const row = new ActionRowBuilder();
      for (const item of resolved.slice(i, i + 5)) {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(`selfrole:${item.role.id}`)
            .setLabel(item.label)
            .setEmoji(item.emoji)
            .setStyle(item.style)
        );
      }
      rows.push(row);
    }

    await channel.send({ embeds: [embed], components: rows });
    await interaction.editReply(`✅ Panneau publié dans ${channel}.`);
  },

  async handleButton(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const roleId = interaction.customId.split(":")[1];
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) return interaction.editReply("❌ Ce rôle n'existe plus. Relance `/roles`.");

    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role, "Auto-rôle MattSlots");
      return interaction.editReply(`➖ Le rôle **${role.name}** t'a été retiré.`);
    }
    await member.roles.add(role, "Auto-rôle MattSlots");
    return interaction.editReply(`✅ Le rôle **${role.name}** t'a été ajouté.`);
  }
};
