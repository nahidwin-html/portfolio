"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Star, Flame } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useCart, type CartItem } from "@/contexts/cart-context"

interface GuideCardProps {
  id: string
  title: string
  price: number
  image: string
  category: string
  rating: number
  description: string
}

export default function GuideCard({ id, title, price, image, category, rating, description }: GuideCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem, items } = useCart()

  const isInCart = items.some((item) => item.id === id)

  const handleAddToCart = () => {
    if (isInCart) {
      toast({
        title: "Déjà dans votre panier",
        description: `${title} est déjà dans votre panier.`,
      })
      return
    }

    setIsLoading(true)

    // Simuler un délai pour l'ajout au panier
    setTimeout(() => {
      const item: CartItem = {
        id,
        title,
        price,
        image,
        category,
      }

      addItem(item)

      setIsLoading(false)
      toast({
        title: "Guide ajouté au panier",
        description: `${title} a été ajouté à votre panier.`,
      })
    }, 500)
  }

  // Déterminer la couleur du badge en fonction de la catégorie
  const getBadgeClass = () => {
    switch (category.toLowerCase()) {
      case "discord":
        return "bg-gradient-to-r from-blue-800 to-blue-600 text-blue-100 border-blue-700/50"
      case "snapchat":
        return "bg-gradient-to-r from-red-800 to-red-600 text-red-100 border-red-700/50"
      case "robux":
        return "bg-gradient-to-r from-green-800 to-green-600 text-green-100 border-green-700/50"
      case "uber eats":
        return "bg-gradient-to-r from-red-800 to-red-600 text-red-100 border-red-700/50"
      case "pack complet":
        return "hot-badge"
      default:
        return "tri-gradient-subtle text-white"
    }
  }

  // Déterminer la couleur du texte de description en fonction de la catégorie
  const getDescriptionClass = () => {
    switch (category.toLowerCase()) {
      case "discord":
        return "text-blue-200"
      case "snapchat":
        return "text-red-200"
      case "robux":
        return "text-green-200"
      case "uber eats":
        return "text-red-200"
      case "pack complet":
        return "text-red-200"
      default:
        return "text-gray-200"
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-gradient-to-br from-blue-950 via-red-950/30 to-green-950 border-blue-800/50 text-white">
      <Link href={`/guides/${id}`}>
        <div className="overflow-hidden h-[200px] relative">
          {category.toLowerCase() === "pack complet" && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="hot-badge sale-pulse">
                <Flame className="mr-1 h-3 w-3" /> HOT
              </Badge>
            </div>
          )}
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={200}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-blue-800 via-red-800 to-green-800 text-blue-100 border-blue-700/50 hover:from-blue-700 hover:via-red-700 hover:to-green-700"
          >
            {category}
          </Badge>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>
        <Link href={`/guides/${id}`}>
          <h3 className="font-semibold text-lg hover:underline line-clamp-1 text-white">{title}</h3>
        </Link>
        <p className={`text-sm ${getDescriptionClass()} mt-2 line-clamp-3`}>{description}</p>
        <div className="mt-3">
          <p className="font-bold text-xl text-white">{price.toFixed(2)} €</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          onClick={handleAddToCart}
          className={`w-full ${isInCart ? "bg-gradient-to-r from-green-600 via-red-600 to-blue-600 hover:from-green-700 hover:via-red-700 hover:to-blue-700" : "bg-gradient-to-r from-blue-600 via-red-600 to-green-600 hover:from-blue-700 hover:via-red-700 hover:to-green-700"}`}
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
      </CardFooter>
    </Card>
  )
}
