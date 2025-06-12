import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

// Configurer SendGrid avec la clé API
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerDiscord, customerName, orderId, items, totalAmount, paymentMethod, transactionId } = body

    // Dans un environnement réel, vous enverriez un message Discord à l'utilisateur
    // Ici, nous simulons simplement une réponse réussie

    console.log("Commande reçue:", {
      customerDiscord,
      customerName,
      orderId,
      itemCount: items.length,
      totalAmount,
      paymentMethod,
      transactionId,
    })

    // Vous pourriez également envoyer un email de confirmation interne
    try {
      const msg = {
        to: "admin@t3ch-france.com", // Adresse email de l'administrateur
        from: "noreply@t3ch-france.com", // Cette adresse doit être vérifiée dans votre compte SendGrid
        subject: `Nouvelle commande #${orderId}`,
        text: `
          Nouvelle commande reçue:
          
          ID: ${orderId}
          Client: ${customerName}
          Discord: ${customerDiscord}
          Montant: ${totalAmount.toFixed(2)} €
          Méthode de paiement: ${paymentMethod || "Non spécifiée"}
          ${transactionId ? `ID de transaction: ${transactionId}` : ""}
          
          Produits:
          ${items.map((item: any) => `- ${item.title}: ${item.price.toFixed(2)} €`).join("\n")}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h1 style="color: #ef4444;">Nouvelle commande #${orderId}</h1>
            
            <div style="margin: 20px 0;">
              <p><strong>Client:</strong> ${customerName}</p>
              <p><strong>Discord:</strong> ${customerDiscord}</p>
              <p><strong>Montant:</strong> ${totalAmount.toFixed(2)} €</p>
              <p><strong>Méthode de paiement:</strong> ${paymentMethod || "Non spécifiée"}</p>
              ${transactionId ? `<p><strong>ID de transaction:</strong> ${transactionId}</p>` : ""}
            </div>
            
            <h2>Produits:</h2>
            <ul>
              ${items.map((item: any) => `<li>${item.title}: ${item.price.toFixed(2)} €</li>`).join("")}
            </ul>
          </div>
        `,
      }

      await sgMail.send(msg)
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email interne:", emailError)
      // Ne pas échouer la requête si l'email interne échoue
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors du traitement de la commande:", error)
    return NextResponse.json({ error: "Erreur lors du traitement de la commande" }, { status: 500 })
  }
}
