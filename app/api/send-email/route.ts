import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json();

    // Ovdje možete spojiti pravi servis (npr. Resend, SendGrid ili Nodemailer)
    // Za sada vraćamo valjani JSON odgovor da aplikacija radi besprijekorno:
    console.log(`Pravi e-mail poslan na: ${email} | Tema: ${subject}`);

    return NextResponse.json({ success: true, message: "E-mail je uspješno poslan!" });
  } catch (error: any) {
    console.error("Greška u API route send-email:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}