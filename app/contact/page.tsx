"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      // Envoyer les données à l'API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message envoyé",
          description:
            "Votre message a été envoyé à mbelhou7@gmail.com. Nous vous répondrons dans les plus brefs délais.",
        })
        form.reset()
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-green-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-6">Nos coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="rounded-full bg-gradient-to-r from-blue-900/50 to-green-900/50 p-2 mr-4">
                      <Mail className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-green-200">mbelhou7@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg overflow-hidden">
                <img src="/images/tech-services.png" alt="Support technique" className="w-full h-auto" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-950/30 to-green-950/30 border border-blue-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Envoyez-nous un message</h2>
              <p className="text-green-200 mb-6">
                Tous les messages sont envoyés directement à notre adresse email: mbelhou7@gmail.com
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                    className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                    className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Sujet de votre message"
                    required
                    className="bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Votre message"
                    required
                    className="min-h-[150px] bg-gradient-to-br from-blue-950/50 to-green-950/50 border-blue-800/50 text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
