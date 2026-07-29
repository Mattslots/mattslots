const {
  SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle
} = require("discord.js");
const config = require("../config/server");
const { findTextChannel, findCategory, findRoleByName, normalize } = require("../utils/find");

function ticketButtons() {
  const row = new ActionRowBuilder();
  for (const [key, type] of Object.entries(config.ticketTypes)) {
    row.addComponents(new ButtonBuilder().setCustomId(`ticket:new:${key}`).setLabel(type.label).setEmoji(type.emoji).setStyle(ButtonStyle.Primary));
  }
  return row;
}

function staffRoles(guild) {
  return config.staffRoleNames.map(name => findRoleByName(guild, name)).filter(Boolean);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tickets")
    .setDescription("Installe le panneau de tickets.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = findTextChannel(interaction.guild, config.channelNames.tickets);
    if (!channel) return interaction.reply({ content: "❌ Salon ouvrir-un-ticket introuvable.", ephemeral: true });
    await interaction.deferReply({ ephemeral: true });

    const recent = await channel.messages.fetch({ limit: 50 });
    for (const message of recent.values()) {
      if (message.author.id === interaction.client.user.id && message.components.length) await message.delete().catch(() => {});
    }

    const embed = new EmbedBuilder()
      .setColor(config.brandColor)
      .setTitle("🎫 CENTRE D'AIDE MATTSLOTS")
      .setDescription("Choisis la catégorie correspondant à ta demande. Un membre du staff te répondra dès que possible.")
      .addFields(Object.values(config.ticketTypes).map(type => ({ name: `${type.emoji} ${type.label}`, value: type.description, inline: true })))
      .setFooter({ text: "Un seul ticket ouvert par catégorie et par membre" });

    await channel.send({ embeds: [embed], components: [ticketButtons()] });
    await interaction.editReply(`✅ Panneau de tickets publié dans ${channel}.`);
  },

  async handleButton(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const typeKey = interaction.customId.split(":")[2];
    const type = config.ticketTypes[typeKey];
    if (!type) return interaction.editReply("❌ Type de ticket invalide.");

    const existing = interaction.guild.channels.cache.find(channel =>
      channel.type === ChannelType.GuildText && channel.topic === `ticket:${typeKey}:${interaction.user.id}`
    );
    if (existing) return interaction.editReply(`❌ Tu as déjà un ticket de ce type : ${existing}`);

    const category = findCategory(interaction.guild, "support") || findCategory(interaction.guild, "ticket");
    const roles = staffRoles(interaction.guild);
    const overwrites = [
      { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
      { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles] },
      ...roles.map(role => ({ id: role.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages] }))
    ];

    const safeName = normalize(interaction.user.username).replace(/[^a-z0-9-]/g, "").slice(0, 20) || "membre";
    const channel = await interaction.guild.channels.create({
      name: `${typeKey}-${safeName}`,
      type: ChannelType.GuildText,
      parent: category?.id,
      topic: `ticket:${typeKey}:${interaction.user.id}`,
      permissionOverwrites: overwrites,
      reason: `Ticket ${type.label} créé par ${interaction.user.tag}`
    });

    const closeRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("ticket:close").setLabel("Fermer le ticket").setEmoji("🔒").setStyle(ButtonStyle.Danger)
    );
    const embed = new EmbedBuilder()
      .setColor(config.brandColor)
      .setTitle(`${type.emoji} Ticket ${type.label}`)
      .setDescription(`${interaction.user}, explique ta demande avec le plus de détails possible.\n\nUn membre du staff prendra en charge ton ticket.`)
      .setFooter({ text: `Identifiant : ${interaction.user.id}` })
      .setTimestamp();

    await channel.send({ content: `${interaction.user} ${roles.map(r => r.toString()).join(" ")}`, embeds: [embed], components: [closeRow] });
    await interaction.editReply(`✅ Ton ticket a été créé : ${channel}`);
  },

  async handleClose(interaction) {
    const ownerId = interaction.channel.topic?.split(":")[2];
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const isStaff = config.staffRoleNames.some(name => member.roles.cache.some(role => normalize(role.name) === normalize(name)));
    if (ownerId !== interaction.user.id && !isStaff && !member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({ content: "❌ Seul le créateur du ticket ou le staff peut le fermer.", ephemeral: true });
    }

    await interaction.reply("🔒 Ticket fermé dans **5 secondes**…");
    const logs = findTextChannel(interaction.guild, config.channelNames.ticketLogs);
    if (logs) {
      const embed = new EmbedBuilder()
        .setColor(config.brandColor)
        .setTitle("🔒 Ticket fermé")
        .addFields(
          { name: "Salon", value: interaction.channel.name, inline: true },
          { name: "Fermé par", value: `${interaction.user.tag} (${interaction.user.id})`, inline: true },
          { name: "Propriétaire", value: ownerId ? `<@${ownerId}>` : "Inconnu", inline: true }
        )
        .setTimestamp();
      await logs.send({ embeds: [embed] }).catch(() => {});
    }
    setTimeout(() => interaction.channel.delete("Ticket fermé").catch(() => {}), 5000);
  }
};
