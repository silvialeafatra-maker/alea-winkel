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
<div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px 20px;">

  <div style="
    max-width:600px;
    margin:auto;
    background:white;
    border-radius:20px;
    overflow:hidden;
    border:1px solid #e5e5e5;
  ">

    <div style="
  background:#000;
  padding:30px;
  text-align:center;
">

  <img
    src="https://alea-winkel.vercel.app/AleaLogoWhite.png"
    width="180"
    alt="ALEA Winkel"
    style="display:block;margin:auto;"
  />

  <p style="
    margin-top:12px;
    color:#d4d4d4;
    font-size:14px;
  ">
    Premium Fashion Store
  </p>

</div>

    <div style="padding:30px;">

      <h2 style="margin-top:0;">
        Payment Required
      </h2>

      <p>
        Hi ${fullName},
      </p>

      <p>
        Thank you for shopping at ALEA Winkel.
      </p>

      <div style="
        background:#fafafa;
        border:1px solid #e5e5e5;
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
          font-size:20px;
          font-weight:bold;
          margin-top:20px;
        ">
          Total:
          Rp${Number(total).toLocaleString("id-ID")}
        </p>

      </div>

      <p>
        Your order has been created and is currently waiting for payment.
      </p>

      <p>
        After payment confirmation, your order will be processed immediately.
      </p>

      <div style="text-align:center; margin-top:30px;">

        <a
          href="https://wa.me/6287892550636"
          style="
            background:black;
            color:white;
            text-decoration:none;
            padding:14px 24px;
            border-radius:10px;
            display:inline-block;
          "
        >
          Contact Admin
        </a>

      </div>

    </div>

    <div style="
      border-top:1px solid #e5e5e5;
      padding:20px;
      text-align:center;
      color:#777;
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