"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeItem, clearCart, getTotalPrice } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-blue-300 mb-6">Votre panier est vide</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Découvrir nos guides</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-blue-950/30 border border-blue-900 rounded-lg overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-blue-900/50">
                  <tr>
                    <th className="text-left p-4">Produit</th>
                    <th className="text-right p-4">Prix</th>
                    <th className="text-right p-4 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t border-blue-900">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded overflow-hidden mr-4 hidden sm:block">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-blue-300 text-sm">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold">{item.price.toFixed(2)} €</td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-400 hover:bg-red-950/30"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-900/30">
                  <tr>
                    <td className="p-4 font-bold text-lg">Total</td>
                    <td className="p-4 text-right font-bold text-lg">{getTotalPrice().toFixed(2)} €</td>
                    <td className="p-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" onClick={clearCart} className="border-red-700 text-red-500 hover:bg-red-950/30">
                <Trash2 className="mr-2 h-4 w-4" />
                Vider le panier
              </Button>

              <Button className="bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                <CreditCard className="mr-2 h-4 w-4" />
                Procéder au paiement
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
