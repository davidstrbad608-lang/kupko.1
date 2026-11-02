import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json();

    console.log("Pokušaj slanja na: " + email);

    const response = await resend.emails.send({
      from: 'Kupko <info@kupko.eu>',
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 30px; text-align: center;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: left;">
            
            <!-- Zaglavlje s logotipom -->
            <div style="text-align: center; margin-bottom: 25px;">
              <h1 style="color: #1e3a8a; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px;">
                KUP<span style="color: #f59e0b;">KO</span><span style="font-size: 12px; background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 6px; margin-left: 4px;">.EU</span>
              </h1>
            </div>

            <!-- Sadržaj poruke -->
            <div style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 25px;">
              ${message}
            </div>

            <!-- Podnožje -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0;">Ovaj e-mail je poslan automatski s platforme Kupko.eu. Molimo vas da ne odgovarate na ovu poruku.</p>
              <p style="margin: 5px 0 0 0;">© 2026 Kupko.eu - Sva prava pridržana.</p>
            </div>

          </div>
        </div>
      `,
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