require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {
  Client, Collection, GatewayIntentBits, REST, Routes, ActivityType, Events
} = require("discord.js");

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error("❌ Variables manquantes : DISCORD_TOKEN, CLIENT_ID ou GUILD_ID.");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();

const commandDir = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandDir).filter(file => file.endsWith(".js"))) {
  const command = require(path.join(commandDir, file));
  if (!command?.data || !command?.execute) {
    console.warn(`⚠️ Commande ignorée : ${file}`);
    continue;
  }
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, async readyClient => {
  console.log(`✅ Connecté en tant que ${readyClient.user.tag}`);
  readyClient.user.setPresence({
    activities: [{ name: "la communauté MattSlots 🎰", type: ActivityType.Watching }],
    status: "online"
  });

  try {
    const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: client.commands.map(command => command.data.toJSON())
    });
    console.log(`✅ ${client.commands.size} commandes slash enregistrées.`);
  } catch (error) {
    console.error("❌ Enregistrement des commandes impossible :", error);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return interaction.reply({ content: "❌ Cette commande n'est pas chargée.", ephemeral: true });
      return await command.execute(interaction);
    }

    if (!interaction.isButton()) return;
    if (interaction.customId === "verify:accept") return await client.commands.get("verification")?.handleButton(interaction);
    if (interaction.customId.startsWith("selfrole:")) return await client.commands.get("roles")?.handleButton(interaction);
    if (interaction.customId.startsWith("ticket:new:")) return await client.commands.get("tickets")?.handleButton(interaction);
    if (interaction.customId === "ticket:close") return await client.commands.get("tickets")?.handleClose(interaction);
  } catch (error) {
    console.error("❌ Erreur interaction :", error);
    const payload = { content: "❌ Une erreur est survenue. Consulte les logs Render.", ephemeral: true };
    if (interaction.deferred) await interaction.editReply(payload).catch(() => {});
    else if (interaction.replied) await interaction.followUp(payload).catch(() => {});
    else await interaction.reply(payload).catch(() => {});
  }
});

client.on(Events.Error, error => console.error("❌ Erreur client Discord :", error));
process.on("unhandledRejection", error => console.error("❌ Promesse non gérée :", error));
process.on("uncaughtException", error => console.error("❌ Exception non gérée :", error));

client.login(DISCORD_TOKEN);
