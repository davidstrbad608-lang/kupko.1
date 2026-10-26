import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const oglasId = session.metadata?.oglasId;
    const trajanjeDana = parseInt(session.metadata?.trajanjeDana || '7');

    if (oglasId) {
      // Izračunavamo datum isteka (npr. danas + 3, 7 ili 30 dana)
      const datumIsteka = new Date();
      datumIsteka.setDate(datumIsteka.getDate() + trajanjeDana);

      // Ažuriramo bazu: postavljamo oglas kao promo i zapisujemo kad ističe
      const { error } = await supabase
        .from('oglasi')
        .update({ 
          promoviran: true, 
          top: true, 
          promo_istek: datumIsteka.toISOString() 
        })
        .eq('id', oglasId);

      if (error) {
        console.error("Greška pri ažuriranju baze:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}