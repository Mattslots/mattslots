const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../config/server");

module.exports = {
  data: new SlashCommandBuilder().setName("status").setDescription("Affiche l'état du bot MattSlots."),
  async execute(interaction) {
    const uptime = Math.floor(process.uptime());
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const embed = new EmbedBuilder()
      .setColor(config.brandColor)
      .setTitle("📊 MattSlots V5")
      .addFields(
        { name: "État", value: "🟢 En ligne", inline: true },
        { name: "Serveur", value: interaction.guild.name, inline: true },
        { name: "Membres", value: String(interaction.guild.memberCount), inline: true },
        { name: "Latence", value: `${interaction.client.ws.ping} ms`, inline: true },
        { name: "Uptime", value: `${days} j ${hours} h ${minutes} min`, inline: true },
        { name: "Version", value: "5.0.0", inline: true }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
