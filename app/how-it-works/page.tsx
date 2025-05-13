import Link from "next/link"
import { ArrowLeft, BookOpen, Download, CreditCard, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Comment ça fonctionne</h1>

          <div className="flex justify-center mb-10">
            <img
              src="/images/tech-services.png"
              alt="Processus d'achat"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>

          <div className="space-y-12 mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-3xl font-bold">
                  1
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
                  Choisissez votre guide
                </h2>
                <p className="text-green-200">
                  Parcourez notre catalogue et sélectionnez le guide qui vous intéresse. Nous proposons des guides pour
                  Discord Nitro, Snapchat+, Robux, Uber Eats et bien d'autres services. Vous pouvez également opter pour
                  notre Full Pack Tech qui inclut tous nos guides à un prix réduit.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-3xl font-bold">
                  2
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-400" />
                  Effectuez votre paiement
                </h2>
                <p className="text-green-200">
                  Procédez au paiement en utilisant l'une de nos méthodes sécurisées : carte bancaire, PayPal,
                  crypto-monnaies ou paiement mobile. Toutes nos transactions sont protégées par un cryptage SSL pour
                  garantir la sécurité de vos informations.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-3xl font-bold">
                  3
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-blue-400" />
                  Recevez votre guide instantanément
                </h2>
                <p className="text-green-200">
                  Immédiatement après votre paiement, vous recevrez un email contenant votre guide au format PDF. Vous
                  pourrez également accéder à votre guide directement depuis votre compte sur notre site.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-3xl font-bold">
                  4
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <Download className="mr-2 h-5 w-5 text-blue-400" />
                  Suivez les instructions et économisez
                </h2>
                <p className="text-green-200">
                  Suivez les instructions détaillées dans votre guide pour profiter de prix réduits sur vos services
                  préférés. Nos guides sont régulièrement mis à jour pour garantir que les méthodes fonctionnent
                  toujours. Si vous avez des questions, notre équipe de support est disponible pour vous aider.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Garantie de satisfaction</h2>
            <p className="text-green-200 mb-4">
              Nous sommes tellement confiants dans la qualité de nos guides que nous offrons une garantie de
              remboursement de 30 jours. Si vous n'êtes pas satisfait de votre achat ou si les méthodes ne fonctionnent
              pas comme décrit, nous vous remboursons intégralement.
            </p>
            <p className="text-green-200">
              Notre objectif est de vous aider à économiser sur vos services numériques préférés avec des méthodes
              légitimes et faciles à suivre.
            </p>
          </div>

          <div className="text-center">
            <Link href="/guides">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-red-600 to-green-600 hover:from-blue-700 hover:via-red-700 hover:to-green-700 mt-4"
              >
                Découvrir nos guides
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
