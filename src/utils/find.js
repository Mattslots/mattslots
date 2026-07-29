function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^[^a-z0-9]+/i, "")
    .trim();
}

function names(value) {
  return Array.isArray(value) ? value : [value];
}

function findTextChannel(guild, wanted) {
  const targets = names(wanted).map(normalize);
  return guild.channels.cache.find(channel =>
    channel.isTextBased() && targets.includes(normalize(channel.name))
  );
}

function findRoleByName(guild, wanted) {
  const targets = names(wanted).map(normalize);
  return guild.roles.cache.find(role => targets.includes(normalize(role.name)));
}

function findCategory(guild, fragment) {
  const target = normalize(fragment);
  return guild.channels.cache.find(channel =>
    channel.type === 4 && normalize(channel.name).includes(target)
  );
}

module.exports = { normalize, findTextChannel, findRoleByName, findCategory };
