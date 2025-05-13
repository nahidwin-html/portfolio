"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    question: "Comment fonctionnent vos guides ?",
    answer:
      "Nos guides contiennent des instructions détaillées, étape par étape, pour vous aider à économiser sur vos services numériques préférés. Ils exploitent des offres promotionnelles légitimes, des programmes de fidélité et des astuces peu connues pour vous permettre d'obtenir ces services à prix réduit.",
    category: "Général",
  },
  {
    question: "Les méthodes proposées sont-elles légales ?",
    answer:
      "Oui, toutes nos méthodes sont 100% légales et respectent les conditions d'utilisation des services concernés. Nous n'encourageons jamais le piratage ou la fraude. Nos guides utilisent uniquement des offres promotionnelles officielles et des astuces légitimes.",
    category: "Général",
  },
  {
    question: "Comment recevrais-je mon guide après l'achat ?",
    answer:
      "Après votre achat, vous recevrez immédiatement un email contenant un lien de téléchargement pour accéder à votre guide au format PDF. Vous pourrez également accéder à vos guides depuis votre compte sur notre site.",
    category: "Achat",
  },
  {
    question: "Que faire si les méthodes ne fonctionnent pas ?",
    answer:
      "Nous offrons une garantie de satisfaction de 30 jours. Si nos méthodes ne fonctionnent pas comme décrit, contactez notre service client et nous vous rembourserons intégralement. Nous mettons régulièrement à jour nos guides pour garantir leur efficacité.",
    category: "Support",
  },
  {
    question: "Les guides sont-ils mis à jour régulièrement ?",
    answer:
      "Oui, nous mettons régulièrement à jour nos guides pour tenir compte des changements dans les offres et les politiques des services. Lorsque vous achetez un guide, vous bénéficiez de mises à jour gratuites à vie.",
    category: "Général",
  },
  {
    question: "Puis-je partager mon guide avec des amis ?",
    answer:
      "Non, nos guides sont protégés par des droits d'auteur et sont destinés à un usage personnel uniquement. Le partage ou la revente de nos guides est strictement interdit et peut entraîner des poursuites légales.",
    category: "Utilisation",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, etc.), PayPal, les crypto-monnaies (Bitcoin, Ethereum, USDT) et les paiements mobiles (Apple Pay, Google Pay).",
    category: "Achat",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Vous pouvez contacter notre service client par email à support@t3ch-france.com ou via le formulaire de contact sur notre site. Nous répondons généralement dans un délai de 24 heures.",
    category: "Support",
  },
  {
    question: "Qu'est-ce que le Full Pack Tech ?",
    answer:
      "Le Full Pack Tech est notre offre la plus complète. Il inclut tous nos guides actuels et futurs à un prix réduit. Vous économisez plus de 70% par rapport à l'achat individuel des guides et vous bénéficiez de mises à jour gratuites à vie.",
    category: "Produits",
  },
  {
    question: "Les méthodes fonctionnent-elles dans tous les pays ?",
    answer:
      "La plupart de nos méthodes fonctionnent dans de nombreux pays, mais certaines peuvent être spécifiques à des régions particulières. Chaque guide précise les pays où les méthodes sont applicables.",
    category: "Utilisation",
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index))
    } else {
      setOpenItems([...openItems, index])
    }
  }

  const categories = Array.from(new Set(faqItems.map((item) => item.category)))

  const filteredItems = faqItems.filter(
    (item) =>
      (activeCategory === null || item.category === activeCategory) &&
      (searchTerm === "" ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Foire Aux Questions</h1>

          <div className="flex justify-center mb-8">
            <img
              src="/images/tech-benefits.png"
              alt="FAQ T3CH-FRANCE"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <Input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              className={
                activeCategory === null
                  ? "bg-gradient-to-r from-blue-600 to-green-600"
                  : "border-blue-700/50 text-green-400 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-green-900/30"
              }
            >
              Toutes
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-green-600"
                    : "border-blue-700/50 text-green-400 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-green-900/30"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-blue-800/50 rounded-lg overflow-hidden bg-gradient-to-br from-blue-950/30 to-green-950/30"
                >
                  <button
                    className="w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
                    onClick={() => toggleItem(index)}
                  >
                    <span>{item.question}</span>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-500" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="p-4 pt-0 border-t border-blue-800/50">
                      <p className="text-green-200">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-green-200">Aucun résultat trouvé pour votre recherche.</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="text-green-200 mb-4">
              N'hésitez pas à contacter notre équipe de support. Nous sommes là pour vous aider et répondre à toutes vos
              questions.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
