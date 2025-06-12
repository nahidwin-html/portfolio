"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Copy, RefreshCw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"

// Adresses de paiement statiques (dans un environnement de production, ces adresses seraient générées dynamiquement)
const CRYPTO_ADDRESSES = {
  bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
}

export default function CryptoPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart, getTotalPrice } = useCart()

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirming" | "completed">("pending")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes en secondes
  const [cryptoType, setCryptoType] = useState<"bitcoin" | "ethereum">("bitcoin")
  const [cryptoAmount, setCryptoAmount] = useState<string>("0")
  const [orderId, setOrderId] = useState<string>("")

  // Récupérer les paramètres de l'URL
  useEffect(() => {
    const type = searchParams.get("type") as "bitcoin" | "ethereum"
    const amount = searchParams.get("amount")
    const order = searchParams.get("orderId")

    if (type && (type === "bitcoin" || type === "ethereum")) {
      setCryptoType(type)
    }

    if (amount) {
      setCryptoAmount(amount)
    }

    if (order) {
      setOrderId(order)
    } else {
      // Générer un ID de commande si non fourni
      setOrderId(`ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
    }
  }, [searchParams])

  // Compte à rebours
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simuler la vérification du paiement
  useEffect(() => {
    // Dans un environnement réel, vous utiliseriez une API pour vérifier le statut du paiement
    const checkPayment = setTimeout(() => {
      // Simuler une confirmation après 20 secondes
      setPaymentStatus("confirming")

      // Simuler un paiement complété après 40 secondes
      setTimeout(() => {
        setPaymentStatus("completed")
        clearCart()
      }, 20000)
    }, 20000)

    return () => clearTimeout(checkPayment)
  }, [clearCart])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Adresse copiée",
      description: "L'adresse a été copiée dans votre presse-papiers.",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Rediriger vers la page de succès si le paiement est complété
  if (paymentStatus === "completed") {
    router.push(`/payment-success?orderId=${orderId}`)
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-gray-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/checkout" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au paiement
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-red-950/30 to-gray-950/30 border border-red-800/50 rounded-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">
                Paiement en {cryptoType === "bitcoin" ? "Bitcoin" : "Ethereum"}
              </h1>
              <p className="text-red-200">Veuillez envoyer exactement le montant indiqué à l'adresse ci-dessous</p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-white p-2 rounded-lg">
                {/* Dans un environnement réel, vous généreriez un QR code dynamique */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${CRYPTO_ADDRESSES[cryptoType]}`}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-red-200">Montant à payer:</span>
                  <span className="font-bold">
                    {cryptoAmount} {cryptoType === "bitcoin" ? "BTC" : "ETH"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-200">Équivalent en EUR:</span>
                  <span className="font-bold">{getTotalPrice().toFixed(2)} €</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-red-200 mb-1">
                  Adresse {cryptoType === "bitcoin" ? "Bitcoin" : "Ethereum"}:
                </label>
                <div className="flex items-center">
                  <div className="bg-black/50 p-3 rounded-l-lg flex-grow font-mono text-sm overflow-x-auto">
                    {CRYPTO_ADDRESSES[cryptoType]}
                  </div>
                  <button
                    onClick={() => copyToClipboard(CRYPTO_ADDRESSES[cryptoType])}
                    className="bg-red-800 hover:bg-red-700 p-3 rounded-r-lg"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-900/20 to-black/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-red-400" />
                    <span className="font-medium">Temps restant:</span>
                  </div>
                  <span className={`font-bold ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`h-3 w-3 rounded-full mr-2 ${
                        paymentStatus === "pending"
                          ? "bg-yellow-500"
                          : paymentStatus === "confirming"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-green-500"
                      }`}
                    />
                    <span>Statut:</span>
                  </div>
                  <span className="font-medium">
                    {paymentStatus === "pending"
                      ? "En attente de paiement"
                      : paymentStatus === "confirming"
                        ? "Confirmation en cours..."
                        : "Paiement confirmé"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                onClick={() => setPaymentStatus("confirming")}
                className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Vérifier le paiement
              </Button>

              <div className="text-center text-sm text-red-200">
                <p>ID de commande: {orderId}</p>
                <p className="mt-1">
                  Besoin d'aide? Contactez notre support à{" "}
                  <a href="mailto:support@t3ch-france.com" className="text-red-400 hover:underline">
                    support@t3ch-france.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-red-950/30 to-gray-950/30 border border-red-800/50 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Instructions</h2>
            <ol className="space-y-2 text-red-200 list-decimal list-inside">
              <li>Ouvrez votre portefeuille {cryptoType === "bitcoin" ? "Bitcoin" : "Ethereum"}</li>
              <li>
                Envoyez{" "}
                <span className="font-bold text-white">
                  {cryptoAmount} {cryptoType === "bitcoin" ? "BTC" : "ETH"}
                </span>{" "}
                à l'adresse indiquée
              </li>
              <li>Attendez la confirmation de la transaction (généralement 1-3 confirmations)</li>
              <li>Une fois confirmé, vous recevrez vos guides par email</li>
            </ol>

            <div className="mt-4 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-sm">
              <p className="font-medium text-red-300">Important:</p>
              <p className="text-red-200">
                Assurez-vous d'envoyer le montant exact depuis votre portefeuille personnel. Les transactions en
                cryptomonnaies sont irréversibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
