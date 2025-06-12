import Link from "next/link"
import { CheckCircle, Download, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string; transactionId?: string }
}) {
  const { orderId, transactionId } = searchParams

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

          {orderId && (
            <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold mb-4">Détails de votre commande</h2>
              <div className="space-y-2 text-left">
                <p>
                  <strong>Numéro de commande:</strong> {orderId}
                </p>
                {transactionId && (
                  <p>
                    <strong>ID de transaction:</strong> {transactionId}
                  </p>
                )}
                <p>
                  <strong>Statut:</strong> <span className="text-green-500">Confirmé</span>
                </p>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30 border border-gray-800 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Prochaines étapes</h2>
            <ol className="text-left space-y-4 text-gray-300 list-decimal list-inside">
              <li>Vérifiez votre boîte de réception (et dossier spam) pour trouver votre guide</li>
              <li>Suivez les instructions détaillées dans le guide</li>
              <li>En cas de problème, contactez notre support à support@t3ch-france.com</li>
            </ol>

            <div className="mt-6 pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900">
                <Download className="mr-2 h-4 w-4" />
                Télécharger les guides
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 p-4 rounded-lg text-sm text-gray-400">
            <p className="flex items-center justify-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Paiement traité de manière sécurisée par PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
