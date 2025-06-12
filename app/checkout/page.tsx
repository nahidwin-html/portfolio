"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import CryptoOption from "./crypto-option"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("crypto")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
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
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          orderId,
          items,
          totalAmount: getTotalPrice(),
          paymentMethod: paymentMethod === "card" ? "Carte bancaire" : "Paiement mobile",
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email de confirmation")
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
                <CheckCircle className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Paiement réussi !</h1>
            <p className="text-xl text-gray-300">
              Merci pour votre achat. Vous recevrez vos guides par email dans les prochaines minutes.
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    placeholder="votre@email.com"
                    required
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                  />
                  <p className="text-xs text-gray-400">Vos guides seront envoyés à cette adresse email.</p>
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

              <Tabs defaultValue="crypto" onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6 bg-gray-900/50">
                  <TabsTrigger value="crypto" className="data-[state=active]:bg-gray-800">
                    Crypto
                  </TabsTrigger>
                  <TabsTrigger value="card" className="data-[state=active]:bg-gray-800">
                    Carte
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="data-[state=active]:bg-gray-800">
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="crypto">
                  <div className="mb-4 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-400 font-medium">Recommandé - Paiement instantané</span>
                    </div>
                    <p className="text-green-200 text-sm mt-1">
                      Paiement sécurisé avec Bitcoin ou Ethereum. Aucun compte requis.
                    </p>
                  </div>
                  <CryptoOption
                    totalAmount={getTotalPrice()}
                    customerEmail={customerInfo.email}
                    customerName={customerInfo.name}
                  />
                </TabsContent>

                <TabsContent value="card">
                  <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-yellow-400 font-medium">En cours de configuration</span>
                    </div>
                    <p className="text-yellow-200 text-sm mt-1">
                      Le paiement par carte sera bientôt disponible. Utilisez crypto en attendant.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 opacity-50 pointer-events-none">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                        disabled
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                        disabled
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="button" className="w-full bg-gray-600 cursor-not-allowed" disabled>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Bientôt disponible
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="mobile">
                  <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-yellow-400 font-medium">En cours de configuration</span>
                    </div>
                    <p className="text-yellow-200 text-sm mt-1">Apple Pay et Google Pay seront bientôt disponibles.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-6 opacity-50 pointer-events-none">
                    <Button
                      className="flex flex-col items-center justify-center h-24 bg-black hover:bg-gray-900 border border-gray-700"
                      disabled
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-2"
                      >
                        <path d="M12 19c-4.3 0-7.8-3.4-7.8-7.8 0-4.3 3.4-7.8 7.8-7.8 4.3 0 7.8 3.4 7.8 7.8 0 4.3-3.4 7.8-7.8 7.8z" />
                        <path d="M12 19V4.5" />
                        <path d="M7 7.8h10" />
                        <path d="M7 15.8h10" />
                      </svg>
                      Bientôt disponible
                    </Button>

                    <Button
                      className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100 text-black border border-gray-300"
                      disabled
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <circle cx="15.5" cy="8.5" r="1.5" />
                        <circle cx="15.5" cy="15.5" r="1.5" />
                        <circle cx="8.5" cy="15.5" r="1.5" />
                      </svg>
                      Bientôt disponible
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
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
                <p>Livraison immédiate par email après paiement.</p>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-400 font-medium">Crypto recommandé</span>
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
