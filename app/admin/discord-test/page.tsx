"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Bot, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function DiscordTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testData, setTestData] = useState({
    discordTag: "",
    customerName: "",
    orderId: `TEST-${Date.now()}`,
    totalAmount: 5.0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTestData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const testDiscordBot = async () => {
    setIsLoading(true)

    try {
      const orderData = {
        orderId: testData.orderId,
        customerName: testData.customerName,
        customerDiscord: testData.discordTag,
        items: [
          {
            id: "test-1",
            title: "Guide Test Discord",
            price: testData.totalAmount,
            category: "Test",
          },
        ],
        totalAmount: testData.totalAmount,
        paymentMethod: "Test (Discord Bot)",
        transactionId: `test_tx_${Date.now()}`,
      }

      const response = await fetch("/api/discord/send-guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Test réussi !",
          description: "Le message de test a été envoyé sur Discord.",
        })
      } else {
        toast({
          title: "Échec du test",
          description: result.error || "Erreur lors de l'envoi du message.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors du test:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du test.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Bot className="h-8 w-8 mr-3 text-blue-500" />
            <h1 className="text-3xl font-bold">Test du Bot Discord</h1>
          </div>

          <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <TestTube className="h-5 w-5 mr-2" />
              Configuration du test
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discordTag">Identifiant Discord</Label>
                <Input
                  id="discordTag"
                  name="discordTag"
                  value={testData.discordTag}
                  onChange={handleInputChange}
                  placeholder="username#1234 ou username"
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400">
                  Entrez votre identifiant Discord pour recevoir le message de test
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Nom du client</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={testData.customerName}
                  onChange={handleInputChange}
                  placeholder="Nom de test"
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">ID de commande</Label>
                  <Input
                    id="orderId"
                    name="orderId"
                    value={testData.orderId}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Montant (€)</Label>
                  <Input
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    step="0.01"
                    value={testData.totalAmount}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={testDiscordBot}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-gray-800 hover:from-blue-700 hover:to-gray-900"
              disabled={isLoading || !testData.discordTag || !testData.customerName}
            >
              {isLoading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer le message de test
                </>
              )}
            </Button>
          </div>

          <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Instructions de configuration</h2>

            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-medium text-white mb-2">1. Créer un bot Discord</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>
                    Allez sur{" "}
                    <a
                      href="https://discord.com/developers/applications"
                      target="_blank"
                      className="text-blue-400 hover:underline"
                      rel="noreferrer"
                    >
                      Discord Developer Portal
                    </a>
                  </li>
                  <li>Créez une nouvelle application</li>
                  <li>Allez dans l'onglet "Bot" et créez un bot</li>
                  <li>Copiez le token du bot</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">2. Configurer les permissions</h3>
                <p className="text-sm">Le bot a besoin des permissions suivantes :</p>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li>Send Messages</li>
                  <li>Send Messages in Threads</li>
                  <li>Attach Files</li>
                  <li>Read Message History</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">3. Variables d'environnement</h3>
                <div className="bg-black/50 p-3 rounded font-mono text-xs">
                  DISCORD_BOT_TOKEN=your_bot_token_here
                  <br />
                  DISCORD_GUILD_ID=your_server_id_here (optionnel)
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">4. Inviter le bot</h3>
                <p className="text-sm">
                  Générez un lien d'invitation avec les bonnes permissions et ajoutez le bot à votre serveur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
