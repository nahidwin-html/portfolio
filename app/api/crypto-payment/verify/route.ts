import { NextResponse } from "next/server"
import { sendGuidesToUser, type OrderData } from "@/lib/discord-bot"

// Simulation d'une vérification de transaction blockchain
async function verifyBlockchainTransaction(
  cryptoType: string,
  address: string,
  expectedAmount: string,
  transactionId?: string,
): Promise<{ verified: boolean; transactionId?: string }> {
  // Dans un environnement réel, vous utiliseriez des APIs blockchain comme:
  // - Filecoin: Filfox API, Lotus API
  // - Solana: Solana Web3.js, Solscan API
  // - Ethereum: Etherscan API, Infura, Alchemy

  // Simulation pour la démo
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 80% de chance que la transaction soit vérifiée
  const isVerified = Math.random() > 0.2

  return {
    verified: isVerified,
    transactionId: transactionId || `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, cryptoType, address, expectedAmount, customerDiscord, customerName, items, totalAmount } = body

    // Vérifier la transaction sur la blockchain
    const verification = await verifyBlockchainTransaction(cryptoType, address, expectedAmount)

    if (verification.verified) {
      // Préparer les données de commande
      const orderData: OrderData = {
        orderId,
        customerName,
        customerDiscord,
        items,
        totalAmount,
        paymentMethod: `${cryptoType.charAt(0).toUpperCase() + cryptoType.slice(1)} (Crypto)`,
        transactionId: verification.transactionId,
      }

      // Envoyer les guides via Discord
      const guideSent = await sendGuidesToUser(orderData)

      if (guideSent) {
        // Envoyer également une notification interne
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order-confirmation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          })
        } catch (error) {
          console.error("Erreur notification interne:", error)
        }

        return NextResponse.json({
          success: true,
          verified: true,
          transactionId: verification.transactionId,
          message: "Paiement vérifié et guides envoyés",
        })
      } else {
        return NextResponse.json(
          {
            success: false,
            verified: true,
            transactionId: verification.transactionId,
            error: "Paiement vérifié mais échec de l'envoi des guides",
          },
          { status: 500 },
        )
      }
    } else {
      return NextResponse.json({
        success: false,
        verified: false,
        message: "Transaction non trouvée ou montant incorrect",
      })
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du paiement:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification du paiement" }, { status: 500 })
  }
}
