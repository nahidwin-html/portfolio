"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface TechniqueCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  instructor: string
  duration: string
}

export default function TechniqueCard({ id, name, price, image, category, instructor, duration }: TechniqueCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const addToCart = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Technique ajoutée au panier",
        description: `${name} a été ajouté à votre panier.`,
      })
    }, 1000)
  }

  return (
    <Card className="overflow-hidden">
      <Link href={`/techniques/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            className="h-[200px] w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </div>
        </div>
        <Link href={`/techniques/${id}`}>
          <h3 className="font-semibold text-lg hover:underline line-clamp-1">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">Par {instructor}</p>
        <p className="font-bold text-xl mt-2">{price.toFixed(2)} €</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={addToCart} className="w-full" disabled={isLoading}>
          {isLoading ? (
            "Ajout en cours..."
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
