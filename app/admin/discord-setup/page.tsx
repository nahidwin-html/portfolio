"use client"

import Link from "next/link"
import { ArrowLeft, Bot, ExternalLink, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DiscordSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      title: "Accéder à la section Bot",
      description: "Dans le Discord Developer Portal, cliquez sur 'Bot' dans le menu de gauche",
      status: "pending",
    },
    {
      title: "Créer/Configurer le bot",
      description: "Créez un bot si nécessaire et configurez ses permissions",
      status: "pending",
    },
    {
      title: "Copier le token",
      description: "Copiez le token du bot (ne le partagez jamais !)",
      status: "pending",
    },
    {
      title: "Configurer les variables d'environnement",
      description: "Ajoutez le token dans votre fichier .env.local",
      status: "pending",
    },
    {
      title: "Inviter le bot sur votre serveur",
      description: "Générez un lien d'invitation et ajoutez le bot",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/admin/discord-test" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au test Discord
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Bot className="h-8 w-8 mr-3 text-blue-500" />
            <h1 className="text-3xl font-bold">Configuration du Bot Discord</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">📋 Informations de votre application</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                    <span className="text-gray-300">Application ID:</span>
                    <code className="text-green-400">1382746268276677309</code>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                    <span className="text-gray-300">Public Key:</span>
                    <code className="text-green-400 text-xs">d87bef...891a1e55f66</code>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/50 rounded">
                    <span className="text-gray-300">Nom de l'app:</span>
                    <code className="text-blue-400">travailsaleoclave</code>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">⚠️ Important</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-400">Token du bot</p>
                      <p className="text-gray-300 text-sm">
                        Le token se trouve dans la section "Bot", pas dans "General Information"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-400">Sécurité</p>
                      <p className="text-gray-300 text-sm">Ne partagez JAMAIS votre token publiquement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">🚀 Étapes de configuration</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          index + 1 <= currentStep ? "bg-green-600 text-white" : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {index + 1 <= currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{step.title}</h3>
                        <p className="text-gray-300 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-gray-800"
                  disabled={currentStep >= steps.length}
                >
                  {currentStep >= steps.length ? "Configuration terminée !" : "Étape suivante"}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">📖 Instructions détaillées</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-3">1. Obtenir le token du bot</h3>
                <ol className="space-y-2 text-gray-300 list-decimal list-inside text-sm">
                  <li>Dans le Discord Developer Portal, cliquez sur "Bot" (menu de gauche)</li>
                  <li>Si pas de bot : cliquez "Add Bot"</li>
                  <li>Dans la section "Token", cliquez "Copy" ou "Reset Token"</li>
                  <li>Copiez le token et gardez-le secret !</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">2. Configurer les permissions</h3>
                <ul className="space-y-2 text-gray-300 list-disc list-inside text-sm">
                  <li>Send Messages</li>
                  <li>Send Messages in Threads</li>
                  <li>Attach Files</li>
                  <li>Read Message History</li>
                  <li>Use Slash Commands (optionnel)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">3. Variables d'environnement</h3>
                <div className="bg-black/50 p-3 rounded font-mono text-xs">
                  <div>DISCORD_BOT_TOKEN=votre_token_ici</div>
                  <div>DISCORD_GUILD_ID=id_de_votre_serveur</div>
                  <div>DISCORD_APPLICATION_ID=1382746268276677309</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">4. Inviter le bot</h3>
                <ol className="space-y-2 text-gray-300 list-decimal list-inside text-sm">
                  <li>Allez dans "OAuth2" → "URL Generator"</li>
                  <li>Sélectionnez "bot" dans les scopes</li>
                  <li>Sélectionnez les permissions nécessaires</li>
                  <li>Copiez l'URL et ouvrez-la</li>
                  <li>Ajoutez le bot à votre serveur</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="https://discord.com/developers/applications/1382746268276677309/bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ouvrir la section Bot
                </Button>
              </a>
              <Link href="/admin/discord-test">
                <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
                  Tester le bot après configuration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
