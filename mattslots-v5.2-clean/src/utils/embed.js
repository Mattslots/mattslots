const { EmbedBuilder } = require("discord.js"); const config = require("../config/server");
function brandEmbed(title, description) { return new EmbedBuilder().setColor(config.brandColor).setTitle(title).setDescription(description).setFooter({ text: `MattSlots • V${config.version} • 18+ • Jouez de manière responsable` }).setTimestamp(); }
module.exports = { brandEmbed };
