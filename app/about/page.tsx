import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">À propos de T3CH-FRANCE</h1>

          <div className="space-y-6 mb-12">
            <p className="text-green-200">
              T3CH-FRANCE est une plateforme spécialisée dans la fourniture de guides et d'astuces pour aider les
              utilisateurs à économiser sur leurs services numériques préférés. Notre mission est de rendre accessibles
              à tous des méthodes légitimes pour réduire les coûts des abonnements et services en ligne.
            </p>

            <p className="text-green-200">
              Fondée en 2023 par une équipe de passionnés de technologie, notre entreprise s'est rapidement développée
              pour devenir une référence dans le domaine des économies numériques. Nous sommes fiers de proposer des
              guides de qualité, constamment mis à jour et testés par notre équipe d'experts.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Notre mission</h2>
            <p className="text-green-200">
              Notre mission est simple : vous aider à économiser de l'argent sur vos services numériques préférés tout
              en respectant les conditions d'utilisation des plateformes. Nous croyons que tout le monde devrait pouvoir
              accéder à ces services sans se ruiner.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Nos valeurs</h2>
            <ul className="list-disc pl-6 space-y-2 text-green-200">
              <li>
                <span className="font-medium text-white">Légitimité</span> : Toutes nos méthodes respectent les
                conditions d'utilisation des services concernés.
              </li>
              <li>
                <span className="font-medium text-white">Transparence</span> : Nous sommes clairs sur ce que nos guides
                contiennent et ce qu'ils peuvent vous apporter.
              </li>
              <li>
                <span className="font-medium text-white">Qualité</span> : Nos guides sont détaillés, faciles à suivre et
                régulièrement mis à jour.
              </li>
              <li>
                <span className="font-medium text-white">Satisfaction client</span> : Nous offrons une garantie de
                remboursement si nos méthodes ne fonctionnent pas comme décrit.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">Notre équipe</h2>
            <p className="text-green-200">
              Notre équipe est composée d'experts en technologie, de chercheurs de bons plans et de spécialistes du
              service client. Ensemble, nous travaillons pour vous offrir les meilleures astuces et le meilleur support
              possible.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">Mentions légales</h2>
            <p className="text-green-200">
              T3CH-FRANCE n'est affilié à aucune des marques mentionnées sur notre site. Tous les noms de marques et
              logos sont la propriété de leurs détenteurs respectifs. Nos guides proposent des méthodes légitimes
              utilisant des offres promotionnelles officielles, des programmes de fidélité et des astuces d'achat.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
