import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-28.acacia' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paketNaziv, cijena, oglasNaslov } = body;

    const unitAmount = Math.round(parseFloat(cijena) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Promo paket: ${paketNaziv}`,
              description: `Isticanje oglasa: "${oglasNaslov}"`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?uspjeh=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?otkazano=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Greška pri kreiranju Stripe sesije:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}