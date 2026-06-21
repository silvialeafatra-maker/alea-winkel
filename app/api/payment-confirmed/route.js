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
      from: "ALEA Winkel <noreply@aleawinkel.store>",
      to: email,
      subject: "Payment Confirmed - ALEA Winkel",

      html: `
<div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px 20px;">

  <div style="
    max-width:600px;
    margin:auto;
    background:#171923;
    border-radius:20px;
    overflow:hidden;
    color:white;
  ">

    <div style="
      text-align:center;
      padding:40px 30px;
      border-bottom:1px solid rgba(255,255,255,0.1);
    ">

      <img
        src="https://aleawinkel.store/AleaLogoBlack.png"
        width="50"
      />

      <h1 style="
        margin:15px 0 5px;
        font-size:36px;
      ">
        ALEA Winkel
      </h1>

      <p style="
        letter-spacing:4px;
        color:#aaa;
      ">
        PREMIUM FASHION STORE
      </p>

    </div>

    <div style="padding:35px;">

      <h2 style="
        color:#4ade80;
        margin-top:0;
      ">
        Payment Confirmed ✓
      </h2>

      <p>
        Hi ${fullName},
      </p>

      <p>
        We have successfully received your payment.
      </p>

      <p>
        Your order is now being prepared by our team.
      </p>

      <div style="
        background:#1f2430;
        border:1px solid rgba(255,255,255,0.08);
        border-radius:12px;
        padding:20px;
        margin:25px 0;
      ">

        <h3 style="margin-top:0;">
          Order Summary
        </h3>

        <ul>
          ${itemsHtml}
        </ul>

        <p style="
          font-size:22px;
          font-weight:bold;
        ">
          Total:
          Rp${Number(total).toLocaleString("id-ID")}
        </p>

      </div>

      <div style="
        background:#0f172a;
        padding:18px;
        border-radius:12px;
      ">
        Estimated processing time:
        <strong>1–2 business days</strong>
      </div>

    </div>

    <div style="
      text-align:center;
      padding:20px;
      border-top:1px solid rgba(255,255,255,0.1);
      color:#999;
      font-size:13px;
    ">
      ALEA Winkel © 2026
    </div>

  </div>

</div>
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