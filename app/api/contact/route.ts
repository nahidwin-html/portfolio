import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

// Configurer SendGrid avec la clé API
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Créer le message email
    const msg = {
      to: "mbelhou7@gmail.com", // L'adresse email de réception
      from: "noreply@t3ch-france.com", // Cette adresse doit être vérifiée dans votre compte SendGrid
      subject: `Nouveau message: ${subject}`,
      text: `
        Nom: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0070f3; margin-bottom: 20px;">Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p>Ce message a été envoyé depuis le formulaire de contact de T3CH-FRANCE.</p>
          </div>
        </div>
      `,
    }

    // Envoyer l'email
    await sgMail.send(msg)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
