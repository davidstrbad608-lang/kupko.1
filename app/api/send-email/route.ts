import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json();

    console.log("Pokušaj slanja na: " + email);

    const response = await resend.emails.send({
      from: 'Kupko.hr <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      html: `<p>${message}</p>`,
    });

    if (response.error) {
      console.error("Resend vratio grešku:", response.error);
      return NextResponse.json({ success: false, error: response.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("Greška u try/catch bloku:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}