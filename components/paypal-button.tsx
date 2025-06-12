"use client"

import { useEffect, useRef } from "react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"

declare global {
  interface Window {
    paypal?: any
  }
}

interface PayPalButtonProps {
  onSuccess?: (details: any) => void
  onError?: (error: any) => void
  onCancel?: () => void
}

export default function PayPalButton({ onSuccess, onError, onCancel }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const { items, getTotalPrice, clearCart } = useCart()

  useEffect(() => {
    // Charger le SDK PayPal
    if (!window.paypal) {
      const script = document.createElement("script")
      script.src = "https://www.paypal.com/sdk/js?client-id=VOTRE_CLIENT_ID_PAYPAL&currency=EUR"
      script.async = true
      script.onload = () => {
        renderPayPalButton()
      }
      document.body.appendChild(script)
    } else {
      renderPayPalButton()
    }

    return () => {
      // Nettoyer le bouton PayPal lors du démontage
      if (paypalRef.current) {
        paypalRef.current.innerHTML = ""
      }
    }
  }, [items])

  const renderPayPalButton = () => {
    if (window.paypal && paypalRef.current) {
      // Nettoyer le conteneur avant de rendre le nouveau bouton
      paypalRef.current.innerHTML = ""

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          },
          createOrder: (data: any, actions: any) => {
            const orderItems = items.map((item) => ({
              name: item.title,
              unit_amount: {
                currency_code: "EUR",
                value: item.price.toFixed(2),
              },
              quantity: "1",
              category: "DIGITAL_GOODS",
            }))

            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "EUR",
                    value: getTotalPrice().toFixed(2),
                    breakdown: {
                      item_total: {
                        currency_code: "EUR",
                        value: getTotalPrice().toFixed(2),
                      },
                    },
                  },
                  items: orderItems,
                  description: `Commande T3CH-FRANCE - ${items.length} guide(s)`,
                },
              ],
              application_context: {
                brand_name: "T3CH-FRANCE",
                locale: "fr-FR",
                user_action: "PAY_NOW",
                return_url: `${window.location.origin}/payment-success`,
                cancel_url: `${window.location.origin}/payment-cancel`,
              },
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture()

              // Générer un ID de commande
              const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

              // Envoyer l'email de confirmation
              try {
                await fetch("/api/order-confirmation", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    customerEmail: details.payer.email_address,
                    customerName: `${details.payer.name.given_name} ${details.payer.name.surname}`,
                    orderId,
                    items,
                    totalAmount: getTotalPrice(),
                    paymentMethod: "PayPal",
                    transactionId: details.id,
                  }),
                })
              } catch (emailError) {
                console.error("Erreur lors de l'envoi de l'email:", emailError)
              }

              clearCart()

              toast({
                title: "Paiement réussi !",
                description: "Votre commande a été traitée avec succès. Vous recevrez vos guides par email.",
              })

              if (onSuccess) {
                onSuccess(details)
              } else {
                // Rediriger vers la page de succès
                window.location.href = `/payment-success?orderId=${orderId}&transactionId=${details.id}`
              }
            } catch (error) {
              console.error("Erreur lors du traitement du paiement:", error)
              toast({
                title: "Erreur de paiement",
                description: "Une erreur est survenue lors du traitement de votre paiement.",
                variant: "destructive",
              })
              if (onError) {
                onError(error)
              }
            }
          },
          onError: (err: any) => {
            console.error("Erreur PayPal:", err)
            toast({
              title: "Erreur PayPal",
              description: "Une erreur est survenue avec PayPal. Veuillez réessayer.",
              variant: "destructive",
            })
            if (onError) {
              onError(err)
            }
          },
          onCancel: (data: any) => {
            console.log("Paiement annulé:", data)
            toast({
              title: "Paiement annulé",
              description: "Votre paiement a été annulé.",
            })
            if (onCancel) {
              onCancel()
            }
          },
        })
        .render(paypalRef.current)
    }
  }

  return (
    <div className="w-full">
      <div ref={paypalRef} className="w-full min-h-[200px]"></div>
    </div>
  )
}
