"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Star, Clock, FileText, Shield, Flame, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart, type CartItem } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"

// Données simulées des guides
const guidesData = {
  "1": {
    id: "1",
    title: "Discord Nitro à -78%",
    price: 2.2,
    image: "/images/discord-nitro-new.png",
    category: "Discord",
    rating: 4.8,
    description:
      "Guide complet pour obtenir Discord Nitro à seulement 2,20€ au lieu de 9,99€ grâce aux offres promotionnelles et programmes partenaires.",
    fullDescription:
      "Ce guide détaillé vous explique comment obtenir Discord Nitro à seulement 2,20€ au lieu de 9,99€ par mois. Vous découvrirez les meilleures offres promotionnelles, les programmes partenaires et les astuces pour maximiser vos économies. Toutes les méthodes sont 100% légitimes et respectent les conditions d'utilisation de Discord.",
    features: [
      "Accès à des offres promotionnelles exclusives",
      "Méthodes pour combiner plusieurs réductions",
      "Astuces pour renouveler votre abonnement à prix réduit",
      "Guide étape par étape avec captures d'écran",
      "Mises à jour gratuites à vie",
    ],
    pages: 15,
    lastUpdate: "15/04/2025",
    color: "blue",
    paymentLink: "",
  },
  "2": {
    id: "2",
    title: "Snapchat+ Économies",
    price: 0.5,
    image: "/images/snapchat-plus.png",
    category: "Snapchat",
    rating: 4.6,
    description: "Méthodes légitimes pour réduire le coût de votre abonnement Snapchat+ et maximiser les avantages.",
    fullDescription:
      "Découvrez comment obtenir Snapchat+ à seulement 0,50€ au lieu de 3,99€ par mois. Ce guide vous révèle les meilleures offres, les programmes de fidélité et les astuces pour réduire considérablement le coût de votre abonnement tout en profitant de tous les avantages premium.",
    features: [
      "Techniques pour obtenir des réductions exclusives",
      "Méthodes pour utiliser les cartes cadeaux à prix réduit",
      "Astuces pour profiter des offres saisonnières",
      "Instructions détaillées avec images",
      "Support technique inclus",
    ],
    pages: 12,
    lastUpdate: "02/05/2025",
    color: "red",
    paymentLink: "",
  },
  "6": {
    id: "6",
    title: "Full Pack Tech",
    price: 2.0,
    image: "/images/discord-nitro-new.png",
    category: "Pack Complet",
    rating: 5.0,
    description:
      "Obtenez TOUS nos guides techniques dans un seul pack à prix réduit! Inclut Discord Nitro et Snapchat+ avec des bonus exclusifs.",
    fullDescription:
      "Le Full Pack Tech est notre offre la plus complète. Il inclut tous nos guides actuels et futurs à un prix imbattable. Vous économiserez plus de 65% par rapport à l'achat individuel des guides et vous bénéficierez de mises à jour gratuites à vie.",
    features: [
      "Accès à tous nos guides actuels (Discord Nitro, Snapchat+)",
      "Accès aux futurs guides sans frais supplémentaires",
      "Mises à jour gratuites à vie",
      "Support prioritaire",
      "Bonus exclusifs et astuces supplémentaires",
    ],
    pages: 30,
    lastUpdate: "12/05/2025",
    color: "red",
    isHot: true,
    paymentLink: "",
  },
}

export default function GuidePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [guide, setGuide] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addItem, items } = useCart()

  useEffect(() => {
    // Simuler le chargement des données du guide
    if (guidesData[id]) {
      setGuide(guidesData[id])
    } else {
      router.push("/guides")
    }
  }, [id, router])

  const isInCart = items.some((item) => item.id === id)

  const handleAddToCart = () => {
    if (isInCart) {
      toast({
        title: "Déjà dans votre panier",
        description: `${guide.title} est déjà dans votre panier.`,
      })
      return
    }

    setIsLoading(true)

    // Simuler un délai pour l'ajout au panier
    setTimeout(() => {
      const item: CartItem = {
        id: guide.id,
        title: guide.title,
        price: guide.price,
        image: guide.image,
        category: guide.category,
      }

      addItem(item)

      setIsLoading(false)
      toast({
        title: "Guide ajouté au panier",
        description: `${guide.title} a été ajouté à votre panier.`,
      })
    }, 500)
  }

  const handleDirectPayment = () => {
    if (guide.paymentLink) {
      window.open(guide.paymentLink, "_blank")
    } else {
      // Si pas de lien de paiement direct, ajouter au panier
      handleAddToCart()
    }
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950 to-green-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4">Chargement...</p>
        </div>
      </div>
    )
  }

  // Déterminer les classes de couleur en fonction du guide
  const getBadgeClass = () => {
    switch (guide.color) {
      case "blue":
        return "bg-gradient-to-r from-blue-800 to-blue-600 text-blue-100"
      case "red":
        return guide.isHot ? "hot-badge" : "bg-gradient-to-r from-red-800 to-red-600 text-red-100"
      case "green":
        return "bg-gradient-to-r from-green-800 to-green-600 text-green-100"
      default:
        return "tri-gradient-subtle"
    }
  }

  const getTextClass = () => {
    switch (guide.color) {
      case "blue":
        return "text-blue-200"
      case "red":
        return "text-red-200"
      case "green":
        return "text-green-200"
      default:
        return "text-gray-200"
    }
  }

  const getIconClass = () => {
    switch (guide.color) {
      case "blue":
        return "bg-gradient-to-r from-gray-950 to-blue-700"
      case "red":
        return "bg-gradient-to-r from-gray-950 to-red-700"
      case "green":
        return "bg-gradient-to-r from-gray-950 to-green-700"
      default:
        return "tri-gradient"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/guides" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux guides
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="tri-gradient-bg border border-blue-800/50 rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden relative">
                    {guide.isHot && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="hot-badge sale-pulse">
                          <Flame className="mr-1 h-3 w-3" /> HOT
                        </Badge>
                      </div>
                    )}
                    <img src={guide.image || "/placeholder.svg"} alt={guide.title} className="w-full h-auto" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <Badge className={`mb-2 ${getBadgeClass()}`} variant="outline">
                    {guide.category}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{guide.title}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                      <span className="font-bold">{guide.rating}</span>
                      <span className="text-blue-200 text-sm ml-1">/5</span>
                    </div>
                    <div className="mx-4 text-blue-700">|</div>
                    <div className="flex items-center text-blue-200 text-sm">
                      <FileText className="h-4 w-4 mr-1" />
                      {guide.pages} pages
                    </div>
                    <div className="mx-4 text-blue-700">|</div>
                    <div className="flex items-center text-blue-200 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      Mis à jour le {guide.lastUpdate}
                    </div>
                  </div>
                  <p className={getTextClass() + " mb-6"}>{guide.fullDescription}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-200">Prix</p>
                      <div className="flex items-center">
                        <p className="text-3xl font-bold">{guide.price.toFixed(2)} €</p>
                        {guide.isHot && (
                          <>
                            <p className="text-lg line-through text-gray-400 ml-2">6.00 €</p>
                            <Badge className="ml-2 bg-red-600 text-white">-67%</Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {guide.paymentLink ? (
                        <Button
                          onClick={handleDirectPayment}
                          className="px-8 bg-gradient-to-r from-green-600 to-blue-600"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Payer avec Stripe
                        </Button>
                      ) : (
                        <Button
                          onClick={handleAddToCart}
                          className={`px-8 ${isInCart ? "bg-gradient-to-r from-green-600 via-red-600 to-blue-600" : "tri-gradient"}`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            "Ajout en cours..."
                          ) : isInCart ? (
                            "Déjà dans le panier"
                          ) : (
                            <>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Ajouter au panier
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tri-gradient-bg border border-blue-800/50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Ce que vous apprendrez</h2>
              <ul className="space-y-3">
                {guide.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-blue-900/50 p-1 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className={getTextClass()}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tri-gradient-bg border border-blue-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Aperçu du contenu</h2>
              <div className="space-y-4">
                <div className="border border-blue-800/50 rounded p-3 bg-gradient-to-r from-blue-900/20 via-red-900/20 to-green-900/20">
                  <h3 className="font-medium mb-1">1. Introduction</h3>
                  <p className="text-sm text-blue-200">
                    Présentation des méthodes et des économies potentielles. Vue d'ensemble du guide.
                  </p>
                </div>
                <div className="border border-blue-800/50 rounded p-3 bg-gradient-to-r from-blue-900/20 via-red-900/20 to-green-900/20">
                  <h3 className="font-medium mb-1">2. Méthodes principales</h3>
                  <p className="text-sm text-blue-200">
                    Explication détaillée des techniques pour obtenir {guide.title} à prix réduit.
                  </p>
                </div>
                <div className="border border-blue-800/50 rounded p-3 bg-gradient-to-r from-blue-900/20 via-red-900/20 to-green-900/20">
                  <h3 className="font-medium mb-1">3. Astuces avancées</h3>
                  <p className="text-sm text-blue-200">
                    Techniques supplémentaires pour maximiser vos économies et prolonger les offres.
                  </p>
                </div>
                <div className="border border-blue-800/50 rounded p-3 bg-gradient-to-r from-blue-900/20 via-red-900/20 to-green-900/20">
                  <h3 className="font-medium mb-1">4. FAQ et dépannage</h3>
                  <p className="text-sm text-blue-200">
                    Réponses aux questions fréquentes et solutions aux problèmes courants.
                  </p>
                </div>
                <div className="border border-blue-800/50 rounded p-3 bg-gradient-to-r from-blue-900/20 via-red-900/20 to-green-900/20">
                  <h3 className="font-medium mb-1">5. Mises à jour et ressources</h3>
                  <p className="text-sm text-blue-200">
                    Informations sur les mises à jour futures et ressources complémentaires.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="tri-gradient-bg border border-blue-800/50 rounded-lg p-6 mb-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Pourquoi choisir ce guide</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className={`rounded-full ${getIconClass()} p-2 mr-3`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">100% Légitime</h3>
                    <p className="text-sm text-blue-200">
                      Toutes nos méthodes respectent les conditions d'utilisation des services.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`rounded-full ${getIconClass()} p-2 mr-3`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v4" />
                      <path d="M12 18v4" />
                      <path d="m4.93 4.93 2.83 2.83" />
                      <path d="m16.24 16.24 2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="M18 12h4" />
                      <path d="m4.93 19.07 2.83-2.83" />
                      <path d="m16.24 7.76 2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Mises à jour régulières</h3>
                    <p className="text-sm text-blue-200">
                      Nos guides sont régulièrement mis à jour pour vous garantir les informations les plus récentes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`rounded-full ${getIconClass()} p-2 mr-3`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Garantie de remboursement</h3>
                    <p className="text-sm text-blue-200">
                      Si nos méthodes ne fonctionnent pas, nous vous remboursons intégralement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`rounded-full ${getIconClass()} p-2 mr-3`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Support client</h3>
                    <p className="text-sm text-blue-200">
                      Notre équipe est disponible pour répondre à toutes vos questions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-800/50">
                {guide.paymentLink ? (
                  <Button
                    onClick={handleDirectPayment}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Payer avec Stripe
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    className={`w-full ${isInCart ? "bg-gradient-to-r from-green-600 via-red-600 to-blue-600 hover:from-green-700 hover:via-red-700 hover:to-blue-700" : "tri-gradient"}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Ajout en cours..."
                    ) : isInCart ? (
                      "Déjà dans le panier"
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ajouter au panier
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
