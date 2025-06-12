import { NextResponse } from "next/server"
import { checkCryptoPaymentStatus, type CryptoPayment } from "@/lib/crypto-payment"

export async function POST(request: Request) {
  try {
    const payment = (await request.json()) as CryptoPayment

    // Vérifier le statut du paiement
    const updatedPayment = await checkCryptoPaymentStatus(payment)

    return NextResponse.json(updatedPayment)
  } catch (error) {
    console.error("Erreur lors de la vérification du paiement:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification du paiement" }, { status: 500 })
  }
}
