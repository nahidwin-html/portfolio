import { NextResponse } from "next/server"
import { testBotConnection } from "@/lib/discord-bot"

export async function POST() {
  try {
    const result = await testBotConnection()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Erreur lors du test de connexion Discord:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erreur inconnue lors du test de connexion",
      },
      { status: 500 },
    )
  }
}
