const config = require("../config/server"); const { findRoleByName } = require("../utils/find");
const activity = new Map();
function isStaff(member) { return config.automod.ignoredRoleNames.some(n => member.roles.cache.some(r => r.name.toLowerCase() === n.toLowerCase())); }
async function handleAutomod(message) {
  if (!config.automod.enabled || !message.guild || message.author.bot || isStaff(message.member)) return false;
  const content = message.content.trim(); const mentions = message.mentions.users.size + message.mentions.roles.size;
  let reason = null;
  if (config.automod.blockedInviteRegex.test(content)) reason = "lien d’invitation Discord interdit";
  else if (mentions > config.automod.maxMentions) reason = "trop de mentions";
  const key = `${message.guild.id}:${message.author.id}`; const now = Date.now();
  const state = activity.get(key) || { times: [], last: "", duplicates: 0 };
  state.times = state.times.filter(t => now - t < config.automod.spamWindowMs); state.times.push(now);
  state.duplicates = state.last === content ? state.duplicates + 1 : 1; state.last = content; activity.set(key, state);
  if (!reason && (state.times.length >= config.automod.spamMessageLimit || state.duplicates >= config.automod.duplicateLimit)) reason = "spam ou messages répétés";
  if (!reason) return false;
  await message.delete().catch(() => null);
  await message.member.timeout(config.automod.timeoutMinutes * 60_000, `Automod MattSlots : ${reason}`).catch(() => null);
  const warning = await message.channel.send(`⚠️ ${message.author}, message supprimé : **${reason}**.`).catch(() => null);
  if (warning) setTimeout(() => warning.delete().catch(() => null), 7000);
  const log = findRoleByName(message.guild, []) && null;
  return true;
}
module.exports = { handleAutomod };
