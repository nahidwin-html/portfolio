// Types pour les paiements en cryptomonnaies
export type CryptoType = "filecoin" | "solana" | "ethereum"

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
  filecoin: 40, // 1 FIL = 40 EUR
  solana: 180, // 1 SOL = 180 EUR
  ethereum: 3000, // 1 ETH = 3000 EUR
}

// Vos adresses de paiement réelles
const CRYPTO_ADDRESSES = {
  filecoin: "f1bbwxknlnbddqwkoryau5q7abis7huiyvhxigrmq", // Votre adresse Filecoin
  solana: "8KRPDjXA8HUY8gVPH746hf1KUMrLLcBUzHQrTtrDpsnV", // Votre adresse Solana
  ethereum: "0xbfC56dFd0217C5a37Bd368ba82E8821f0D3BAa4B", // Votre adresse Ethereum
}

/**
 * Convertit un montant en EUR en cryptomonnaie
 */
export function convertEurToCrypto(amount: number, cryptoType: CryptoType): string {
  const rate = CRYPTO_RATES[cryptoType]
  const cryptoAmount = amount / rate

  // Formater avec la précision appropriée
  switch (cryptoType) {
    case "filecoin":
      return cryptoAmount.toFixed(6) // Filecoin utilise 6 décimales
    case "solana":
      return cryptoAmount.toFixed(9) // Solana utilise 9 décimales
    case "ethereum":
      return cryptoAmount.toFixed(6) // Ethereum utilise 6 décimales
    default:
      return cryptoAmount.toFixed(6)
  }
}

/**
 * Obtient l'adresse de paiement pour un type de crypto
 */
export function getCryptoAddress(cryptoType: CryptoType): string {
  return CRYPTO_ADDRESSES[cryptoType]
}

/**
 * Obtient le nom complet de la cryptomonnaie
 */
export function getCryptoName(cryptoType: CryptoType): string {
  switch (cryptoType) {
    case "filecoin":
      return "Filecoin"
    case "solana":
      return "Solana"
    case "ethereum":
      return "Ethereum"
    default:
      return cryptoType
  }
}

/**
 * Obtient le symbole de la cryptomonnaie
 */
export function getCryptoSymbol(cryptoType: CryptoType): string {
  switch (cryptoType) {
    case "filecoin":
      return "FIL"
    case "solana":
      return "SOL"
    case "ethereum":
      return "ETH"
    default:
      return cryptoType.toUpperCase()
  }
}

/**
 * Crée un nouvel objet de paiement en cryptomonnaie
 */
export function createCryptoPayment(orderId: string, amountEur: number, cryptoType: CryptoType): CryptoPayment {
  const cryptoAmount = convertEurToCrypto(amountEur, cryptoType)
  const address = getCryptoAddress(cryptoType)

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
