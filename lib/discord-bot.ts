import { Client, GatewayIntentBits } from "discord.js"

// Ajouter la configuration de votre serveur Discord
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID
const DISCORD_INVITE_LINK = "https://discord.gg/FmtYNJJg" // Votre lien d'invitation

// Interface pour les données de commande
export interface OrderData {
  orderId: string
  customerName: string
  customerDiscord: string
  items: Array<{
    id: string
    title: string
    price: number
    category: string
  }>
  totalAmount: number
  paymentMethod: string
  transactionId?: string
}

// Interface pour les guides
export interface GuideFile {
  name: string
  content: Buffer
  description: string
}

class DiscordBot {
  private client: Client
  private isReady = false

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
    })

    this.setupEventHandlers()
  }

  private setupEventHandlers() {
    this.client.once("ready", () => {
      console.log(`Bot Discord connecté en tant que ${this.client.user?.tag}`)
      this.isReady = true
    })

    this.client.on("error", (error) => {
      console.error("Erreur du bot Discord:", error)
    })
  }

  async initialize() {
    if (!DISCORD_BOT_TOKEN) {
      throw new Error("DISCORD_BOT_TOKEN non configuré")
    }

    try {
      await this.client.login(DISCORD_BOT_TOKEN)

      // Attendre que le bot soit prêt
      while (!this.isReady) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      return true
    } catch (error) {
      console.error("Erreur lors de la connexion du bot Discord:", error)
      throw error
    }
  }

  async findUserByTag(discordTag: string): Promise<any> {
    try {
      // Nettoyer le tag Discord (supprimer les espaces, etc.)
      const cleanTag = discordTag.trim()

      // Si c'est un ID Discord (que des chiffres)
      if (/^\d+$/.test(cleanTag)) {
        try {
          const user = await this.client.users.fetch(cleanTag)
          return user
        } catch (error) {
          console.log(`Utilisateur avec ID ${cleanTag} non trouvé`)
        }
      }

      // Si c'est un tag avec discriminateur (username#1234)
      if (cleanTag.includes("#")) {
        const [username, discriminator] = cleanTag.split("#")

        // Chercher dans le cache des utilisateurs
        const user = this.client.users.cache.find(
          (u) => u.username.toLowerCase() === username.toLowerCase() && u.discriminator === discriminator,
        )

        if (user) return user
      }

      // Chercher par nom d'utilisateur seulement (nouveau système Discord)
      const userByUsername = this.client.users.cache.find((u) => u.username.toLowerCase() === cleanTag.toLowerCase())

      if (userByUsername) return userByUsername

      // Si on a accès à une guilde, chercher dans les membres
      if (DISCORD_GUILD_ID) {
        try {
          const guild = await this.client.guilds.fetch(DISCORD_GUILD_ID)
          const members = await guild.members.fetch()

          const member = members.find(
            (m) =>
              m.user.username.toLowerCase() === cleanTag.toLowerCase() ||
              (cleanTag.includes("#") &&
                m.user.username.toLowerCase() === cleanTag.split("#")[0].toLowerCase() &&
                m.user.discriminator === cleanTag.split("#")[1]),
          )

          if (member) return member.user
        } catch (error) {
          console.log("Erreur lors de la recherche dans la guilde:", error)
        }
      }

      return null
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateur:", error)
      return null
    }
  }

  // Reste du code inchangé...
}

// Ajouter une fonction pour tester la connexion du bot
export async function testBotConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const bot = new DiscordBot()
    await bot.initialize()

    return {
      success: true,
      message: "Bot connecté avec succès! Le token est valide.",
    }
  } catch (error) {
    console.error("Erreur de connexion:", error)
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
    }
  }
}

// Instance singleton du bot
let botInstance: DiscordBot | null = null

export async function getDiscordBot(): Promise<DiscordBot> {
  if (!botInstance) {
    botInstance = new DiscordBot()
    await botInstance.initialize()
  }
  return botInstance
}

// Mock function for generateGuides
async function generateGuides(items: any[]): Promise<GuideFile[]> {
  // Replace this with your actual guide generation logic
  return items.map((item, index) => ({
    name: `guide-${index + 1}.pdf`,
    content: Buffer.from(`This is a dummy guide for item: ${item.title}`),
    description: `A guide for using the ${item.title}`,
  }))
}

export async function sendGuidesToUser(orderData: OrderData): Promise<boolean> {
  try {
    const bot = await getDiscordBot()

    // Générer les guides (ici on simule avec du contenu PDF)
    const guides = await generateGuides(orderData.items)

    // Envoyer le message de bienvenue
    await bot.sendWelcomeMessage(orderData.customerDiscord, orderData.customerName)

    // Attendre un peu avant d'envoyer les guides
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Envoyer les guides
    return await bot.sendOrderConfirmation(orderData, guides)
  } catch (error) {
    console.error("Erreur lors de l'envoi des guides:", error)
    return false
  }
}

// Reste du code inchangé...
