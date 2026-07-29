const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprime plusieurs messages du salon.")
    .addIntegerOption(o => o.setName("nombre").setDescription("Entre 1 et 100").setRequired(true).setMinValue(1).setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const count = interaction.options.getInteger("nombre", true);
    const deleted = await interaction.channel.bulkDelete(count, true);
    await interaction.editReply(`🧹 **${deleted.size} message(s)** supprimé(s).`);
  }
};
