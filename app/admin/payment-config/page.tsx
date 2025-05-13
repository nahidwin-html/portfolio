"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, CreditCard, Key, ShieldCheck, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function PaymentConfigPage() {
  const [paymentProvider, setPaymentProvider] = useState("stripe")
  const [isLive, setIsLive] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [stripeConfig, setStripeConfig] = useState({
    publicKey: "",
    secretKey: "",
    webhookSecret: "",
  })
  const [paypalConfig, setPaypalConfig] = useState({
    clientId: "",
    clientSecret: "",
    webhookId: "",
  })

  const handleStripeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStripeConfig((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePaypalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaypalConfig((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simuler l'enregistrement des clés API
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Configuration enregistrée",
        description: "Les clés API de paiement ont été enregistrées avec succès.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-red-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Configuration des paiements</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-200">Mode:</span>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  !isLive
                    ? "bg-blue-900/50 text-blue-200 border-blue-700"
                    : "bg-transparent text-blue-400 border-blue-800/50"
                }`}
                onClick={() => setIsLive(false)}
              >
                Test
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`${
                  isLive ? "bg-red-900/50 text-red-200 border-red-700" : "bg-transparent text-red-400 border-red-800/50"
                }`}
                onClick={() => setIsLive(true)}
              >
                Production
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6 mb-8">
            <div className="flex items-start mb-6">
              <div className="bg-yellow-600/20 text-yellow-400 p-3 rounded-lg mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Important - Sécurité des clés API</h3>
                <p className="text-green-200">
                  Les clés API de paiement sont sensibles et ne doivent jamais être exposées côté client. Assurez-vous
                  que vos clés secrètes sont stockées en toute sécurité dans des variables d'environnement sur votre
                  serveur.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label className="text-lg mb-3 block">Choisissez votre fournisseur de paiement</Label>
                <RadioGroup
                  value={paymentProvider}
                  onValueChange={setPaymentProvider}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label
                      htmlFor="stripe"
                      className="flex items-center cursor-pointer bg-gradient-to-r from-blue-900/30 to-green-900/30 p-3 rounded-lg border border-blue-800/50 w-full"
                    >
                      <div className="bg-white/10 p-2 rounded mr-3">
                        <CreditCard className="h-5 w-5 text-blue-400" />
                      </div>
                      <span>Stripe</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label
                      htmlFor="paypal"
                      className="flex items-center cursor-pointer bg-gradient-to-r from-blue-900/30 to-green-900/30 p-3 rounded-lg border border-blue-800/50 w-full"
                    >
                      <div className="bg-white/10 p-2 rounded mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-400"
                        >
                          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                          <path d="M8.93 13.4A1.44 1.44 0 0 1 10.53 14h.94a1.44 1.44 0 0 0 1.6-1.4v-.86A1.44 1.44 0 0 0 11.47 10h-.94a1.44 1.44 0 0 1-1.6-1.4v-.86A1.44 1.44 0 0 1 10.53 6h.94a1.44 1.44 0 0 1 1.6 1.4V9" />
                          <path d="M12 12v6" />
                          <path d="M16 7h6" />
                          <path d="M19 4v6" />
                        </svg>
                      </div>
                      <span>PayPal</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Tabs value={paymentProvider} className="mt-8">
                <TabsContent value="stripe" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="stripePublicKey" className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-blue-400" />
                        Clé publique {isLive ? "(Production)" : "(Test)"}
                      </Label>
                    </div>
                    <Input
                      id="stripePublicKey"
                      name="publicKey"
                      value={stripeConfig.publicKey}
                      onChange={handleStripeChange}
                      placeholder="pk_test_..."
                      className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                    />
                    <p className="text-xs text-green-200">
                      La clé publique est utilisée pour initialiser Stripe.js côté client.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="stripeSecretKey" className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2 text-red-400" />
                        Clé secrète {isLive ? "(Production)" : "(Test)"}
                      </Label>
                    </div>
                    <Input
                      id="stripeSecretKey"
                      name="secretKey"
                      value={stripeConfig.secretKey}
                      onChange={handleStripeChange}
                      placeholder="sk_test_..."
                      type="password"
                      className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                    />
                    <p className="text-xs text-red-200">
                      La clé secrète ne doit JAMAIS être exposée côté client. Utilisez-la uniquement dans vos API routes
                      côté serveur.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="stripeWebhookSecret" className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-green-400" />
                        Secret Webhook {isLive ? "(Production)" : "(Test)"}
                      </Label>
                    </div>
                    <Input
                      id="stripeWebhookSecret"
                      name="webhookSecret"
                      value={stripeConfig.webhookSecret}
                      onChange={handleStripeChange}
                      placeholder="whsec_..."
                      type="password"
                      className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                    />
                    <p className="text-xs text-green-200">
                      Le secret webhook est utilisé pour vérifier les événements envoyés par Stripe.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="paypal" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="paypalClientId" className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-blue-400" />
                        Client ID {isLive ? "(Production)" : "(Sandbox)"}
                      </Label>
                    </div>
                    <Input
                      id="paypalClientId"
                      name="clientId"
                      value={paypalConfig.clientId}
                      onChange={handlePaypalChange}
                      placeholder="AYxk2Ug..."
                      className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                    />
                    <p className="text-xs text-green-200">
                      L'ID client est utilisé pour initialiser PayPal côté client.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="paypalClientSecret" className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2 text-red-400" />
                        Client Secret {isLive ? "(Production)" : "(Sandbox)"}
                      </Label>
                    </div>
                    <Input
                      id="paypalClientSecret"
                      name="clientSecret"
                      value={paypalConfig.clientSecret}
                      onChange={handlePaypalChange}
                      placeholder="ELxk2Ug..."
                      type="password"
                      className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                    />
                    <p className="text-xs text-red-200">
                      Le secret client ne doit JAMAIS être exposé côté client. Utilisez-le uniquement dans vos API
                      routes côté serveur.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="paypalWebhookId" className="flex items-center">
                        <Key className="h-4 w-4 mr-2 text-green-400" />
                        Webhook ID {isLive ? "(Production)" : "(Sandbox)"}
                      </Label>
                    </div>
                    <Input
                      id="paypalWebhookId"
                      name="webhookId"
                      value={paypalConfig.webhookId}
                      onChange={handlePaypalChange}
                      placeholder="WH-2WR32..."
                      className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                    />
                    <p className="text-xs text-green-200">
                      L'ID webhook est utilisé pour vérifier les événements envoyés par PayPal.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 pt-6 border-t border-blue-800/50">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 via-red-600 to-green-600 hover:from-blue-700 hover:via-red-700 hover:to-green-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    "Enregistrement en cours..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer la configuration
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Étapes suivantes</h2>
            <ol className="space-y-4 list-decimal list-inside text-green-200">
              <li>
                Créez un compte chez le fournisseur de paiement choisi (
                <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
                  Stripe
                </a>{" "}
                ou{" "}
                <a
                  href="https://developer.paypal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  PayPal
                </a>
                ).
              </li>
              <li>Obtenez vos clés API depuis le tableau de bord du fournisseur.</li>
              <li>Configurez les webhooks pour recevoir les notifications de paiement.</li>
              <li>
                Implémentez les API routes côté serveur pour traiter les paiements (voir la documentation{" "}
                <a
                  href="https://stripe.com/docs/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  Stripe
                </a>{" "}
                ou{" "}
                <a
                  href="https://developer.paypal.com/docs/api/overview/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  PayPal
                </a>
                ).
              </li>
              <li>Testez le processus de paiement en mode test avant de passer en production.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
