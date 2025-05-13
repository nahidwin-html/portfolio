import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "T3CH-FRANCE - Discord Nitro à 3€ | Snapchat+ à 0,50€ | Robux à 5€",
  description:
    "Guides exclusifs pour obtenir Discord Nitro à 3€, Snapchat+ à 0,50€, et des Robux à seulement 5€. Méthodes garanties et faciles à suivre.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
        <Toaster />
      </body>
    </html>
  )
}
