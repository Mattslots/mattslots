function normalize(v=""){return v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function findTextChannel(guild,names){const wanted=names.map(normalize);return guild.channels.cache.find(c=>c.isTextBased()&&wanted.includes(normalize(c.name)));}
function findRoleByName(guild,name){return guild.roles.cache.find(r=>r.name===name);}
module.exports={normalize,findTextChannel,findRoleByName};
