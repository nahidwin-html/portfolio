"use client"

import Link from "next/link"
import { ShoppingCart, Flame } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GuideCard from "@/components/guide-card"
import { useCart } from "@/contexts/cart-context"

export default function Home() {
  const { getItemCount, addItem } = useCart()
  const [isFullPackLoading, setIsFullPackLoading] = useState(false)
  const router = useRouter()

  const handleAddFullPack = () => {
    setIsFullPackLoading(true)

    setTimeout(() => {
      addItem({
        id: "full-pack",
        title: "Full Pack Tech",
        price: 7.5,
        image: "/images/discord-nitro.png", // Image représentative
        category: "Pack Complet",
      })

      setIsFullPackLoading(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-red-950 to-green-950 text-white">
      <header className="sticky top-0 z-10 border-b border-blue-800/50 bg-gradient-to-br from-gray-950 via-blue-950/30 to-green-950">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-blue-500">T3CH</span>
              <span className="text-red-500">-FRANCE</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/guides" className="text-sm font-medium hover:text-blue-500">
                Discord Nitro
              </Link>
              <Link href="/guides" className="text-sm font-medium hover:text-red-500">
                Snapchat+
              </Link>
              <Link href="/guides" className="text-sm font-medium hover:text-green-500">
                Robux
              </Link>
              <Link href="/guides" className="text-sm font-medium hover:text-red-500">
                Uber Eats
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative border-red-700 text-red-500">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>
            <Button className="hidden md:inline-flex tri-gradient">Se connecter</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-950 via-blue-950 to-green-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge
                  className="mb-2 bg-gradient-to-r from-blue-900/50 via-red-900/50 to-green-900/50 text-blue-100 hover:bg-blue-800"
                  variant="outline"
                >
                  Discord Nitro à 3€ | Snapchat+ à 0,50€ | Uber Eats à 2€ | Robux à 5€
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Guides pour obtenir vos services numériques à prix réduit
                </h1>
                <p className="max-w-[600px] text-red-200 md:text-xl">
                  Voici toutes les tech pour le moment sa changera avec le temp Avec notre boutique 100% safe tester par
                  des professionels
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 via-red-600 to-green-600 hover:from-blue-700 hover:via-red-700 hover:to-green-700"
                    onClick={() => router.push("/guides")}
                  >
                    Voir les guides
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-700 text-red-400 hover:bg-red-900/30"
                    onClick={() => router.push("/how-it-works")}
                  >
                    Comment ça marche
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg">
                  <div className="absolute -top-4 -right-4 z-10">
                    <Badge className="hot-badge sale-pulse px-3 py-1 text-sm font-bold">
                      <Flame className="mr-1 h-4 w-4" /> OFFRE LIMITÉE
                    </Badge>
                  </div>
                  <img
                    src="/images/tech-hero.png"
                    alt="Économies sur services numériques"
                    className="object-cover w-full"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-950 via-blue-950 to-green-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Guides Populaires</h2>
                <p className="max-w-[900px] text-red-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nos guides les plus vendus pour économiser sur vos services préférés
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
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
            </div>
            <div className="mt-12 p-6 border border-red-800/50 rounded-lg tri-gradient-bg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4">
                  <div className="bg-gradient-to-br from-red-600 to-red-900 p-4 rounded-lg flex items-center justify-center h-full">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">FULL PACK</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <img src="/images/discord-nitro.png" alt="Discord Nitro" className="w-full rounded" />
                        <img src="/images/snapchat-plus.png" alt="Snapchat+" className="w-full rounded" />
                        <img src="/images/robux.png" alt="Robux" className="w-full rounded" />
                        <img src="/images/uber-eats.png" alt="Uber Eats" className="w-full rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/4 space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge className="hot-badge" variant="outline">
                      <Flame className="mr-1 h-4 w-4" /> Pack Complet
                    </Badge>
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        stroke="#FFD700"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span>5.0</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Full Pack Tech à 7,50€</h3>
                  <p className="text-red-200">
                    Obtenez TOUS nos guides techniques dans un seul pack à prix réduit! Inclut Discord Nitro, Snapchat+,
                    Robux, Uber Eats et bien plus encore. Économisez plus de 70% sur le prix des guides individuels.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="text-3xl font-bold text-red-400">7.50 €</p>
                      <p className="text-lg line-through text-gray-400 ml-2">15.00 €</p>
                      <Badge className="ml-2 bg-red-600 text-white">-50%</Badge>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddFullPack}
                    className="w-full md:w-auto tri-gradient"
                    disabled={isFullPackLoading}
                  >
                    {isFullPackLoading ? (
                      "Ajout en cours..."
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ajouter au panier
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Button size="lg" className="tri-gradient" onClick={() => router.push("/guides")}>
                Voir tous les guides
              </Button>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-950 via-blue-950 to-green-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pourquoi choisir nos guides
                </h2>
                <div className="space-y-6">
                  <div className="border border-blue-800/50 rounded-lg p-6 tri-gradient-bg">
                    <h3 className="font-medium text-xl mb-2">Économies garanties</h3>
                    <p className="text-blue-100">
                      Nos guides vous permettent d'économiser jusqu'à 90% sur vos services numériques préférés. Toutes
                      nos méthodes sont testées et mises à jour régulièrement.
                    </p>
                  </div>
                  <div className="border border-red-800/50 rounded-lg p-6 tri-gradient-bg">
                    <h3 className="font-medium text-xl mb-2">Livraison instantanée</h3>
                    <p className="text-red-100">
                      Recevez vos guides immédiatement après paiement. Pas d'attente, pas de délai - commencez à
                      économiser dès aujourd'hui.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg">
                  <img
                    src="/images/tech-benefits.png"
                    alt="Avantages des guides techniques"
                    className="object-cover w-full"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 bg-gradient-to-r from-gray-950 via-blue-600 to-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Prêt à économiser sur vos services préférés?
              </h2>
              <p className="max-w-[600px] md:text-xl">
                Rejoignez des milliers d'utilisateurs qui économisent déjà grâce à nos guides
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="mt-4 bg-gradient-to-r from-red-800 via-green-800 to-blue-800 hover:from-red-900 hover:via-green-900 hover:to-blue-900 text-white"
                onClick={() => router.push("/guides")}
              >
                Découvrir les guides
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-blue-800/50 bg-gradient-to-br from-gray-950 via-blue-950 to-green-950">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-blue-500">T3CH</span>
              <span className="text-red-500">-FRANCE</span>
            </Link>
            <p className="text-blue-200 text-sm">© 2025 T3CH-FRANCE. Tous droits réservés.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium hover:text-blue-500">
              À propos
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-red-500">
              Contact
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:text-green-500">
              Conditions
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-red-500">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="container py-6 text-center text-sm text-blue-400">
          <p>
            T3CH-FRANCE n'est affilié à aucune des marques mentionnées. Tous les guides proposent des méthodes légitimes
            utilisant des offres promotionnelles officielles, des programmes de fidélité et des astuces d'achat.
          </p>
        </div>
      </footer>
    </div>
  )
}
