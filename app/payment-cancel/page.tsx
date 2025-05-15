import Link from "next/link"
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-red-600 to-red-800 p-4">
              <XCircle className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Paiement annulé</h1>
          <p className="text-xl text-red-200">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>

          <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Besoin d'aide ?</h2>
            <p className="text-green-200 mb-6">
              Si vous avez rencontré des difficultés lors du paiement ou si vous avez des questions, n'hésitez pas à
              contacter notre équipe de support.
            </p>

            <div className="mt-6 pt-6 border-t border-blue-800/50 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Retour aux guides
                </Button>
              </Link>
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
