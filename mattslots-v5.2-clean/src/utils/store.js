const fs = require("fs"); const path = require("path");
const file = path.join(__dirname, "../data/store.json");
const defaults = { settings: {}, profiles: {}, warnings: {}, giveaways: {}, streams: {} };
function load() { try { return { ...defaults, ...JSON.parse(fs.readFileSync(file, "utf8")) }; } catch { return structuredClone(defaults); } }
let data = load();
function save() { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(data, null, 2)); }
function get() { return data; }
function update(mutator) { mutator(data); save(); return data; }
module.exports = { get, update, save };
