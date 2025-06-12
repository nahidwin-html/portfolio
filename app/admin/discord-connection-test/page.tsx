"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bot, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function DiscordConnectionTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/discord/test-connection", {
        method: "POST",
      })

      const result = await response.json()
      setTestResult(result)

      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: "Le bot Discord s'est connecté avec succès.",
        })
      } else {
        toast({
          title: "Échec de la connexion",
          description: result.message || "Erreur lors de la connexion du bot Discord.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors du test:", error)
      setTestResult({
        success: false,
        message: "Erreur lors de la requête de test",
      })

      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du test de connexion.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/admin/discord-test" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au test Discord
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Bot className="h-8 w-8 mr-3 text-blue-500" />
            <h1 className="text-3xl font-bold">Test de connexion du Bot Discord</h1>
          </div>

          <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Vérification du token</h2>
            <p className="text-gray-300 mb-6">
              Ce test vérifie si votre bot peut se connecter à Discord avec le token configuré dans vos variables
              d'environnement.
            </p>

            <Button
              onClick={testConnection}
              className="w-full bg-gradient-to-r from-blue-600 to-gray-800 hover:from-blue-700 hover:to-gray-900"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Test en cours...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Tester la connexion
                </>
              )}
            </Button>

            {testResult && (
              <div
                className={`mt-6 p-4 rounded-lg ${testResult.success ? "bg-green-900/20 border border-green-800/50" : "bg-red-900/20 border border-red-800/50"}`}
              >
                <div className="flex items-start">
                  {testResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-medium ${testResult.success ? "text-green-400" : "text-red-400"}`}>
                      {testResult.success ? "Connexion réussie" : "Échec de la connexion"}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">{testResult.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Résolution des problèmes</h2>
            <div className="space-y-4">
              <div className="p-3 bg-black/50 rounded">
                <h3 className="font-medium text-red-400">Token invalide</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Si le token est invalide, retournez au Discord Developer Portal et cliquez sur "Reset Token" pour en
                  générer un nouveau.
                </p>
              </div>

              <div className="p-3 bg-black/50 rounded">
                <h3 className="font-medium text-yellow-400">Intents manquants</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Vérifiez que vous avez activé les "Privileged Gateway Intents" nécessaires dans les paramètres du bot.
                </p>
              </div>

              <div className="p-3 bg-black/50 rounded">
                <h3 className="font-medium text-blue-400">Variables d'environnement</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Assurez-vous que le token est correctement configuré dans votre fichier .env.local et que le serveur a
                  été redémarré.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
