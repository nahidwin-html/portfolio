import Link from "next/link"
import { ArrowLeft, ExternalLink, Users, MessageCircle, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DiscordInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Rejoignez notre serveur Discord</h1>
            <p className="text-gray-300 text-lg">Accédez au support, aux mises à jour et à la communauté T3CH-FRANCE</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
              <img
                src="https://sjc.microlink.io/3jg5adF6fczRRswoU3O_FeIVy-Gc2caymSVk3eTAHEJrbh_qJZ_2s-xpuR3-2ZX6F_g6e8-9tpP7-r7TjL-Idg.jpeg"
                alt="Discord Server"
                className="w-full rounded-lg mb-6"
              />

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">T3CH-FRANCE Discord</h2>
                <p className="text-gray-300 mb-6">
                  Rejoignez notre communauté pour recevoir vos guides, obtenir du support et discuter avec d'autres
                  membres.
                </p>

                <a
                  href="https://discord.gg/FmtYNJJg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 text-lg">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Rejoindre le serveur
                  </Button>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-500" />
                  Avantages du serveur Discord
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-600/20 p-2 rounded-lg mr-3">
                      <Zap className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Livraison instantanée</h4>
                      <p className="text-gray-300 text-sm">Recevez vos guides directement en message privé</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-600/20 p-2 rounded-lg mr-3">
                      <MessageCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Support 24/7</h4>
                      <p className="text-gray-300 text-sm">Aide rapide de notre équipe technique</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                      <Shield className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mises à jour gratuites</h4>
                      <p className="text-gray-300 text-sm">Nouvelles versions des guides automatiquement</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-600/20 p-2 rounded-lg mr-3">
                      <Users className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Communauté active</h4>
                      <p className="text-gray-300 text-sm">Échangez avec d'autres utilisateurs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">🤖 Bot automatique</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Envoi automatique des guides après paiement
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Vérification des transactions blockchain
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Notifications de nouvelles offres
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Support technique intégré
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Comment ça marche ?</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-medium mb-2">Rejoignez Discord</h4>
                <p className="text-sm text-gray-300">Cliquez sur le lien d'invitation</p>
              </div>

              <div className="text-center">
                <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-medium mb-2">Effectuez votre achat</h4>
                <p className="text-sm text-gray-300">Payez avec crypto sur notre site</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-medium mb-2">Recevez vos guides</h4>
                <p className="text-sm text-gray-300">Le bot vous envoie tout automatiquement</p>
              </div>

              <div className="text-center">
                <div className="bg-red-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h4 className="font-medium mb-2">Profitez du support</h4>
                <p className="text-sm text-gray-300">Aide disponible 24/7</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="https://discord.gg/FmtYNJJg" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-12 py-4 text-xl">
                <ExternalLink className="mr-3 h-6 w-6" />
                Rejoindre maintenant
              </Button>
            </a>
            <p className="text-gray-400 text-sm mt-2">Gratuit • Aucune inscription requise</p>
          </div>
        </div>
      </div>
    </div>
  )
}
