"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, RefreshCw, Lock } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import CryptoOption from "./crypto-option"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    discord: "",
    address: "",
  })

  if (items.length === 0 && !isComplete) {
    router.push("/cart")
    return null
  }

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Générer un ID de commande unique
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

      // Envoyer l'email de confirmation
      const response = await fetch("/api/order-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerDiscord: customerInfo.discord,
          customerName: customerInfo.name,
          orderId,
          items,
          totalAmount: getTotalPrice(),
          paymentMethod: "Crypto",
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la confirmation")
      }

      // Simuler un traitement de paiement
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
        clearCart()
      }, 2000)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
        <div className="container mx-auto py-16 px-4 max-w-3xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-green-600 to-gray-800 p-4">
                <RefreshCw className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Commande en cours de traitement</h1>
            <p className="text-xl text-gray-300">
              Merci pour votre commande. Vous recevrez vos guides sur Discord dès que votre paiement sera confirmé.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900 mt-4">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/cart" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au panier
        </Link>

        <h1 className="text-3xl font-bold mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Informations client</h2>
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    placeholder="Votre nom"
                    required
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discord">Identifiant Discord</Label>
                  <Input
                    id="discord"
                    name="discord"
                    value={customerInfo.discord}
                    onChange={handleCustomerInfoChange}
                    placeholder="exemple#1234 ou exemple"
                    required
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                  />
                  <p className="text-xs text-gray-400">Vos guides seront envoyés à cet identifiant Discord.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse (facultatif)</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleCustomerInfoChange}
                    placeholder="Votre adresse"
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Méthode de paiement</h2>

              <div className="mb-4 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-400 font-medium">Paiement en cryptomonnaie</span>
                </div>
                <p className="text-green-200 text-sm mt-1">
                  Paiement sécurisé avec Filecoin, Solana ou Ethereum. Aucun compte requis.
                </p>
              </div>

              <CryptoOption
                totalAmount={getTotalPrice()}
                customerDiscord={customerInfo.discord}
                customerName={customerInfo.name}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.category}</p>
                    </div>
                    <p className="font-bold">{item.price.toFixed(2)} €</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>{getTotalPrice().toFixed(2)} €</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 p-4 rounded-lg text-sm text-gray-400 space-y-2 mb-4">
                <div className="flex items-start">
                  <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Paiement 100% sécurisé avec cryptage SSL</p>
                </div>
                <p>En finalisant votre achat, vous acceptez nos conditions générales de vente.</p>
                <p>Livraison immédiate sur Discord après paiement.</p>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="h-5 w-5 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-400 font-medium">Crypto uniquement</span>
                </div>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Paiement instantané</li>
                  <li>• Aucun compte requis</li>
                  <li>• Frais réduits</li>
                  <li>• 100% sécurisé</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
