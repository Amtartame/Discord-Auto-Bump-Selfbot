# 🐳 Documentation Docker

Guide pour déployer le selfbot avec Docker.

## 🚀 Démarrage rapide (Local)

```bash
# Démarrer
npm run docker:run

# Voir les logs
npm run docker:logs

# Arrêter
npm run docker:stop
```

## 📦 Build et Run manuel

```bash
# Build l'image
docker build -t discord-bump-selfbot .

# Run le container
docker run -d \
  --name discord-bump-selfbot \
  --env-file .env \
  --restart unless-stopped \
  discord-bump-selfbot
```

**⚠️ Important :** Le fichier `config.json` est copié dans l'image lors du build. Créez-le AVANT de build.

## 🌐 Déploiement cloud

### Dokploy (Recommandé pour self-hosting)

1. **Poussez votre code sur GitHub**
2. **Connectez le repo dans Dokploy**
3. **Configurez les variables d'environnement** :
   ```
   USER_TOKEN=votre_token_discord
   ```
4. **Créez `config.json` localement AVANT de push**
5. **Push et déployez**

**Note :** `config.json` sera copié dans l'image Docker lors du build sur Dokploy.

### Railway

```bash
# Installer CLI
npm i -g @railway/cli

# Login
railway login

# Déployer
railway up

# Config env
railway variables set USER_TOKEN=votre_token
```

**Note :** Assurez-vous que `config.json` est dans votre repo local avant de deploy.

### Fly.io

```bash
# Déployer
fly deploy

# Config env
fly secrets set USER_TOKEN=votre_token
```

**Note :** `config.json` doit exister avant le `fly deploy`.

### Autres services

- **Render** : Connectez GitHub, ajoutez env vars, déployez
- **DigitalOcean** : App Platform avec GitHub auto-deploy
- **AWS/GCP** : Via container registry

## 🔧 Scripts NPM

| Commande | Description |
|----------|-------------|
| `npm run docker:build` | Build l'image |
| `npm run docker:run` | Démarrer avec docker-compose |
| `npm run docker:logs` | Voir les logs |
| `npm run docker:stop` | Arrêter le container |

## 🐛 Dépannage

### Le container ne démarre pas

```bash
# Voir les logs
docker-compose logs

# Vérifier l'état
docker ps -a
```

### Erreur "config.json not found"

Le fichier `config.json` doit exister AVANT le build Docker. Créez-le dans votre dossier local.

### Le bot ne se connecte pas

```bash
# Vérifier .env
cat .env

# Vérifier les logs
docker logs discord-bump-selfbot
```

## 📚 Ressources

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Dokploy](https://dokploy.com/)

---

**Besoin d'aide ?** Consultez le [README principal](README.md)
