# MattSlots Bot V5

Bot Discord Node.js / discord.js v14 prêt pour Render.

## Fonctions incluses

- Vérification 18+ et attribution des rôles Vérifié + Membre
- Panneau d'auto-rôles
- Synchronisation des permissions
- Tickets Support, Partenariat, Affiliation et Signalement
- Fermeture des tickets avec log
- Commandes `/clear`, `/lock`, `/unlock`, `/status`
- Commande `/setup` pour guider l'installation
- Présence MattSlots personnalisée
- Gestion centralisée des erreurs

## Installation locale

1. Installer Node.js 20 ou supérieur.
2. Copier `.env.example` en `.env`.
3. Remplir :

```env
DISCORD_TOKEN=ton_token
CLIENT_ID=id_application
GUILD_ID=id_serveur
```

4. Installer et démarrer :

```bash
npm install
npm start
```

## Render

Utiliser un **Background Worker** lorsque disponible :

- Build Command : `npm install`
- Start Command : `npm start`

Ajouter les variables `DISCORD_TOKEN`, `CLIENT_ID` et `GUILD_ID` dans Render.

## Mise à jour depuis la V4

Remplacer les fichiers du dépôt GitHub par ceux de cette V5, sans envoyer `.env` ni `node_modules`.
Render redéploiera automatiquement après le commit.

## Première configuration Discord

Exécuter dans cet ordre :

1. `/verification`
2. `/roles`
3. `/tickets`
4. `/permissions`

Le rôle du bot doit être au-dessus des rôles Vérifié, Membre et des auto-rôles dans la hiérarchie Discord.
