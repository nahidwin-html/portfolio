"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Copy, RefreshCw, Clock, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"
import { getCryptoAddress, getCryptoName, getCryptoSymbol } from "@/lib/crypto-payment"

export default function CryptoPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart, getTotalPrice, items } = useCart()

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirming" | "completed">("pending")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes en secondes
  const [cryptoType, setCryptoType] = useState<"filecoin" | "solana" | "ethereum">("filecoin")
  const [cryptoAmount, setCryptoAmount] = useState<string>("0")
  const [orderId, setOrderId] = useState<string>("")
  const [discordId, setDiscordId] = useState<string>("")
  const [customerName, setCustomerName] = useState<string>("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationInterval, setVerificationInterval] = useState<NodeJS.Timeout | null>(null)

  // Récupérer les paramètres de l'URL
  useEffect(() => {
    const type = searchParams.get("type") as "filecoin" | "solana" | "ethereum"
    const amount = searchParams.get("amount")
    const order = searchParams.get("orderId")
    const discord = searchParams.get("discord")
    const name = searchParams.get("name")

    if (type && (type === "filecoin" || type === "solana" || type === "ethereum")) {
      setCryptoType(type)
    }

    if (amount) {
      setCryptoAmount(amount)
    }

    if (order) {
      setOrderId(order)
    } else {
      setOrderId(`ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
    }

    if (discord) {
      setDiscordId(decodeURIComponent(discord))
    }

    if (name) {
      setCustomerName(decodeURIComponent(name))
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

  // Vérification automatique du paiement
  const verifyPayment = async () => {
    if (isVerifying || paymentStatus === "completed") return

    setIsVerifying(true)

    try {
      const response = await fetch("/api/crypto-payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          cryptoType,
          address: getCryptoAddress(cryptoType),
          expectedAmount: cryptoAmount,
          customerDiscord: discordId,
          customerName,
          items,
          totalAmount: getTotalPrice(),
        }),
      })

      const result = await response.json()

      if (result.verified) {
        setPaymentStatus("completed")
        clearCart()

        if (verificationInterval) {
          clearInterval(verificationInterval)
          setVerificationInterval(null)
        }

        toast({
          title: "Paiement confirmé !",
          description: "Vos guides ont été envoyés sur Discord.",
        })

        // Rediriger vers la page de succès après 2 secondes
        setTimeout(() => {
          router.push(`/payment-success?orderId=${orderId}&discord=${encodeURIComponent(discordId)}`)
        }, 2000)
      } else {
        toast({
          title: "Paiement en attente",
          description: "Transaction non encore confirmée sur la blockchain.",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error)
      toast({
        title: "Erreur de vérification",
        description: "Impossible de vérifier le paiement. Réessayez.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  // Démarrer la vérification automatique
  useEffect(() => {
    if (paymentStatus === "pending" && !verificationInterval) {
      // Vérifier toutes les 30 secondes
      const interval = setInterval(verifyPayment, 30000)
      setVerificationInterval(interval)
    }

    return () => {
      if (verificationInterval) {
        clearInterval(verificationInterval)
      }
    }
  }, [paymentStatus])

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

  if (paymentStatus === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
        <div className="container mx-auto py-16 px-4 max-w-2xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-green-600 to-gray-800 p-4">
                <CheckCircle className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Paiement confirmé !</h1>
            <p className="text-xl text-gray-300">
              Vos guides ont été envoyés sur Discord. Vérifiez vos messages privés.
            </p>
            <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
              <p className="text-green-400 font-medium">✅ Transaction vérifiée sur la blockchain</p>
              <p className="text-green-400 font-medium">✅ Guides envoyés sur Discord: {discordId}</p>
              <p className="text-green-400 font-medium">✅ Commande #{orderId} complétée</p>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    )
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
                onClick={verifyPayment}
                className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900"
                disabled={isVerifying}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isVerifying ? "animate-spin" : ""}`} />
                {isVerifying ? "Vérification en cours..." : "Vérifier le paiement"}
              </Button>

              <div className="text-center text-sm text-gray-400">
                <p>ID de commande: {orderId}</p>
                {discordId && <p>Discord: {discordId}</p>}
                <p className="mt-1">🤖 Vérification automatique toutes les 30 secondes</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">🤖 Bot Discord automatique</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Vérification automatique des transactions blockchain</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Envoi instantané des guides sur Discord</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Confirmation de commande automatique</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Support technique intégré</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg text-sm">
              <p className="font-medium text-blue-300">📱 Après votre paiement :</p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-blue-200">
                <li>Notre bot vérifie automatiquement votre transaction</li>
                <li>Vos guides sont envoyés instantanément sur Discord</li>
                <li>Vous recevez une confirmation avec tous les détails</li>
                <li>Support disponible 24/7 via Discord</li>
              </ol>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-900/20 border border-green-800/50 rounded-lg text-sm">
            <p className="font-medium text-green-300">Vos adresses crypto :</p>
            <div className="space-y-1 mt-2">
              <p className="text-green-200">
                <span className="font-medium">Filecoin:</span>{" "}
                <span className="font-mono text-xs">f1bbwxknlnbddqwkoryau5q7abis7huiyvhxigrmq</span>
              </p>
              <p className="text-green-200">
                <span className="font-medium">Solana:</span>{" "}
                <span className="font-mono text-xs">
                  d87bef980b81a67e2394ce1856b26aacf0002e5066ac027e941d7891a1e55f66
                </span>
              </p>
              <p className="text-green-200">
                <span className="font-medium">Ethereum:</span>{" "}
                <span className="font-mono text-xs">0xbfC56dFd0217C5a37Bd368ba82E8821f0D3BAa4B</span>
              </p>
            </div>
            <div className="mt-3 p-2 bg-blue-900/20 border border-blue-700/50 rounded">
              <p className="text-blue-200 text-xs">
                💬 <strong>Rejoignez notre Discord :</strong>{" "}
                <a
                  href="https://discord.gg/FmtYNJJg"
                  target="_blank"
                  className="text-blue-400 hover:underline"
                  rel="noreferrer"
                >
                  discord.gg/FmtYNJJg
                </a>
              </p>
              <p className="text-blue-200 text-xs mt-1">
                Vos guides seront automatiquement envoyés sur Discord après confirmation du paiement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
