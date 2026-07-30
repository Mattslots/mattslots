const { MessageFlags } = require("discord.js");
async function safeReply(interaction, content, ephemeral = true) {
  const payload = typeof content === "string" ? { content } : content;
  if (ephemeral) payload.flags = MessageFlags.Ephemeral;
  if (interaction.deferred || interaction.replied) return interaction.followUp(payload).catch(() => null);
  return interaction.reply(payload).catch(() => null);
}
module.exports = { safeReply };
