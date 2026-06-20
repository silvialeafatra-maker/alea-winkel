import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const {
      email,
      fullName,
      total,
      items,
    } = await req.json();

    const itemsHtml = items
      .map(
        (item) => `
        <li>
          ${item.name} - Size ${item.size}
          × ${item.qty || 1}
        </li>
      `
      )
      .join("");

    const data = await resend.emails.send({
      from: "ALEA Winkel <onboarding@resend.dev>",
      to: email,
      subject: "Complete Your Payment - ALEA Winkel",

      html: `
        <h2>Hello ${fullName},</h2>

        <p>
          Thank you for shopping at ALEA Winkel.
        </p>

        <p>
          Your order has been created and is waiting for payment.
        </p>

        <h3>Order Summary</h3>

        <ul>
          ${itemsHtml}
        </ul>

        <p>
          <strong>
            Total:
            Rp${Number(total).toLocaleString("id-ID")}
          </strong>
        </p>

        <p>
          Please complete your payment to proceed with your order.
        </p>

        <p>
          Once payment is confirmed, you will receive another email confirming your order.
        </p>

        <br />

        <p>
          ALEA Winkel
        </p>
      `,
    });

    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}