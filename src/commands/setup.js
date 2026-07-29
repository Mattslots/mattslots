const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require("../config/server");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Affiche l'ordre d'installation recommandé.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(config.brandColor)
      .setTitle("⚙️ Installation MattSlots V5")
      .setDescription("Exécute les commandes dans cet ordre :")
      .addFields(
        { name: "1️⃣ Vérification", value: "`/verification`" },
        { name: "2️⃣ Rôles", value: "`/roles`" },
        { name: "3️⃣ Tickets", value: "`/tickets`" },
        { name: "4️⃣ Permissions", value: "`/permissions`" }
      )
      .setFooter({ text: "Vérifie que le rôle du bot est placé au-dessus des rôles qu'il doit attribuer." });
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
