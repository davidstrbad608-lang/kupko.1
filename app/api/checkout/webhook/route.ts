import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Inicijalizacija Stripe-a s tajnim ključem
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Supabase klijent za ažuriranje baze
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!signature) {
      throw new Error('Nedostaje stripe-signature zaglavlje.');
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Greška pri verifikaciji webhooka: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Provjeravamo je li uplata uspješno završena
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Dohvaćamo ID oglasa iz metadataka (koje šalješ prilikom kreiranja checkout sesije)
    const adId = session.metadata?.adId;

    if (adId) {
      // Ovdje ažuriraš tablicu u Supabase bazi (prilagodi naziv tablice i stupca svojoj bazi)
      const { error } = await supabase
        .from('oglasi') // Naziv vaše tablice s oglasima
        .update({ is_boosted: true }) // Polje koje označava da je oglas sponzoriran/promo
        .eq('id', adId);

      if (error) {
        console.error('Greška pri ažuriranju oglasa u Supabase bazi:', error);
      }
    }
  }

  return NextResponse.json({ received: true });
}