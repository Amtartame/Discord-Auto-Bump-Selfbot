# 🤖 Discord Auto-Bump Selfbot

Un selfbot Discord pour automatiser l'envoi de commandes slash (bump, etc.) avec intervalles aléatoires intelligents.

## ⚠️ AVERTISSEMENT

**Les selfbots violent les Conditions d'utilisation de Discord.**
- Ce code est strictement éducatif
- Utilisez à vos risques et périls
- Risque de ban de compte

## ✨ Fonctionnalités

- 🤖 **Multi-bots** : Gérez plusieurs bots Discord (Disboard, ServerHub, etc.)
- ✅ **Commandes illimitées** : Configurez autant de commandes par bot
- 🎲 **Intervalles aléatoires** : Variation configurable pour éviter la détection
- 📊 **Logs avec émojis** : Logs colorés et structurés
- 🐳 **Support Docker** : Déploiement facile avec Docker/docker-compose

## 🚀 Installation rapide

### Prérequis
- Node.js v14+
- Votre token Discord utilisateur
- IDs des canaux et bots cibles

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer le token
cp .env.example .env
# Éditer .env et ajouter : USER_TOKEN=votre_token

# 3. Configurer les bots
# Éditer config.json :
{
  "bots": [
    {
      "botId": "302050872383242240",
      "botName": "Disboard",
      "commands": [
        {
          "name": "Bump Mon Serveur",
          "channelId": "VOTRE_CHANNEL_ID",
          "command": "bump",
          "intervalMinutes": 120,
          "randomVariationPercent": 15
        }
      ]
    }
  ]
}

# 4. Démarrer
npm start
```

## 📊 Exemple de logs

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       🤖 Discord Auto-Bump Selfbot
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Connecté en tant que VotreNom#1234
📊 1 bot(s) configuré(s) • 1 commande(s) au total

🤖 Disboard [ID: 302050872383242240] - 1 commande(s)
🔄 Bump Mon Serveur Loop démarré [/bump → Disboard]
✅ Bump Mon Serveur [14:30:45] /bump → Disboard (#1)
⏳ Prochaine exécution dans 2h 12min (120min ±15%)

✅ Tous les loops sont actifs !
```

## 🐳 Utilisation avec Docker

### Démarrage rapide

```bash
# Démarrer
npm run docker:run

# Voir les logs
npm run docker:logs

# Arrêter
npm run docker:stop
```

### Docker manuellement

```bash
# Build
docker build -t discord-bump-selfbot .

# Run avec .env
docker run -d \
  --name discord-bump-selfbot \
  --env-file .env \
  --restart unless-stopped \
  discord-bump-selfbot
```

**⚠️ Important :** Le fichier `config.json` est copié dans l'image Docker lors du build. **Créez-le avant de build.**

📖 **Documentation Docker complète** : [README.Docker.md](README.Docker.md)
- Déploiement cloud (Dokploy, Railway, Fly.io, etc.)
- Configuration avancée
- Dépannage

## ⚙️ Configuration

### Structure config.json

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `botId` | ID du bot Discord | `"302050872383242240"` |
| `botName` | Nom du bot (pour logs) | `"Disboard"` |
| `channelId` | ID du canal Discord | `"123456789"` |
| `command` | Commande slash | `"bump"` |
| `intervalMinutes` | Intervalle en minutes | `120` |
| `randomVariationPercent` | Variation aléatoire % | `15` |

### Exemples

**Un seul serveur :**
```json
{
  "bots": [
    {
      "botId": "302050872383242240",
      "botName": "Disboard",
      "commands": [
        {
          "name": "Bump Mon Serveur",
          "channelId": "123456789",
          "command": "bump",
          "intervalMinutes": 120,
          "randomVariationPercent": 15
        }
      ]
    }
  ]
}
```

**Plusieurs bots et serveurs :**
```json
{
  "bots": [
    {
      "botId": "302050872383242240",
      "botName": "Disboard",
      "commands": [
        {
          "name": "Bump Server 1",
          "channelId": "111111111",
          "command": "bump",
          "intervalMinutes": 120,
          "randomVariationPercent": 15
        },
        {
          "name": "Bump Server 2",
          "channelId": "222222222",
          "command": "bump",
          "intervalMinutes": 120,
          "randomVariationPercent": 15
        }
      ]
    },
    {
      "botId": "366281166990032896",
      "botName": "ServerHub",
      "commands": [
        {
          "name": "Bump ServerHub",
          "channelId": "333333333",
          "command": "bump",
          "intervalMinutes": 180,
          "randomVariationPercent": 15
        }
      ]
    }
  ]
}
```

## 💡 Conseils

### Sécurité
- ⚠️ **Ne partagez JAMAIS votre token**
- Gardez `.env` privé (déjà dans `.gitignore`)
- Utilisez un compte alternatif

### IDs Discord
Activez le mode développeur (Paramètres > Avancés) puis clic droit > Copier l'ID

### Intervalles recommandés
- **Disboard** : 120min ±15% (cooldown 2h)
- **ServerHub** : 180min ±15% (cooldown 3h)

## 📄 Licence

MIT License
