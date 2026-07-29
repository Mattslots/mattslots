module.exports = {
  brandColor: 0xff7a00,
  memberRoleId: "1531543375633842187",
  verifiedRoleName: "✅ Vérifié",
  staffRoleNames: ["Staff", "Modérateur", "Administrateur"],
  channelNames: {
    verification: ["✅・vérification", "vérification"],
    roles: ["🎭・rôles", "rôles"],
    tickets: ["🎫・ouvrir-un-ticket", "ouvrir-un-ticket"],
    ticketLogs: ["tickets-staff", "logs-staff", "logs"],
    welcome: ["bienvenue", "👋・bienvenue"]
  },
  readonlyChannels: [
    "logs", "bienvenue", "règlement", "rôles", "membres",
    "youtube", "streams", "clips", "tiktok", "liens-officiels",
    "18-plus-et-jeu-responsable", "partenariats"
  ],
  publicCommunityChannels: [
    "général", "memes", "gaming", "media", "gains-et-sessions", "suggestions"
  ],
  selfRoles: [
    {
      label: "Notifications Live",
      roleName: "🔴 Notifications Live",
      emoji: "🔴",
      channels: ["live", "partage-ta-session", "clips", "rediffusions"]
    },
    {
      label: "Notifications Giveaways",
      roleName: "🎁 Notifications Giveaways",
      emoji: "🎁",
      channels: ["giveaway", "giveaway-premium", "résultats-giveaway"]
    },
    {
      label: "Promotions",
      roleName: "🔥 Promotions",
      emoji: "🔥",
      channels: ["offres-du-moment", "bonus", "codes-promo"]
    },
    {
      label: "Casinos partenaires",
      roleName: "🎰 Casinos partenaires",
      emoji: "🎰",
      channels: ["casino-1", "casino-2", "casino-3", "casino-4", "casino-5"]
    }
  ],
  ticketTypes: {
    support: { label: "Support", emoji: "🎫", description: "Besoin d'aide ou question générale" },
    partenariat: { label: "Partenariat", emoji: "🤝", description: "Proposition de collaboration" },
    affiliation: { label: "Affiliation", emoji: "💰", description: "Demande liée à l'affiliation" },
    signalement: { label: "Signalement", emoji: "🚨", description: "Signaler un membre ou un problème" }
  }
};
