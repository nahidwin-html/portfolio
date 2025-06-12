"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { convertEurToCrypto } from "@/lib/crypto-payment"

interface CryptoOptionProps {
  totalAmount: number
  customerEmail: string
  customerName: string
}

export default function CryptoOption({ totalAmount, customerEmail, customerName }: CryptoOptionProps) {
  const router = useRouter()
  const [selectedCrypto, setSelectedCrypto] = useState<"bitcoin" | "ethereum">("bitcoin")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCryptoPayment = () => {
    setIsProcessing(true)

    // Générer un ID de commande
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Convertir le montant en EUR en crypto
    const cryptoAmount = convertEurToCrypto(totalAmount, selectedCrypto)

    // Dans un environnement réel, vous enregistreriez la commande dans votre base de données ici

    // Rediriger vers la page de paiement en crypto
    setTimeout(() => {
      router.push(`/crypto-payment?type=${selectedCrypto}&amount=${cryptoAmount}&orderId=${orderId}`)
    }, 1000)
  }

  return (
    <div className="space-y-6 py-4">
      <RadioGroup value={selectedCrypto} onValueChange={(value: "bitcoin" | "ethereum") => setSelectedCrypto(value)}>
        <div className="flex items-center space-x-2 mb-4">
          <RadioGroupItem value="bitcoin" id="bitcoin" />
          <Label htmlFor="bitcoin" className="flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full bg-[#F7931A] flex items-center justify-center text-white font-bold">
              ₿
            </div>
            Bitcoin
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ethereum" id="ethereum" />
          <Label htmlFor="ethereum" className="flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full bg-[#627EEA] flex items-center justify-center text-white">Ξ</div>
            Ethereum
          </Label>
        </div>
      </RadioGroup>

      <div className="border border-red-800/50 rounded-lg p-4 bg-gradient-to-br from-red-950/30 to-gray-950/30">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-red-200">Montant en EUR:</p>
          <p className="font-bold">{totalAmount.toFixed(2)} €</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-red-200">Équivalent en {selectedCrypto === "bitcoin" ? "BTC" : "ETH"}:</p>
          <p className="font-mono font-bold">
            {convertEurToCrypto(totalAmount, selectedCrypto)} {selectedCrypto === "bitcoin" ? "BTC" : "ETH"}
          </p>
        </div>
      </div>

      <Button
        onClick={handleCryptoPayment}
        className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900"
        disabled={isProcessing}
      >
        {isProcessing
          ? "Préparation du paiement..."
          : `Payer avec ${selectedCrypto === "bitcoin" ? "Bitcoin" : "Ethereum"}`}
      </Button>

      <div className="text-xs text-red-200 mt-2">
        <p>Après avoir cliqué sur le bouton, vous serez redirigé vers une page avec les instructions de paiement.</p>
      </div>
    </div>
  )
}
