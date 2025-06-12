// Types pour les paiements en cryptomonnaies
export type CryptoType = "bitcoin" | "ethereum"

export interface CryptoPayment {
  orderId: string
  cryptoType: CryptoType
  amount: string
  address: string
  status: "pending" | "confirming" | "completed" | "expired"
  createdAt: number
  expiresAt: number
}

// Taux de conversion fictifs (dans un environnement réel, vous utiliseriez une API pour obtenir les taux actuels)
const CRYPTO_RATES = {
  bitcoin: 50000, // 1 BTC = 50000 EUR
  ethereum: 3000, // 1 ETH = 3000 EUR
}

/**
 * Convertit un montant en EUR en cryptomonnaie
 */
export function convertEurToCrypto(amount: number, cryptoType: CryptoType): string {
  const rate = CRYPTO_RATES[cryptoType]
  const cryptoAmount = amount / rate

  // Formater avec la précision appropriée
  return cryptoType === "bitcoin"
    ? cryptoAmount.toFixed(8) // Bitcoin utilise généralement 8 décimales
    : cryptoAmount.toFixed(6) // Ethereum utilise généralement 6 décimales
}

/**
 * Crée un nouvel objet de paiement en cryptomonnaie
 */
export function createCryptoPayment(orderId: string, amountEur: number, cryptoType: CryptoType): CryptoPayment {
  const cryptoAmount = convertEurToCrypto(amountEur, cryptoType)

  // Dans un environnement réel, vous généreriez une adresse unique pour chaque paiement
  const address =
    cryptoType === "bitcoin"
      ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
      : "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

  const now = Date.now()

  return {
    orderId,
    cryptoType,
    amount: cryptoAmount,
    address,
    status: "pending",
    createdAt: now,
    expiresAt: now + 900000, // 15 minutes en millisecondes
  }
}

/**
 * Vérifie le statut d'un paiement en cryptomonnaie
 * Dans un environnement réel, cette fonction interrogerait une API blockchain
 */
export async function checkCryptoPaymentStatus(payment: CryptoPayment): Promise<CryptoPayment> {
  // Simulation d'une vérification de paiement
  // Dans un environnement réel, vous interrogeriez une API blockchain

  // Si le paiement a expiré
  if (Date.now() > payment.expiresAt) {
    return {
      ...payment,
      status: "expired",
    }
  }

  // Simuler une réponse aléatoire pour la démonstration
  const random = Math.random()

  if (random < 0.7) {
    // 70% de chance que le paiement soit toujours en attente
    return payment
  } else if (random < 0.9) {
    // 20% de chance que le paiement soit en cours de confirmation
    return {
      ...payment,
      status: "confirming",
    }
  } else {
    // 10% de chance que le paiement soit complété
    return {
      ...payment,
      status: "completed",
    }
  }
}
