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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  if (items.length === 0 && !isComplete) {
    router.push("/cart")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      clearCart()
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto py-16 px-4 max-w-3xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-600 p-4">
                <CheckCircle className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Paiement réussi !</h1>
            <p className="text-xl text-blue-300">
              Merci pour votre achat. Vous recevrez vos guides par email dans les prochaines minutes.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 mt-4">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/cart" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au panier
        </Link>

        <h1 className="text-3xl font-bold mb-8">Paiement</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Méthode de paiement</h2>

              <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="card">Carte</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                </TabsList>

                <TabsContent value="card">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-blue-950/50 border-blue-800 text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          className="bg-blue-950/50 border-blue-800 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="bg-blue-950/50 border-blue-800 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nom sur la carte</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-blue-950/50 border-blue-800 text-white"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isProcessing}>
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

                    <div className="flex items-center justify-center text-sm text-blue-300 mt-4">
                      <Lock className="h-4 w-4 mr-2" />
                      Paiement sécurisé par SSL
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="paypal">
                  <div className="text-center py-8 space-y-6">
                    <div className="bg-[#003087] text-white py-3 px-6 rounded-lg inline-flex items-center text-2xl font-bold">
                      <span className="text-[#0079C1]">Pay</span>
                      <span className="text-[#00457C]">Pal</span>
                    </div>
                    <p className="text-blue-300">Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                    <Button
                      onClick={handleSubmit}
                      className="bg-[#0070BA] hover:bg-[#005ea6] text-white"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Traitement en cours..." : `Payer avec PayPal (${getTotalPrice().toFixed(2)} €)`}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="crypto">
                  <div className="space-y-6 py-4">
                    <RadioGroup defaultValue="bitcoin">
                      <div className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value="bitcoin" id="bitcoin" />
                        <Label htmlFor="bitcoin" className="flex items-center">
                          <div className="w-8 h-8 mr-2 rounded-full bg-[#F7931A] flex items-center justify-center text-white font-bold">
                            ₿
                          </div>
                          Bitcoin
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value="ethereum" id="ethereum" />
                        <Label htmlFor="ethereum" className="flex items-center">
                          <div className="w-8 h-8 mr-2 rounded-full bg-[#627EEA] flex items-center justify-center text-white">
                            Ξ
                          </div>
                          Ethereum
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="usdt" id="usdt" />
                        <Label htmlFor="usdt" className="flex items-center">
                          <div className="w-8 h-8 mr-2 rounded-full bg-[#26A17B] flex items-center justify-center text-white font-bold">
                            ₮
                          </div>
                          USDT
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="border border-blue-800 rounded-lg p-4 bg-blue-950/50">
                      <p className="text-sm text-blue-300 mb-2">Adresse de paiement:</p>
                      <p className="font-mono text-sm bg-blue-900/50 p-2 rounded">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </p>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-[#F7931A] hover:bg-[#E57300]"
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? "Traitement en cours..."
                        : `Confirmer le paiement (${getTotalPrice().toFixed(2)} €)`}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="mobile">
                  <div className="grid grid-cols-2 gap-4 py-6">
                    <Button
                      onClick={handleSubmit}
                      className="flex flex-col items-center justify-center h-24 bg-black hover:bg-gray-900 border border-gray-700"
                      disabled={isProcessing}
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
                      disabled={isProcessing}
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
                  <p className="text-center text-blue-300 text-sm mt-4">
                    Vous serez redirigé vers votre application de paiement mobile.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-950/30 border border-blue-900 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-blue-300">{item.category}</p>
                    </div>
                    <p className="font-bold">{item.price.toFixed(2)} €</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-blue-800 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>{getTotalPrice().toFixed(2)} €</p>
                </div>
              </div>

              <div className="bg-blue-900/30 p-4 rounded-lg text-sm text-blue-200 space-y-2">
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
