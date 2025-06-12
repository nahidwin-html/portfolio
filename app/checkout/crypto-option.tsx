"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { convertEurToCrypto, getCryptoSymbol } from "@/lib/crypto-payment"

interface CryptoOptionProps {
  totalAmount: number
  customerDiscord: string
  customerName: string
}

export default function CryptoOption({ totalAmount, customerDiscord, customerName }: CryptoOptionProps) {
  const router = useRouter()
  const [selectedCrypto, setSelectedCrypto] = useState<"filecoin" | "solana" | "ethereum">("filecoin")
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
      router.push(
        `/crypto-payment?type=${selectedCrypto}&amount=${cryptoAmount}&orderId=${orderId}&discord=${encodeURIComponent(customerDiscord)}`,
      )
    }, 1000)
  }

  return (
    <div className="space-y-6 py-4">
      <RadioGroup
        value={selectedCrypto}
        onValueChange={(value: "filecoin" | "solana" | "ethereum") => setSelectedCrypto(value)}
      >
        <div className="flex items-center space-x-2 mb-4">
          <RadioGroupItem value="filecoin" id="filecoin" />
          <Label htmlFor="filecoin" className="flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full bg-[#0090FF] flex items-center justify-center text-white font-bold text-xs">
              FIL
            </div>
            Filecoin
          </Label>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <RadioGroupItem value="solana" id="solana" />
          <Label htmlFor="solana" className="flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center text-white font-bold text-xs">
              SOL
            </div>
            Solana
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

      <div className="border border-gray-800/50 rounded-lg p-4 bg-gradient-to-br from-black/60 via-gray-950/40 to-gray-900/30">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-300">Montant en EUR:</p>
          <p className="font-bold">{totalAmount.toFixed(2)} €</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-300">Équivalent en {getCryptoSymbol(selectedCrypto)}:</p>
          <p className="font-mono font-bold">
            {convertEurToCrypto(totalAmount, selectedCrypto)} {getCryptoSymbol(selectedCrypto)}
          </p>
        </div>
      </div>

      <Button
        onClick={handleCryptoPayment}
        className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-red-900"
        disabled={isProcessing || !customerDiscord}
      >
        {isProcessing
          ? "Préparation du paiement..."
          : `Payer avec ${selectedCrypto === "filecoin" ? "Filecoin" : selectedCrypto === "solana" ? "Solana" : "Ethereum"}`}
      </Button>

      <div className="text-xs text-gray-400 mt-2">
        <p>Après avoir cliqué sur le bouton, vous serez redirigé vers une page avec les instructions de paiement.</p>
      </div>
    </div>
  )
}
