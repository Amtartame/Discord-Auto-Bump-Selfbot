require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13')
const chalk = require('chalk')
const fs = require('fs')

// Load configuration
let config
try {
    config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

    // Validate config structure
    if (!config.bots || !Array.isArray(config.bots) || config.bots.length === 0) {
        throw new Error('Le fichier config.json doit contenir un tableau "bots" avec au moins un bot')
    }
} catch (error) {
    console.error(chalk.red('❌ Erreur lors du chargement de config.json:'), error.message)
    console.log(chalk.yellow('💡 Assurez-vous que config.json existe et est valide.'))
    process.exit(1)
}

// Validate USER_TOKEN
if (!process.env.USER_TOKEN) {
    console.error(chalk.red('❌ USER_TOKEN manquant dans le fichier .env'))
    console.log(chalk.yellow('💡 Copiez .env.example vers .env et ajoutez votre token'))
    process.exit(1)
}

// Command Scheduler Class
class CommandScheduler {
    constructor(client, botId, botName, commandConfig) {
        this.client = client
        this.botId = botId
        this.botName = botName
        this.config = commandConfig
        this.executeCount = 0
        this.nextExecutionTime = null
        this.timeoutId = null
    }

    // Calculate random interval with variation
    calculateRandomInterval() {
        const baseInterval = this.config.intervalMinutes * 60 * 1000 // Convert to milliseconds
        const variation = this.config.randomVariationPercent / 100
        const minInterval = baseInterval * (1 - variation)
        const maxInterval = baseInterval * (1 + variation)
        const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval
        return randomInterval
    }

    // Format milliseconds to readable time
    formatTime(ms) {
        const minutes = Math.floor(ms / 60000)
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60

        if (hours > 0) {
            return `${hours}h ${mins}min`
        }
        return `${mins}min`
    }

    // Get timestamp for logging
    getTimestamp() {
        return new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    // Execute the slash command
    async executeCommand() {
        try {
            const channel = await this.client.channels.fetch(this.config.channelId)

            await channel.sendSlash(this.botId, this.config.command)

            this.executeCount++

            console.log(
                chalk.green('✅'),
                chalk.bold(this.config.name),
                chalk.gray(`[${this.getTimestamp()}]`),
                chalk.green(`/${this.config.command}`),
                chalk.cyan(`→ ${this.botName}`),
                chalk.gray(`(#${this.executeCount})`)
            )

        } catch (error) {
            console.log(
                chalk.red('❌'),
                chalk.bold(this.config.name),
                chalk.gray(`[${this.getTimestamp()}]`),
                chalk.red(`Erreur: ${error.message}`)
            )
        }
    }

    // Schedule next execution
    scheduleNext() {
        const randomInterval = this.calculateRandomInterval()
        this.nextExecutionTime = Date.now() + randomInterval

        console.log(
            chalk.blue('⏳'),
            chalk.bold(this.config.name),
            chalk.gray(`[${this.getTimestamp()}]`),
            chalk.blue(`Prochaine exécution dans`),
            chalk.bold(this.formatTime(randomInterval)),
            chalk.gray(`(${this.config.intervalMinutes}min ±${this.config.randomVariationPercent}%)`)
        )

        this.timeoutId = setTimeout(async () => {
            await this.executeCommand()
            this.scheduleNext()
        }, randomInterval)
    }

    // Start the scheduler
    async start() {
        console.log(
            chalk.cyan('🔄'),
            chalk.bold(this.config.name),
            chalk.cyan(`Loop démarré`),
            chalk.gray(`[/${this.config.command} → ${this.botName}]`)
        )

        // Execute immediately on start
        await this.executeCommand()

        // Schedule next execution
        this.scheduleNext()
    }

    // Stop the scheduler
    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = null
        }
    }
}

// Main Bot Manager
class BotManager {
    constructor() {
        this.client = new Client()
        this.schedulers = []
    }

    async start() {
        console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
        console.log(chalk.bold.cyan('       🤖 Discord Auto-Bump Selfbot'))
        console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'))

        this.client.on('ready', async () => {
            console.log(
                chalk.green('🌐'),
                chalk.bold('Connecté en tant que'),
                chalk.bold.green(this.client.user.tag)
            )

            // Count total commands
            const totalCommands = config.bots.reduce((sum, bot) => sum + bot.commands.length, 0)

            console.log(
                chalk.cyan('📊'),
                chalk.bold(`${config.bots.length} bot(s) configuré(s)`),
                chalk.gray('•'),
                chalk.bold(`${totalCommands} commande(s) au total\n`)
            )

            // Start all command schedulers grouped by bot
            for (const bot of config.bots) {
                console.log(
                    chalk.magenta('🤖'),
                    chalk.bold(bot.botName),
                    chalk.gray(`[ID: ${bot.botId}]`),
                    chalk.magenta(`- ${bot.commands.length} commande(s)`)
                )

                for (const commandConfig of bot.commands) {
                    const scheduler = new CommandScheduler(this.client, bot.botId, bot.botName, commandConfig)
                    this.schedulers.push(scheduler)
                    await scheduler.start()

                    // Add small delay between starts
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }

                console.log('') // Empty line between bots
            }

            console.log(chalk.bold.green('✅ Tous les loops sont actifs !\n'))
        })

        // Error handling
        this.client.on('error', (error) => {
            console.log(
                chalk.red('❌'),
                chalk.bold('Erreur client:'),
                chalk.red(error.message)
            )
        })

        // Login
        try {
            await this.client.login(process.env.USER_TOKEN)
        } catch (error) {
            console.error(chalk.red('❌ Erreur de connexion:'), error.message)
            console.log(chalk.yellow('💡 Vérifiez que votre USER_TOKEN est valide dans le .env'))
            process.exit(1)
        }
    }

    stop() {
        console.log(chalk.yellow('\n⚠️  Arrêt des schedulers...'))
        this.schedulers.forEach(scheduler => scheduler.stop())
        this.client.destroy()
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n⚠️  Signal SIGINT reçu, arrêt du bot...'))
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.log(chalk.yellow('\n\n⚠️  Signal SIGTERM reçu, arrêt du bot...'))
    process.exit(0)
})

// Start the bot
const bot = new BotManager()
bot.start()
