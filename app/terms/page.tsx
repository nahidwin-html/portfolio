import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>

          <div className="space-y-6 mb-12">
            <p className="text-green-200">
              Bienvenue sur T3CH-FRANCE. Les présentes conditions générales de vente régissent l'utilisation de notre
              site et l'achat de nos guides. Veuillez les lire attentivement avant d'effectuer un achat.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptation des conditions</h2>
            <p className="text-green-200">
              En accédant à notre site et en achetant nos guides, vous acceptez d'être lié par ces conditions générales
              de vente. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Produits et services</h2>
            <p className="text-green-200">
              T3CH-FRANCE propose des guides numériques contenant des astuces et des méthodes pour économiser sur divers
              services en ligne. Nos guides sont fournis sous forme de fichiers PDF téléchargeables.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Prix et paiement</h2>
            <p className="text-green-200">
              Les prix de nos guides sont indiqués en euros et incluent toutes les taxes applicables. Le paiement
              s'effectue en ligne via les méthodes de paiement proposées sur notre site. Votre commande sera traitée
              après confirmation du paiement.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Livraison</h2>
            <p className="text-green-200">
              Après confirmation de votre paiement, vous recevrez un email contenant un lien de téléchargement pour
              accéder à votre guide. Ce lien sera également disponible dans votre espace client sur notre site.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Droit de rétractation et remboursement</h2>
            <p className="text-green-200">
              Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la date
              d'achat pour exercer votre droit de rétractation. Toutefois, en raison de la nature numérique de nos
              produits, ce droit ne peut être exercé une fois que vous avez téléchargé le guide.
            </p>
            <p className="text-green-200">
              Nous offrons une garantie de satisfaction de 30 jours. Si nos méthodes ne fonctionnent pas comme décrit,
              vous pouvez demander un remboursement intégral en contactant notre service client.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Propriété intellectuelle</h2>
            <p className="text-green-200">
              Tous nos guides sont protégés par des droits d'auteur. L'achat d'un guide vous donne le droit de
              l'utiliser à titre personnel, mais ne vous autorise pas à le reproduire, le revendre ou le distribuer à
              des tiers.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Limitation de responsabilité</h2>
            <p className="text-green-200">
              T3CH-FRANCE ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de
              nos guides. Nos méthodes sont fournies à titre informatif et leur efficacité peut varier en fonction des
              circonstances.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Modification des conditions</h2>
            <p className="text-green-200">
              Nous nous réservons le droit de modifier ces conditions générales de vente à tout moment. Les
              modifications prendront effet dès leur publication sur notre site.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">9. Loi applicable et juridiction compétente</h2>
            <p className="text-green-200">
              Les présentes conditions sont régies par le droit français. En cas de litige, les tribunaux français
              seront seuls compétents.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">10. Contact</h2>
            <p className="text-green-200">
              Pour toute question concernant ces conditions générales de vente, veuillez nous contacter à l'adresse
              suivante : support@t3ch-france.com
            </p>

            <p className="text-green-200 mt-8">Dernière mise à jour : 12 mai 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
