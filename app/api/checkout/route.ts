import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
  try {
    const { paketNaziv, cijena, oglasNaslov } = await request.json();

    // Pretvaramo cijenu u cente (npr. 3.50 € postaje 350 centi)
    const unitAmount = Math.round(parseFloat(cijena) * 100);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Kupko Promo: ${paketNaziv}`,
              description: `Sponzorirani oglas: ${oglasNaslov}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/?success=true`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Greška u Stripe checkout API-ju:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}