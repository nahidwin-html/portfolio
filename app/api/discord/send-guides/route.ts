import { NextResponse } from "next/server"
import { sendGuidesToUser, type OrderData } from "@/lib/discord-bot"

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json()

    // Valider les données
    if (!orderData.customerDiscord || !orderData.orderId || !orderData.items?.length) {
      return NextResponse.json({ error: "Données de commande incomplètes" }, { status: 400 })
    }

    // Envoyer les guides via Discord
    const success = await sendGuidesToUser(orderData)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Guides envoyés avec succès sur Discord",
      })
    } else {
      return NextResponse.json({ error: "Échec de l'envoi des guides" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des guides Discord:", error)
    return NextResponse.json({ error: "Erreur serveur lors de l'envoi des guides" }, { status: 500 })
  }
}
