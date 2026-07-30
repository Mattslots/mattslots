module.exports = {
  version: "5.1.0",
  brandColor: 0xff7a00,
  memberRoleId: "1531543375633842187",
  verifiedRoleName: "✅ Vérifié",
  staffRoleNames: ["Staff", "Modérateur", "Administrateur"],
  supportRoleNames: ["Support", "Staff", "Modérateur", "Administrateur"],
  channels: {
    verification: ["✅・vérification", "vérification"],
    roles: ["🎭・rôles", "rôles"],
    tickets: ["🎫・ouvrir-un-ticket", "ouvrir-un-ticket"],
    logs: ["📋・logs", "logs"],
    staffLogs: ["📋・logs-staff", "logs-staff"],
    live: ["🔴・live", "live"],
    giveaways: ["🎁・giveaway", "giveaway"]
  },
  readonlyChannels: [
    "👋・bienvenue", "📜・règlement", "🎭・rôles", "📋・logs", "👥・membres",
    "▶️・youtube", "🎥・streams", "✂️・clips", "🎵・tiktok", "🔗・liens-officiels",
    "🔞・18-plus-et-jeu-responsable", "🤝・partenariats"
  ],
  publicCommunityChannels: ["💬・général", "😂・memes", "🎮・gaming", "📸・media", "💰・gains-et-sessions", "💡・suggestions"],
  selfRoles: [
    { roleName: "🔴 Notifications Live", label: "Notifications Live", emoji: "🔴", channels: ["🔴・live", "📣・partage-ta-session", "✂️・clips", "📺・rediffusions"] },
    { roleName: "🎁 Notifications Giveaways", label: "Notifications Giveaways", emoji: "🎁", channels: ["🎁・giveaway", "💎・giveaway-premium", "🏆・résultats-giveaway"] },
    { roleName: "🔥 Promotions", label: "Promotions", emoji: "🔥", channels: ["🔥・offres-du-moment", "🎁・bonus", "🏷️・codes-promo"] },
    { roleName: "🎰 Casinos partenaires", label: "Casinos partenaires", emoji: "🎰", channels: ["🎰・casino-1", "🎰・casino-2", "🎰・casino-3", "🎰・casino-4", "🎰・casino-5"] }
  ],
  automod: {
    enabled: true,
    ignoredRoleNames: ["Staff", "Modérateur", "Administrateur"],
    blockedInviteRegex: /(discord\.gg|discord\.com\/invite)\/[a-z0-9-]+/i,
    maxMentions: 5,
    spamWindowMs: 7000,
    spamMessageLimit: 6,
    duplicateLimit: 3,
    timeoutMinutes: 10
  },
  xp: { enabled: true, cooldownMs: 60000, min: 8, max: 15 },
  streams: { checkIntervalMs: 120000 }
};
