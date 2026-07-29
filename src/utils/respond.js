async function safeReply(interaction, payload) {
  const data = typeof payload === "string" ? { content: payload, ephemeral: true } : payload;
  if (interaction.deferred) return interaction.editReply(data);
  if (interaction.replied) return interaction.followUp(data);
  return interaction.reply(data);
}

module.exports = { safeReply };
