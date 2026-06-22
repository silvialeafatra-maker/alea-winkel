import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const {
  orderNumber,    
  email,
  fullName,
  phone,
  address,
  destination,
  total,
  shippingCost,
  payment,
  items,
} = await req.json();

const { error } = await supabase
  .from("orders")
  .insert([
    {
      order_number: orderNumber,
      full_name: fullName,
      phone,
      email,
      address,
      destination,
      payment_method: payment,
      total,
      shipping_cost: shippingCost,
      status: "Pending",
      items,
    },
  ]);

if (error) {
  console.error(error);
  throw new Error(error.message);
}
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
      to: [email, "aleawinkel@gmail.com"],
      subject: "Complete Your Payment",

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
  padding:25px 30px;
  text-align:center;
  border-bottom:1px solid #e5e5e5;
">

  <img
  src="https://alea-winkel.vercel.app/AleaLogoBlack1.png"
  width="100"
  alt="ALEA Winkel"
  style="
    display:block;
    margin:0 auto;
  "
/>

<h1 style="
  margin:2px 0 0 0;
  font-size:22px;
  font-weight:700;
  line-height:1;
  color:#000;
">
  ALEA Winkel
</h1>

<p style="
  margin:4px 0 0 0;
  color:#888;
  font-size:10px;
  letter-spacing:4px;
  text-transform:uppercase;
">
  Premium Fashion Store
</p>

</div>

    <div style="padding:30px;">

      <h2 style="
  margin-top:0;
  font-size:32px;
  font-weight:700;
">
  Complete Your Payment
</h2>

     <p style="
  color:#666;
  font-size:14px;
">
  Order Number:
  <strong>${orderNumber}</strong>
</p>
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
    Customer Information
  </h3>

  <p>
    <strong>Name:</strong><br>
    ${fullName}
  </p>

  <p>
    <strong>WhatsApp:</strong><br>
    ${phone}
  </p>

  <p>
    <strong>Email:</strong><br>
    ${email}
  </p>

  <p>
    <strong>Shipping Address:</strong><br>
    ${address}
  </p>

  <p>
    <strong>City / District:</strong><br>
    ${destination}
  </p>

  <p>
    <strong>Payment Method:</strong><br>
    ${payment === "bank" ? "Bank Transfer" : "Crypto Payment"}
  </p>

</div>
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

        <p>
  Shipping:
  Rp${Number(shippingCost).toLocaleString("id-ID")}
</p>

<p style="
  font-size:20px;
  font-weight:bold;
  margin-top:20px;
">
  Grand Total:
  Rp${Number(total).toLocaleString("id-ID")}
</p>

       </div>

        <p>
         Your order has been successfully created.
      </p>

       <p>
       Once payment has been confirmed, our team will begin processing and preparing your order for shipment.
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