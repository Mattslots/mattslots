const { AttachmentBuilder } = require("discord.js");
function esc(s="") { return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
async function createTranscript(channel) {
  const messages = []; let before;
  while (messages.length < 1000) {
    const batch = await channel.messages.fetch({ limit: 100, before }); if (!batch.size) break;
    messages.push(...batch.values()); before = batch.last().id; if (batch.size < 100) break;
  }
  messages.sort((a,b)=>a.createdTimestamp-b.createdTimestamp);
  const rows = messages.map(m=>`<article><b>${esc(m.author.tag)}</b> <small>${new Date(m.createdTimestamp).toLocaleString("fr-FR")}</small><p>${esc(m.cleanContent || "")}</p>${[...m.attachments.values()].map(a=>`<a href="${esc(a.url)}">Pièce jointe</a>`).join(" ")}</article>`).join("\n");
  const html = `<!doctype html><meta charset="utf-8"><title>Transcript ${esc(channel.name)}</title><style>body{font-family:Arial;background:#111;color:#eee;max-width:900px;margin:auto;padding:24px}article{border-bottom:1px solid #333;padding:12px}small{color:#aaa}a{color:#ff8a00}</style><h1>${esc(channel.name)}</h1>${rows}`;
  return new AttachmentBuilder(Buffer.from(html), { name: `${channel.name}-transcript.html` });
}
module.exports = { createTranscript };
