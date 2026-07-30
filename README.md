# MattSlots Bot V5.2 — Northflank Ready

Bot Discord communautaire 18+ pour MattSlots.

## Fonctions incluses

- Vérification 18+ et rôles Vérifié/Membre
- Auto-rôles et permissions par salons
- Tickets Support, Partenariat, Affiliation et Signalement
- Transcriptions HTML des tickets
- Giveaways persistés, plusieurs gagnants et fin automatique
- Commandes de modération
- Profils, XP et niveaux
- Automod anti-spam, anti-invitations et anti-mass-mentions
- Fiches partenaires et annonces
- Notifications optionnelles Twitch, YouTube et Kick
- Endpoint `/health` compatible Northflank/Render

## Installation

1. Ne jamais envoyer `.env` sur GitHub.
2. Copier `.env.example` vers `.env` uniquement pour un test local.
3. Sur Northflank/Render :
   - Build Command : `npm install`
   - Start Command : `npm start`
4. Variables obligatoires : `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`.
5. Activer dans le Developer Portal Discord : **Server Members Intent** et **Message Content Intent**.
6. Exécuter `/setup`, puis `/verification`, `/roles`, `/tickets`, `/permissions`.

## Notifications de streams

- Twitch : `TWITCH_CHANNEL`, `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`
- YouTube : `YOUTUBE_CHANNEL_ID`
- Kick : `KICK_CHANNEL`

La détection Kick utilise une interface publique non garantie par Kick et peut nécessiter une adaptation future. YouTube détecte la dernière publication du flux de la chaîne, pas uniquement les directs.

## Stockage

La V5.1 utilise `src/data/store.json`. Sur l’offre gratuite Northflank/Render, le disque peut être réinitialisé lors d’un redéploiement. Pour conserver durablement XP, profils et giveaways, utilisez un disque persistant Northflank/Render ou une base de données dans une version ultérieure.

## Sécurité

Le bot doit être placé au-dessus des rôles qu’il attribue. Gardez le dépôt privé et régénérez immédiatement le token s’il a été publié.


## Northflank

La version V5.2 contient un `Dockerfile` et un `Procfile`. Consultez `NORTHFLANK.md`.
