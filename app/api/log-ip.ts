// pages/api/log-ip.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket.remoteAddress;

  const userAgent = req.headers['user-agent'] || 'inconnu';

  const data = {
    username: 'IP Logger',
    embeds: [
      {
        title: 'Nouvelle visite 👀',
        description: `**IP :** \`${ip}\`\n**User-Agent :** \`${userAgent}\``,
        color: 0x00b0f4,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  res.status(200).json({ message: 'IP log envoyée à Discord.' });
}
