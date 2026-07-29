const store = require("../utils/store"); const { brandEmbed } = require("../utils/embed"); const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const timers = new Map();
function schedule(client, giveaway) { const delay = Math.max(0, giveaway.endsAt - Date.now()); clearTimeout(timers.get(giveaway.id)); timers.set(giveaway.id, setTimeout(()=>finish(client, giveaway.id), Math.min(delay, 2_147_000_000))); }
async function finish(client, id) {
  const g = store.get().giveaways[id]; if (!g || g.ended) return;
  const channel = await client.channels.fetch(g.channelId).catch(()=>null); const message = channel ? await channel.messages.fetch(g.messageId).catch(()=>null) : null;
  const users = Object.keys(g.participants || {}); const shuffled = users.sort(()=>Math.random()-0.5); const winners = shuffled.slice(0, g.winners);
  store.update(d=>{ d.giveaways[id].ended=true; d.giveaways[id].winnerIds=winners; });
  if (message) await message.edit({ embeds:[brandEmbed("🎁 Giveaway terminé", `**Lot :** ${g.prize}\n**Gagnant(s) :** ${winners.length ? winners.map(x=>`<@${x}>`).join(", ") : "Aucun participant"}`)], components:[] }).catch(()=>null);
  if (channel && winners.length) await channel.send(`🎉 Félicitations ${winners.map(x=>`<@${x}>`).join(", ")} ! Vous remportez **${g.prize}**.`).catch(()=>null);
}
function restore(client) { for (const g of Object.values(store.get().giveaways)) if (!g.ended) schedule(client,g); }
async function join(interaction) { const id=interaction.customId.split(":")[2]; const g=store.get().giveaways[id]; if(!g||g.ended) return interaction.reply({content:"❌ Ce giveaway est terminé.",ephemeral:true}); let joined=false; store.update(d=>{const p=d.giveaways[id].participants ||= {}; if(p[interaction.user.id]) delete p[interaction.user.id]; else {p[interaction.user.id]=Date.now(); joined=true;}}); return interaction.reply({content:joined?"✅ Participation enregistrée.":"➖ Participation retirée.",ephemeral:true}); }
module.exports = { schedule, restore, finish, join };
