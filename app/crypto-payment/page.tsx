"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Copy, RefreshCw, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"
import { getCryptoAddress, getCryptoName, getCryptoSymbol } from "@/lib/crypto-payment"

export default function CryptoPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart, getTotalPrice } = useCart()

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirming" | "completed">("pending")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes en secondes
  const [cryptoType, setCryptoType] = useState<"filecoin" | "solana" | "ethereum">("filecoin")
  const [cryptoAmount, setCryptoAmount] = useState<string>("0")
  const [orderId, setOrderId] = useState<string>("")

  // Récupérer les paramètres de l'URL
  useEffect(() => {
    const type = searchParams.get("type") as "filecoin" | "solana" | "ethereum"
    const amount = searchParams.get("amount")
    const order = searchParams.get("orderId")

    if (type && (type === "filecoin" || type === "solana" || type === "ethereum")) {
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

  const cryptoAddress = getCryptoAddress(cryptoType)
  const cryptoName = getCryptoName(cryptoType)
  const cryptoSymbol = getCryptoSymbol(cryptoType)

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

  const openBlockExplorer = () => {
    let url = ""
    switch (cryptoType) {
      case "filecoin":
        url = `https://filfox.info/en/address/${cryptoAddress}`
        break
      case "solana":
        url = `https://solscan.io/account/${cryptoAddress}`
        break
      case "ethereum":
        url = `https://etherscan.io/address/${cryptoAddress}`
        break
    }
    window.open(url, "_blank")
  }

  const getExplorerName = () => {
    switch (cryptoType) {
      case "filecoin":
        return "Filfox"
      case "solana":
        return "Solscan"
      case "ethereum":
        return "Etherscan"
      default:
        return "Explorer"
    }
  }

  // Rediriger vers la page de succès si le paiement est complété
  if (paymentStatus === "completed") {
    router.push(`/payment-success?orderId=${orderId}`)
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/checkout" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au paiement
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Paiement en {cryptoName}</h1>
              <p className="text-gray-300">Veuillez envoyer exactement le montant indiqué à l'adresse ci-dessous</p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-white p-2 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${cryptoAddress}`}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Montant à payer:</span>
                  <span className="font-bold">
                    {cryptoAmount} {cryptoSymbol}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Équivalent en EUR:</span>
                  <span className="font-bold">{getTotalPrice().toFixed(2)} €</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Adresse {cryptoName}:</label>
                <div className="flex items-center">
                  <div className="bg-black/50 p-3 rounded-l-lg flex-grow font-mono text-sm overflow-x-auto">
                    {cryptoAddress}
                  </div>
                  <button
                    onClick={() => copyToClipboard(cryptoAddress)}
                    className="bg-gray-800 hover:bg-gray-700 p-3 rounded-r-lg"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openBlockExplorer}
                    className="border-gray-700 text-gray-400 hover:bg-gray-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Voir sur {getExplorerName()}
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-400" />
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
                className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Vérifier le paiement
              </Button>

              <div className="text-center text-sm text-gray-400">
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

          <div className="mt-6 bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Instructions</h2>
            <ol className="space-y-2 text-gray-300 list-decimal list-inside">
              <li>Ouvrez votre portefeuille {cryptoName}</li>
              <li>
                Envoyez{" "}
                <span className="font-bold text-white">
                  {cryptoAmount} {cryptoSymbol}
                </span>{" "}
                à l'adresse indiquée
              </li>
              <li>Attendez la confirmation de la transaction (généralement 1-3 confirmations)</li>
              <li>Une fois confirmé, vous recevrez vos guides par email</li>
            </ol>

            <div className="mt-4 p-3 bg-green-900/20 border border-green-800/50 rounded-lg text-sm">
              <p className="font-medium text-green-300">Vos adresses crypto :</p>
              <div className="space-y-1 mt-2">
                <p className="text-green-200">
                  <span className="font-medium">Filecoin:</span>{" "}
                  <span className="font-mono text-xs">f1bbwxknlnbddqwkoryau5q7abis7huiyvhxigrmq</span>
                </p>
                <p className="text-green-200">
                  <span className="font-medium">Solana:</span>{" "}
                  <span className="font-mono text-xs">8KRPDjXA8HUY8gVPH746hf1KUMrLLcBUzHQrTtrDpsnV</span>
                </p>
                <p className="text-green-200">
                  <span className="font-medium">Ethereum:</span>{" "}
                  <span className="font-mono text-xs">0xbfC56dFd0217C5a37Bd368ba82E8821f0D3BAa4B</span>
                </p>
              </div>
              <p className="text-green-200 mt-2">
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
