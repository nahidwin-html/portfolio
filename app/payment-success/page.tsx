import Link from "next/link"
import { CheckCircle, Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-green-600 to-blue-600 p-4">
              <CheckCircle className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Paiement réussi !</h1>
          <p className="text-xl text-green-200">
            Merci pour votre achat. Vous recevrez votre guide par email dans les prochaines minutes.
          </p>

          <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Prochaines étapes</h2>
            <ol className="text-left space-y-4 text-green-200 list-decimal list-inside">
              <li>Vérifiez votre boîte de réception (et dossier spam) pour trouver votre guide</li>
              <li>Suivez les instructions détaillées dans le guide</li>
              <li>En cas de problème, contactez notre support à support@t3ch-france.com</li>
            </ol>

            <div className="mt-6 pt-6 border-t border-blue-800/50 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Download className="mr-2 h-4 w-4" />
                Télécharger le guide
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-blue-700 text-blue-400 hover:bg-blue-900/30">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
