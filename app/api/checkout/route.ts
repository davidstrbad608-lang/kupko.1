import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  // Inicijaliziramo Stripe unutar funkcije kako se ne bi pokretao tijekom builda
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  try {
    const body = await request.json();
    const { paketNaziv, cijena, oglasNaslov } = body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Promocija: ${paketNaziv}`,
              description: `Oglas: ${oglasNaslov}`,
            },
            unit_amount: Math.round(parseFloat(cijena) * 100), // Stripe računa u centima
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}?success=true`,
      cancel_url: `${request.headers.get('origin')}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Greška sa Stripe-om:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}