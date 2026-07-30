const store = require("../utils/store"); const config = require("../config/server");
const cooldowns = new Map();
function levelFromXp(xp) { return Math.floor(Math.sqrt(xp / 100)); }
function addXp(message) {
  if (!config.xp.enabled || message.author.bot || !message.guild) return null;
  const key = `${message.guild.id}:${message.author.id}`; const now = Date.now();
  if ((cooldowns.get(key) || 0) > now) return null;
  cooldowns.set(key, now + config.xp.cooldownMs);
  const amount = Math.floor(Math.random() * (config.xp.max - config.xp.min + 1)) + config.xp.min;
  let result;
  store.update(data => {
    const p = data.profiles[key] ||= { xp: 0, messages: 0, giveawaysWon: 0, tickets: 0, joinedAt: now };
    const before = levelFromXp(p.xp); p.xp += amount; p.messages += 1; const after = levelFromXp(p.xp);
    result = { profile: p, leveledUp: after > before, level: after };
  });
  return result;
}
function getProfile(guildId, userId) { const p = store.get().profiles[`${guildId}:${userId}`] || { xp: 0, messages: 0, giveawaysWon: 0, tickets: 0 }; return { ...p, level: levelFromXp(p.xp) }; }
module.exports = { addXp, getProfile, levelFromXp };
