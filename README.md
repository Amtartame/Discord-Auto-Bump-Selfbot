# 🤖 Discord Auto-Bump Selfbot

[<img src="https://img.shields.io/github/license/appu1232/Discord-Selfbot.svg">](https://github.com/MonkoTubeYT/Disboard-Auto-Bump-Selfbot/blob/main/LICENSE)

Un selfbot Discord amélioré pour automatiser l'envoi de commandes slash (bump, etc.) avec plusieurs fonctionnalités avancées.

## ⚠️ AVERTISSEMENT
**Selfbots violate Discord's Terms of Service.**
- https://discord.com/guidelines
- https://discord.com/terms

**This code is strictly educational.**

**I am not liable for any accounts that get moderated by Discord due to the use of this selfbot.**

## ✨ Fonctionnalités

- 🤖 **Multi-bots supportés** : Gérez plusieurs bots Discord différents (Disboard, ServerHub, etc.)
- ✅ **Commandes illimitées** : Configurez autant de commandes que vous voulez par bot
- 🎲 **Intervalles aléatoires intelligents** : Variation configurable pour éviter la détection
- 📊 **Système de logging avec émojis** : Logs colorés, structurés et organisés par bot
- 🔄 **Exécution parallèle** : Chaque commande s'exécute indépendamment avec son propre timer
- ⏰ **Affichage du temps restant** : Visualisez quand la prochaine commande sera envoyée
- 🛡️ **Gestion d'erreurs robuste** : Continue de fonctionner même en cas d'erreur
- 📁 **Configuration centralisée** : Structure optimisée par bot pour une meilleure organisation

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- Un compte Discord utilisateur (selfbot)
- Le token de votre compte Discord
- Les IDs des canaux et bots cibles

## 🚀 Installation

1. **Clonez le projet** (ou téléchargez-le)
   ```bash
   git clone <url-du-repo>
   cd Disboard-Auto-Bump-Selfbot-main
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configurez votre token utilisateur**
   - Copiez `.env.example` vers `.env`
   ```bash
   cp .env.example .env
   ```
   - Ouvrez `.env` et ajoutez votre token utilisateur Discord
   ```env
   USER_TOKEN=votre_token_utilisateur_discord
   ```

4. **Configurez vos bots et commandes**
   - Ouvrez `config.json`
   - Configurez les bots que vous voulez utiliser et leurs commandes
   - Exemple de configuration :
   ```json
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
   ```

   **Astuce** : Consultez `config.example.json` pour voir des exemples complets de configuration

## 🔧 Configuration

### Structure du fichier `config.json`

**Structure optimisée par bot :**

```json
{
  "bots": [
    {
      "botId": "ID_du_bot",
      "botName": "Nom_du_bot",
      "commands": [...]
    }
  ]
}
```

| Paramètre (Bot) | Description | Exemple |
|-----------------|-------------|---------|
| `botId` | ID du bot qui reçoit les commandes | `"302050872383242240"` (Disboard) |
| `botName` | Nom du bot (pour logs) | `"Disboard"` |
| `commands` | Liste des commandes pour ce bot | `[...]` |

| Paramètre (Commande) | Description | Exemple |
|----------------------|-------------|---------|
| `name` | Nom descriptif de la commande | `"Bump Server 1"` |
| `channelId` | ID du canal Discord | `"123456789012345678"` |
| `command` | Nom de la commande slash | `"bump"` |
| `intervalMinutes` | Intervalle de base en minutes | `120` (2 heures) |
| `randomVariationPercent` | Variation aléatoire en % | `15` (±15%) |

### Exemples de configuration

**Configuration simple - Un seul bot :**
```json
{
  "bots": [
    {
      "botId": "302050872383242240",
      "botName": "Disboard",
      "commands": [
        {
          "name": "Bump Mon Serveur",
          "channelId": "123456789012345678",
          "command": "bump",
          "intervalMinutes": 120,
          "randomVariationPercent": 15
        }
      ]
    }
  ]
}
```

**Configuration avancée - Plusieurs bots et commandes :**
```json
{
  "bots": [
    {
      "botId": "302050872383242240",
      "botName": "Disboard",
      "commands": [
        {
          "name": "Bump Server Principal",
          "channelId": "111111111111111111",
          "command": "bump",
          "intervalMinutes": 120,
          "randomVariationPercent": 15
        },
        {
          "name": "Bump Server Secondaire",
          "channelId": "222222222222222222",
          "command": "bump",
          "intervalMinutes": 150,
          "randomVariationPercent": 20
        }
      ]
    },
    {
      "botId": "366281166990032896",
      "botName": "ServerHub",
      "commands": [
        {
          "name": "Bump ServerHub",
          "channelId": "333333333333333333",
          "command": "bump",
          "intervalMinutes": 180,
          "randomVariationPercent": 15
        }
      ]
    }
  ]
}
```

## ▶️ Utilisation

Démarrez le bot :
```bash
npm start
```

Vous verrez des logs détaillés et organisés par bot :
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       🤖 Discord Auto-Bump Selfbot
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Connecté en tant que VotreNom#1234
📊 2 bot(s) configuré(s) • 3 commande(s) au total

🤖 Disboard [ID: 302050872383242240] - 2 commande(s)
🔄 Bump Server 1 Loop démarré [/bump → Disboard]
✅ Bump Server 1 [14:30:45] /bump → Disboard (#1)
⏳ Bump Server 1 [14:30:45] Prochaine exécution dans 2h 15min (120min ±15%)

🔄 Bump Server 2 Loop démarré [/bump → Disboard]
✅ Bump Server 2 [14:30:46] /bump → Disboard (#1)
⏳ Bump Server 2 [14:30:46] Prochaine exécution dans 2h 35min (150min ±20%)

🤖 ServerHub [ID: 366281166990032896] - 1 commande(s)
🔄 Bump ServerHub Loop démarré [/bump → ServerHub]
✅ Bump ServerHub [14:30:47] /bump → ServerHub (#1)
⏳ Bump ServerHub [14:30:47] Prochaine exécution dans 2h 50min (180min ±15%)

✅ Tous les loops sont actifs !
```

## 🎲 Système d'aléatoire

Le système calcule un intervalle aléatoire basé sur vos paramètres :

- **Intervalle de base** : `intervalMinutes`
- **Variation** : `randomVariationPercent`

**Exemple :**
- Intervalle : 120 minutes (2h)
- Variation : 15%
- Résultat : Entre 102 minutes et 138 minutes (aléatoire à chaque fois)

Cela évite les patterns réguliers et réduit le risque de détection.

## 🛑 Arrêt du bot

Appuyez sur `Ctrl+C` dans le terminal pour arrêter proprement le bot.

## 🐳 Utilisation avec Docker (optionnel)

Pour un déploiement isolé, portable et avec redémarrage automatique :

### Démarrage rapide

```bash
# Démarrer avec docker-compose
npm run docker:run

# Voir les logs
npm run docker:logs

# Arrêter
npm run docker:stop
```

### Scripts NPM disponibles

| Commande | Description |
|----------|-------------|
| `npm run docker:build` | Construire l'image Docker |
| `npm run docker:run` | Démarrer avec docker-compose en arrière-plan |
| `npm run docker:logs` | Voir les logs en temps réel |
| `npm run docker:stop` | Arrêter le container |

### Documentation complète

📖 **Consultez [README.Docker.md](README.Docker.md) pour :**
- Guide d'installation Docker détaillé
- Configuration avancée (docker-compose.yml, Dockerfile)
- Déploiement sur serveur distant
- Déploiement cloud (Railway, Fly.io, AWS, etc.)
- Dépannage et tips
- Gestion des logs et monitoring

## 💡 Conseils et bonnes pratiques

### Sécurité
- ⚠️ **Ne partagez JAMAIS votre token utilisateur** ! Il donne un accès complet à votre compte Discord
- Gardez votre fichier `.env` privé (il est déjà dans `.gitignore`)
- N'utilisez pas votre compte principal, utilisez un compte alternatif

### Configuration optimale
- **IDs Discord** : Activez le mode développeur dans Discord (Paramètres > Avancés > Mode développeur), puis clic droit > Copier l'ID
- **Intervalles** : Respectez les cooldowns des bots :
  - Disboard : 2h minimum (120 minutes)
  - ServerHub : 3h minimum (180 minutes)
- **Variation** : Utilisez 10-20% de variation pour éviter les patterns détectables
- **Organisation** : Groupez les commandes par bot pour une meilleure lisibilité

### Exemples d'intervalles recommandés
| Bot | Cooldown officiel | Intervalle recommandé | Variation |
|-----|-------------------|----------------------|-----------|
| Disboard | 2h | 120-130 minutes | ±15% |
| ServerHub | 3h | 180-190 minutes | ±15% |
| Autres | Variable | Vérifiez la documentation | ±10-20% |

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.
