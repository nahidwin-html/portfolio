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
        price: 3.5,
        image: "/images/discord-nitro-new.png",
        category: "Pack Complet",
      })

      setIsFullPackLoading(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gradient-to-br from-black/95 via-gray-950/90 to-gray-900/85 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-red-500">T3CH</span>
              <span className="text-white">-FRANCE</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/guides" className="text-sm font-medium text-gray-300 hover:text-red-500">
                Discord Nitro
              </Link>
              <Link href="/guides" className="text-sm font-medium text-gray-300 hover:text-red-500">
                Snapchat+
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-red-500"
              >
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
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-950 to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge
                  className="mb-2 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-700/40 text-gray-200 border-gray-700 hover:bg-gray-800"
                  variant="outline"
                >
                  Discord Nitro à 2,20€ | Snapchat+ à 0,50€
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Guides pour obtenir vos services numériques à prix réduit
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Voici toutes les tech pour le moment sa changera avec le temp Avec notre boutique 100% safe tester par
                  des professionels
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900"
                    onClick={() => router.push("/guides")}
                  >
                    Voir les guides
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-red-500"
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
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-950 to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Guides Populaires</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nos guides les plus vendus pour économiser sur vos services préférés
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-8">
              <GuideCard
                id="1"
                title="Discord Nitro à -78%"
                price={2.2}
                image="/images/discord-nitro-new.png"
                category="Discord"
                rating={4.8}
                description="Guide complet pour obtenir Discord Nitro à seulement 2,20€ au lieu de 9,99€ grâce aux offres promotionnelles et programmes partenaires."
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
            </div>
            <div className="mt-12 p-6 border border-gray-800 rounded-lg tri-gradient-bg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg flex items-center justify-center h-full border border-gray-700">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-2">FULL PACK</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <img src="/images/discord-nitro-new.png" alt="Discord Nitro" className="w-full rounded" />
                        <img src="/images/snapchat-plus.png" alt="Snapchat+" className="w-full rounded" />
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
                  <h3 className="text-2xl font-bold">Full Pack Tech à 3,50€</h3>
                  <p className="text-gray-300">
                    Obtenez TOUS nos guides techniques dans un seul pack à prix réduit! Inclut Discord Nitro et
                    Snapchat+ avec des bonus exclusifs. Économisez plus de 60% sur le prix des guides individuels.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="text-3xl font-bold text-red-500">3.50 €</p>
                      <p className="text-lg line-through text-gray-500 ml-2">6.00 €</p>
                      <Badge className="ml-2 bg-red-600 text-white">-42%</Badge>
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
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-950 to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pourquoi choisir nos guides
                </h2>
                <div className="space-y-6">
                  <div className="border border-gray-800 rounded-lg p-6 tri-gradient-bg">
                    <h3 className="font-medium text-xl mb-2">Économies garanties</h3>
                    <p className="text-gray-300">
                      Nos guides vous permettent d'économiser jusqu'à 90% sur vos services numériques préférés. Toutes
                      nos méthodes sont testées et mises à jour régulièrement.
                    </p>
                  </div>
                  <div className="border border-gray-800 rounded-lg p-6 tri-gradient-bg">
                    <h3 className="font-medium text-xl mb-2">Livraison instantanée</h3>
                    <p className="text-gray-300">
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
        <section className="py-12 md:py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Prêt à économiser sur vos services préférés?
              </h2>
              <p className="max-w-[600px] md:text-xl text-gray-300">
                Rejoignez des milliers d'utilisateurs qui économisent déjà grâce à nos guides
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="mt-4 bg-gradient-to-r from-black via-gray-900 to-gray-800 hover:from-gray-900 hover:via-gray-800 hover:to-red-900 text-white border-gray-700"
                onClick={() => router.push("/guides")}
              >
                Découvrir les guides
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-800 bg-gradient-to-br from-black via-gray-950 to-gray-900">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-red-500">T3CH</span>
              <span className="text-white">-FRANCE</span>
            </Link>
            <p className="text-gray-400 text-sm">© 2025 T3CH-FRANCE. Tous droits réservés.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-red-500">
              À propos
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-400 hover:text-red-500">
              Contact
            </Link>
            <Link href="/terms" className="text-sm font-medium text-gray-400 hover:text-red-500">
              Conditions
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-400 hover:text-red-500">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="container py-6 text-center text-sm text-gray-500">
          <p>
            T3CH-FRANCE n'est affilié à aucune des marques mentionnées. Tous les guides proposent des méthodes légitimes
            utilisant des offres promotionnelles officielles, des programmes de fidélité et des astuces d'achat.
          </p>
        </div>
      </footer>
    </div>
  )
}
