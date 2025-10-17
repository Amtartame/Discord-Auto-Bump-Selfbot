# 🐳 Documentation Docker - Discord Auto-Bump Selfbot

Ce guide détaille l'utilisation du selfbot avec Docker pour un déploiement isolé, sécurisé et facile.

## 📋 Prérequis

- [Docker](https://docs.docker.com/get-docker/) installé sur votre système
- [Docker Compose](https://docs.docker.com/compose/install/) (recommandé, souvent inclus avec Docker Desktop)
- Fichiers `.env` et `config.json` configurés

## 🚀 Démarrage rapide

### Méthode 1 : Docker Compose (recommandé)

La méthode la plus simple pour gérer le selfbot :

```bash
# 1. Démarrer le selfbot en arrière-plan
npm run docker:run
# ou : docker-compose up -d

# 2. Voir les logs en temps réel
npm run docker:logs
# ou : docker-compose logs -f

# 3. Arrêter le selfbot
npm run docker:stop
# ou : docker-compose down
```

### Méthode 2 : Docker CLI

Pour plus de contrôle manuel :

```bash
# 1. Construire l'image
npm run docker:build
# ou : docker build -t discord-bump-selfbot .

# 2. Démarrer le container
docker run -d \
  --name discord-bump-selfbot \
  --env-file .env \
  -v $(pwd)/config.json:/app/config.json:ro \
  --restart unless-stopped \
  discord-bump-selfbot

# 3. Voir les logs
docker logs -f discord-bump-selfbot

# 4. Arrêter et supprimer le container
docker stop discord-bump-selfbot
docker rm discord-bump-selfbot
```

## ⚙️ Configuration Docker

### docker-compose.yml

Le fichier `docker-compose.yml` est configuré avec :

```yaml
services:
  discord-bump-selfbot:
    build: .
    container_name: discord-bump-selfbot
    restart: unless-stopped

    # Variables d'environnement depuis .env
    env_file:
      - .env

    # Mount du config.json en lecture seule
    volumes:
      - ./config.json:/app/config.json:ro

    # Timezone (optionnel)
    environment:
      - TZ=Europe/Paris

    # Rotation des logs
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Dockerfile

Image Node.js Alpine légère avec :
- Node.js 18 LTS
- User non-root pour la sécurité
- Health check pour monitorer le process
- Cache npm nettoyé pour optimiser la taille

## 📊 Gestion et monitoring

### Voir les logs

```bash
# Logs en temps réel
docker-compose logs -f

# Dernières 100 lignes
docker-compose logs --tail=100

# Logs d'un service spécifique
docker logs discord-bump-selfbot
```

### Redémarrer le selfbot

```bash
# Avec docker-compose
docker-compose restart

# Avec Docker CLI
docker restart discord-bump-selfbot
```

### Mettre à jour après modifications

Si vous modifiez `index.js` ou les dépendances :

```bash
# Rebuild et redémarrage
docker-compose up -d --build

# Ou manuellement
docker-compose down
npm run docker:build
docker-compose up -d
```

### Modifier la configuration sans rebuild

Le fichier `config.json` est monté comme volume, donc vous pouvez :

1. Modifier `config.json` localement
2. Redémarrer le container :
   ```bash
   docker-compose restart
   ```

Pas besoin de rebuild ! ✨

## 🔧 Commandes NPM disponibles

Pour simplifier l'utilisation, des scripts npm sont disponibles :

| Commande | Description |
|----------|-------------|
| `npm run docker:build` | Construire l'image Docker |
| `npm run docker:run` | Démarrer avec docker-compose |
| `npm run docker:logs` | Voir les logs en temps réel |
| `npm run docker:stop` | Arrêter le container |

## 🚢 Déploiement sur serveur distant

### Via SSH

```bash
# 1. Copier les fichiers sur le serveur
scp -r .env config.json docker-compose.yml index.js package*.json user@server:/path/

# 2. Se connecter au serveur
ssh user@server

# 3. Sur le serveur
cd /path/
docker-compose up -d
docker-compose logs -f
```

### Build multi-plateforme

Si votre serveur a une architecture différente (ex: serveur AMD64, dev sur Mac M1) :

```bash
# Build pour linux/amd64
docker build --platform=linux/amd64 -t discord-bump-selfbot .

# Push vers un registry (optionnel)
docker tag discord-bump-selfbot myregistry.com/discord-bump-selfbot
docker push myregistry.com/discord-bump-selfbot
```

## ✅ Avantages de Docker

- 🔒 **Isolation** : Environnement isolé du système hôte
- 🔄 **Redémarrage automatique** : `restart: unless-stopped` relance le bot en cas de crash
- 📦 **Portable** : Fonctionne identiquement partout (dev, serveur, cloud)
- 🛡️ **Sécurité** : User non-root, variables d'environnement sécurisées
- 📊 **Logs gérés** : Rotation automatique, pas de disque plein
- ⚡ **Rapide** : Image Alpine légère (~150MB)

## 🐛 Dépannage

### Le container ne démarre pas

```bash
# Voir les logs d'erreur
docker-compose logs

# Vérifier l'état
docker-compose ps
```

### Erreur "config.json not found"

Assurez-vous que `config.json` existe dans le même répertoire que `docker-compose.yml`.

### Le bot ne se connecte pas

```bash
# Vérifier que .env contient USER_TOKEN
cat .env

# Voir les logs pour l'erreur exacte
docker-compose logs
```

### Rebuild après modification de dépendances

```bash
# Force rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 Déploiement cloud

### Docker Hub

```bash
# Login
docker login

# Tag et push
docker tag discord-bump-selfbot username/discord-bump-selfbot:latest
docker push username/discord-bump-selfbot:latest
```

### Services cloud supportés

- **Railway** : `railway up`
- **Fly.io** : `fly deploy`
- **DigitalOcean App Platform** : Push vers GitHub, auto-deploy
- **Heroku** : Via `heroku.yml` (container stack)
- **AWS ECS/Fargate** : Via AWS CLI ou Console

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Guide Node.js + Docker](https://docs.docker.com/language/nodejs/)
- [Docker Compose référence](https://docs.docker.com/compose/compose-file/)
- [Best practices Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## 💡 Tips

- Utilisez `.dockerignore` pour exclure les fichiers inutiles du build
- Montez `config.json` en read-only (`:ro`) pour éviter les modifications accidentelles
- Configurez les logs avec rotation pour éviter de remplir le disque
- Utilisez `--no-cache` si vous rencontrez des problèmes de cache lors du build

---

**Besoin d'aide ?** Consultez le [README principal](README.md) ou ouvrez une issue sur GitHub.
