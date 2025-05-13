import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

// Configurer SendGrid avec la clé API
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerEmail, customerName, orderId, items, totalAmount } = body

    // Générer le contenu HTML pour les articles commandés
    const itemsHtml = items
      .map(
        (item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">
          <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${item.title}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right;">${item.price.toFixed(2)} €</td>
      </tr>
    `,
      )
      .join("")

    // Créer le message email
    const msg = {
      to: customerEmail,
      from: "noreply@t3ch-france.com", // Cette adresse doit être vérifiée dans votre compte SendGrid
      subject: `Confirmation de commande #${orderId} - T3CH-FRANCE`,
      text: `
        Bonjour ${customerName},
        
        Merci pour votre commande sur T3CH-FRANCE !
        
        Numéro de commande: ${orderId}
        Montant total: ${totalAmount.toFixed(2)} €
        
        Vous trouverez vos guides en pièce jointe à cet email.
        
        L'équipe T3CH-FRANCE
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #0070f3; margin-bottom: 5px;">T3CH-FRANCE</h1>
            <p style="color: #666;">Votre commande est confirmée</p>
          </div>
          
          <div style="background: linear-gradient(to right, #0070f3, #10b981); color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="margin: 0;">Merci pour votre commande, ${customerName}!</h2>
          </div>
          
          <p>Votre commande <strong>#${orderId}</strong> a été traitée avec succès.</p>
          
          <h3 style="margin-top: 30px; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">Détails de la commande</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Produit</th>
                <th style="padding: 10px; text-align: left;">Nom</th>
                <th style="padding: 10px; text-align: right;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 15px; text-align: right; font-weight: bold;">${totalAmount.toFixed(2)} €</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Comment accéder à vos guides:</strong></p>
            <p>Vos guides sont disponibles en pièce jointe à cet email. Vous pouvez également les télécharger depuis votre compte sur notre site.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <p>Des questions? Contactez notre équipe de support à <a href="mailto:support@t3ch-france.com">support@t3ch-france.com</a></p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666; text-align: center;">
            <p>© 2025 T3CH-FRANCE. Tous droits réservés.</p>
          </div>
        </div>
      `,
      // Vous pourriez ajouter des pièces jointes ici
      // attachments: [
      //   {
      //     content: Buffer.from(pdfContent).toString('base64'),
      //     filename: 'guide.pdf',
      //     type: 'application/pdf',
      //     disposition: 'attachment'
      //   }
      // ]
    }

    // Envoyer l'email
    await sgMail.send(msg)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de confirmation:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de la confirmation de commande" }, { status: 500 })
  }
}
