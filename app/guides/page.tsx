"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import GuideCard from "@/components/guide-card"

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-red-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold mb-4">Tous nos guides</h1>
        <p className="text-red-200 mb-8 max-w-3xl">
          Découvrez notre collection complète de guides pour obtenir vos services numériques préférés à prix réduit.
          Toutes nos méthodes sont testées et approuvées par notre communauté.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          <GuideCard
            id="1"
            title="Discord Nitro à -50%"
            price={3}
            image="/images/discord-nitro.png"
            category="Discord"
            rating={4.8}
            description="Guide complet pour obtenir Discord Nitro à moitié prix grâce aux offres promotionnelles et programmes partenaires."
          />
          <GuideCard
            id="2"
            title="Snapchat+ Économies"
            price={0.5}
            image="/images/snapchat-plus.png"
            category="Snapchat"
            rating={4.6}
            description="Méthodes légitimes pour réduire le coût de votre abonnement Snapchat+ et maximiser les avantages."
          />
          <GuideCard
            id="3"
            title="Robux à prix réduit"
            price={5}
            image="/images/robux.png"
            category="Robux"
            rating={4.9}
            description="Guide pour obtenir des Robux moins chers via des cartes cadeaux en promotion et programmes de fidélité."
          />
          <GuideCard
            id="5"
            title="Uber Eats à 2€"
            price={2}
            image="/images/uber-eats.png"
            category="Uber Eats"
            rating={4.9}
            description="Technique exclusive pour obtenir des repas Uber Eats à seulement 2€ grâce aux codes promo et offres spéciales."
          />
          <GuideCard
            id="6"
            title="Full Pack Tech"
            price={7.5}
            image="/images/discord-nitro.png"
            category="Pack Complet"
            rating={5.0}
            description="Obtenez TOUS nos guides techniques dans un seul pack à prix réduit! Inclut Discord Nitro, Snapchat+, Robux, Uber Eats et bien plus encore."
          />
        </div>
      </div>
    </div>
  )
}
