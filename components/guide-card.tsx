"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"

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

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-blue-950 border-blue-900 text-white">
      <Link href={`/guides/${id}`}>
        <div className="overflow-hidden h-[200px]">
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
          <Badge variant="outline" className="bg-blue-900 text-blue-100 border-blue-700 hover:bg-blue-800">
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
        <p className="text-sm text-blue-200 mt-2 line-clamp-3">{description}</p>
        <div className="mt-3">
          <p className="font-bold text-xl text-white">{price.toFixed(2)} €</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          onClick={handleAddToCart}
          className={`w-full ${isInCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
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
