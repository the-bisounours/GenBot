## Installation

Pour installer les dépendances, exécutez la commande suivante :
```js
npm install
```

Ensuite, créez un fichier .env à la racine du projet et ajoutez-y votre token ainsi que l'URL de connexion à MongoDB :
```bash
token=votre_token_ici
mongoDB=mongodb+srv://<Utilisateur>:<MotDePasse>@<NomDeLaDb>.<codeDb>.mongodb.net/<NomDuBot>
port=3000
clientId=votre_client_id_ici
clientSecret=votre_client_secret_ici
redirectURI=http://localhost:3000/auth/callback
scopes=identify+email+guilds+guilds.join
guildId=votre_guild_id_ici
```

## Lancement

Pour lancer le bot, utilisez la commande suivante :
```js
node .
```

## Contribuer
Si vous souhaitez contribuer à ce projet, veuillez soumettre une pull request avec vos modifications.

## Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus d’informations.


### Assurez-vous de remplacer `votre_token_ici` par le token réel de votre bot. Ce `README.md` fournit des instructions de base pour l'installation, la configuration du fichier `.env` et le lancement du bot. Vous pouvez l'ajuster selon les besoins spécifiques de votre projet.
