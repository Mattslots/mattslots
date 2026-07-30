# Déploiement Northflank

## Méthode recommandée

1. Importer ce projet dans un dépôt GitHub privé.
2. Ne jamais envoyer un fichier `.env` sur GitHub.
3. Dans Northflank, choisir le dépôt et la branche principale.
4. Type de construction : **Dockerfile**.
5. Emplacement du Dockerfile : `/Dockerfile`.
6. Ajouter dans **Variables environnementales** :
   - `DISCORD_TOKEN` : le nouveau token obtenu après **Reset Token**
   - `CLIENT_ID` : `1531545613085446298`
   - `GUILD_ID` : `1531542410402837000`
   - `PORT` : `10000`
7. Déployer. Aucune commande CMD personnalisée n'est nécessaire avec le Dockerfile.

## Alternative Buildpack

Le fichier `Procfile` contient déjà `web: npm start`. Avec le Buildpack Heroku, choisir le processus `web`, ou laisser la configuration par défaut si Northflank le détecte.

## Sécurité

Le token montré dans une capture précédente est compromis. Il ne doit jamais être réutilisé. Réinitialiser le token dans **Discord Developer Portal → Bot → Reset Token**.
