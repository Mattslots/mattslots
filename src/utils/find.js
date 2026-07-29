function normalize(value = "") { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function findByNames(collection, names) {
  const list = Array.isArray(names) ? names : [names];
  return collection.find(item => list.some(name => normalize(item.name) === normalize(name))) ||
    collection.find(item => list.some(name => normalize(item.name).includes(normalize(name))));
}
function findTextChannel(guild, names) { return findByNames(guild.channels.cache.filter(c => c.isTextBased()), names); }
function findRoleByName(guild, names) { return findByNames(guild.roles.cache, names); }
module.exports = { normalize, findByNames, findTextChannel, findRoleByName };
