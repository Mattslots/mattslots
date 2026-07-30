# MattSlots Bot V5.2 — version propre Northflank

Projet Node.js prêt à déposer à la racine d’un dépôt GitHub puis à déployer sur Northflank avec le `Dockerfile`.

## Fonctions présentes dans cette archive

- vérification 18+ et rôles ;
- rôles automatiques ;
- tickets avec catégories et transcription HTML ;
- giveaways ;
- profils, XP et niveaux ;
- modération et automod ;
- partenaires et annonces ;
- configuration via commandes ;
- notifications Twitch, YouTube et Kick facultatives ;
- endpoint de santé pour l’hébergement.

## Déploiement Northflank

1. Envoyer le contenu de ce dossier à la racine du dépôt GitHub.
2. Créer un service Northflank depuis ce dépôt.
3. Choisir **Dockerfile** et le chemin `/Dockerfile`.
4. Ne pas ajouter de commande CMD personnalisée.
5. Ajouter dans Northflank : `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`, `PORT` et `NODE_ENV`.
6. Déployer puis consulter les journaux.

Le vrai fichier `.env` ne doit jamais être publié sur GitHub. Le token précédemment montré doit être réinitialisé dans le portail Discord.

## Vérification locale

```bash
npm install
npm run check
npm start
```

Le stockage JSON local peut être perdu lors d’un redéploiement sans volume persistant.
