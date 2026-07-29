const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../config/server");
const { normalize, findRoleByName } = require("../utils/find");

function matchChannel(channel, name) {
  return channel.isTextBased() && normalize(channel.name) === normalize(name);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permissions")
    .setDescription("Synchronise les permissions des salons.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const guild = interaction.guild;
    const verified = findRoleByName(guild, config.verifiedRoleName);
    if (!verified) return interaction.editReply("❌ Lance d'abord `/verification`.");

    let updated = 0;
    for (const channel of guild.channels.cache.values()) {
      if (!channel.isTextBased() || normalize(channel.parent?.name).includes("staff")) continue;
      const publicBefore = config.channelNames.verification.some(name => matchChannel(channel, name)) ||
        ["bienvenue", "règlement"].some(name => matchChannel(channel, name));

      if (publicBefore) {
        await channel.permissionOverwrites.edit(guild.roles.everyone, { ViewChannel: true, SendMessages: false });
      } else {
        await channel.permissionOverwrites.edit(guild.roles.everyone, { ViewChannel: false });
        await channel.permissionOverwrites.edit(verified, { ViewChannel: true });
      }
      updated += 1;
    }

    for (const name of config.readonlyChannels) {
      const channel = guild.channels.cache.find(c => matchChannel(c, name));
      if (channel) await channel.permissionOverwrites.edit(verified, { ViewChannel: true, SendMessages: false, AddReactions: false });
    }

    for (const name of config.publicCommunityChannels) {
      const channel = guild.channels.cache.find(c => matchChannel(c, name));
      if (channel) await channel.permissionOverwrites.edit(verified, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true, AddReactions: true });
    }

    for (const item of config.selfRoles) {
      const role = findRoleByName(guild, item.roleName);
      if (!role) continue;
      for (const name of item.channels) {
        const channel = guild.channels.cache.find(c => matchChannel(c, name));
        if (!channel) continue;
        await channel.permissionOverwrites.edit(verified, { ViewChannel: false, SendMessages: false });
        await channel.permissionOverwrites.edit(role, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true, AddReactions: true });
      }
    }

    await interaction.editReply(`🔐 Permissions synchronisées sur **${updated} salons**.`);
  }
};
