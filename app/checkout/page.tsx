"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import CryptoOption from "./crypto-option"
import PayPalButton from "@/components/paypal-button"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
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

  const handlePayPalSuccess = (details: any) => {
    setIsComplete(true)
    // La redirection est gérée dans le composant PayPalButton
  }

  const handlePayPalError = (error: any) => {
    console.error("Erreur PayPal:", error)
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

              <Tabs defaultValue="paypal" onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6 bg-gray-900/50">
                  <TabsTrigger value="paypal" className="data-[state=active]:bg-gray-800">
                    PayPal
                  </TabsTrigger>
                  <TabsTrigger value="card" className="data-[state=active]:bg-gray-800">
                    Carte
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="data-[state=active]:bg-gray-800">
                    Crypto
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="data-[state=active]:bg-gray-800">
                    Mobile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="paypal">
                  <div className="space-y-6">
                    <div className="text-center py-4">
                      <div className="bg-[#003087] text-white py-3 px-6 rounded-lg inline-flex items-center text-2xl font-bold mb-4">
                        <span className="text-[#0079C1]">Pay</span>
                        <span className="text-[#00457C]">Pal</span>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Paiement sécurisé avec PayPal. Vous pouvez payer avec votre compte PayPal ou votre carte
                        bancaire.
                      </p>
                    </div>

                    {customerInfo.email ? (
                      <PayPalButton onSuccess={handlePayPalSuccess} onError={handlePayPalError} />
                    ) : (
                      <div className="text-center py-8 bg-gray-900/30 rounded-lg border border-gray-700">
                        <p className="text-gray-400">Veuillez renseigner votre email pour continuer avec PayPal</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="card">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900"
                        disabled={isProcessing || !customerInfo.name || !customerInfo.email}
                      >
                        {isProcessing ? (
                          "Traitement en cours..."
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Payer {getTotalPrice().toFixed(2)} €
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center text-sm text-gray-400 mt-4">
                      <Lock className="h-4 w-4 mr-2" />
                      Paiement sécurisé par SSL
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="crypto">
                  <CryptoOption
                    totalAmount={getTotalPrice()}
                    customerEmail={customerInfo.email}
                    customerName={customerInfo.name}
                  />
                </TabsContent>

                <TabsContent value="mobile">
                  <div className="grid grid-cols-2 gap-4 py-6">
                    <Button
                      onClick={handleSubmit}
                      className="flex flex-col items-center justify-center h-24 bg-black hover:bg-gray-900 border border-gray-700"
                      disabled={isProcessing || !customerInfo.name || !customerInfo.email}
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
                      Apple Pay
                    </Button>

                    <Button
                      onClick={handleSubmit}
                      className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100 text-black border border-gray-300"
                      disabled={isProcessing || !customerInfo.name || !customerInfo.email}
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
                      Google Pay
                    </Button>
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-4">
                    Vous serez redirigé vers votre application de paiement mobile.
                  </p>
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

              <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 p-4 rounded-lg text-sm text-gray-400 space-y-2">
                <div className="flex items-start">
                  <Lock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Paiement 100% sécurisé avec cryptage SSL</p>
                </div>
                <p>En finalisant votre achat, vous acceptez nos conditions générales de vente.</p>
                <p>Livraison immédiate par email après paiement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
