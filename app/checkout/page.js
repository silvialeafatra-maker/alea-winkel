"use client";

import { useEffect, useState, useRef } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("bank");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const debounceRef = useRef(null);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * (item.qty || 1),
    0
  );

  const totalQty = cart.reduce(
  (acc, item) => acc + (item.qty || 1),
  0
);

const totalWeight = totalQty * 500;

const searchDestination = (keyword) => {
  setDestination(keyword);
  setDestinationId(null);
  setShippingCost(0);

  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  if (keyword.length < 3) {
    setSearchResults([]);
    return;
  }

  debounceRef.current = setTimeout(async () => {
    try {
      const res = await fetch(
        `/api/search-destination?q=${keyword}`
      );

      const data = await res.json();

      setSearchResults(data.data || []);
    } catch (error) {
      console.error(error);
    }
  }, 800);
};

const calculateShipping = async (destinationId) => {
  setLoadingShipping(true);

  try {
    const res = await fetch("/api/calculate-cost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: destinationId,
        weight: totalWeight,
      }),
    });

    const data = await res.json();

    if (data.data?.length) {
      setShippingCost(data.data[0].cost);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingShipping(false);
  }
};
const grandTotal = total + shippingCost;
const whatsappMessage = encodeURIComponent(

  `🛒 ALEA WINKEL ORDER

👤 Name:
${fullName}

📱 WhatsApp:
${phone}

Email:
${email || "-"}

📍 Address:
${address}

🚚 Shipping Address:
${destination}

📦 Items:

${cart
  .map(
    (item) =>
      `• ${item.name}
  Size ${item.size} × ${item.qty || 1}`
  )
  .join("\n\n")}

💰 Product Total:
Rp${total.toLocaleString("id-ID")}

🚛 Shipping Cost:
Rp${shippingCost.toLocaleString("id-ID")}

✅ Grand Total:
Rp${grandTotal.toLocaleString("id-ID")}

💳 Payment Method:
${payment === "bank" ? "Bank Transfer" : "Crypto Payment"}
`
);

const isFormValid =
  fullName.trim() &&
  phone.trim() &&
  email.trim() &&
  address.trim() &&
  destinationId &&
  shippingCost > 0;

  const copyText = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied!");
};
const handleContinuePayment = async () => {
  try {
    const orderNumber = `AW-${Date.now()}`;
    
    const response = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber: `AW-${Date.now()}`,
        email,
        fullName,
        phone,
        address,
        destination,
        total: grandTotal,
        shippingCost,
        payment,
        items: cart,
}),
    });

    const result = await response.json();

    console.log("EMAIL RESULT:", result);

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    window.location.href =
  `/payment?orderNumber=${orderNumber}` +
  `&total=${grandTotal}` +
  `&payment=${payment}` +
  `&name=${encodeURIComponent(fullName)}` +
  `&phone=${encodeURIComponent(phone)}` +
  `&destination=${encodeURIComponent(destination)}` +
  `&address=${encodeURIComponent(address)}` +
  `&items=${encodeURIComponent(JSON.stringify(cart))}`;

  } catch (error) {
    console.error(error);
    alert("Failed to send confirmation email.");
  }
};

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold mb-2">
        Checkout
      </h1>
      <div className="border rounded-3xl p-6 mt-6 mb-6">

  <h2 className="font-medium mb-4">
    Customer Information
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Full Name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full border rounded-xl p-3"
    />

    <input
      type="text"
      placeholder="WhatsApp Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full border rounded-xl p-3"
    />

   <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border rounded-xl p-3"
  required
/>

  </div>

</div>
      <div className="border rounded-3xl p-6 mb-6">

  <h2 className="font-medium mb-4">
  City & District
</h2>
<input
  type="text"
  placeholder="Search your city or district"
  value={destination}
  onChange={(e) =>
    searchDestination(e.target.value)
  }
  className="w-full border rounded-xl p-3"
/>
{loadingShipping && (
  <p className="text-sm text-zinc-500 mt-2">
    Calculating shipping cost...
  </p>
)}

{searchResults.length > 0 && (
  <div className="border rounded-xl mt-2 max-h-60 overflow-y-auto">
    {searchResults.map((item) => (
      <button
        key={item.id}
        type="button"
        onClick={() => {
  setDestination(item.label);
  setDestinationId(item.id);
  setSearchResults([]);
  calculateShipping(item.id);
}}
        className="w-full text-left p-3 hover:bg-zinc-100 border-b"
      >
        {item.label}
      </button>
    ))}
  </div>
)}

</div>

<div className="border rounded-3xl p-6 mb-6">
  <h2 className="font-medium mb-4">
    Address Details
  </h2>

  <textarea
    placeholder="Street address, house number, RT/RW, landmark"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    rows={4}
    className="w-full border rounded-xl p-3"
  />

</div>
      <p className="text-zinc-500 mb-8">
        Choose your preferred payment method.
      </p>

      {/* PAYMENT METHOD */}
      <div className="border rounded-3xl p-6">
        <h2 className="font-medium mb-4">
          Payment Method
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
            <input
              type="radio"
              checked={payment === "bank"}
              onChange={() => setPayment("bank")}
            />
            Bank Transfer
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
            <input
              type="radio"
              checked={payment === "crypto"}
              onChange={() => setPayment("crypto")}
            />
            Crypto Payment
          </label>
        </div>
      </div>

      {/* PAYMENT DETAIL */}
      <div className="mt-6 border rounded-3xl p-6">

        {payment === "bank" && (
          <>
            <h3 className="font-semibold text-lg mb-4">
              Bank Transfer
            </h3>

            <div className="bg-zinc-50 p-4 rounded-2xl">
              <p className="text-sm text-zinc-500">
                Bank
              </p>

              <p className="font-medium">
                BCA
              </p>

              <p className="text-sm text-zinc-500 mt-3">
                Account Name
              </p>

              <p className="font-medium">
                Muhammad Dani Alfariza
              </p>

              <p className="text-sm text-zinc-500 mt-3">
                Account Number
              </p>

              <div className="flex items-center justify-between mt-2">

             <p className="text-2xl font-bold">
               3820192132
            </p>

            <button
            onClick={() => copyText("3820192132")}
            className="px-3 py-2 text-sm border rounded-lg hover:bg-black hover:text-white transition"
            >
             Copy
            </button>

         </div>
            </div>
          </>
        )}

        {payment === "crypto" && (
          <>
            <h3 className="font-semibold text-lg mb-4">
              Crypto Payment
            </h3>

            <div className="bg-zinc-50 p-4 rounded-2xl space-y-4">

              <div>
                <p className="text-sm text-zinc-500">
                  USDT (TRC20)
                </p>

                <div className="flex items-start gap-3">

             <p className="font-mono break-all flex-1">
                 TVtUcfu3yoAVXSeBsyoumMe3L46jiLQMei
             </p>

             <button
             onClick={() =>
             copyText("TVtUcfu3yoAVXSeBsyoumMe3L46jiLQMei")
             }
               className="px-3 py-2 text-sm border rounded-lg hover:bg-black hover:text-white transition"
             >
              Copy
             </button>

             </div>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Bitcoin (BTC)
                </p>

                <div className="flex items-start gap-3">

             <p className="font-mono break-all flex-1">
                bc1q23gzvpv75mmuchnfa3kewlltjr73arcys37z50
             </p>

             <button
              onClick={() =>
               copyText("bc1q23gzvpv75mmuchnfa3kewlltjr73arcys37z50")
           }
             className="px-3 py-2 text-sm border rounded-lg hover:bg-black hover:text-white transition"
            >
              Copy
             </button>

             </div>
              </div>

            </div>
          </>
        )}

      </div>

      {/* TOTAL */}
<div className="mt-8 border rounded-3xl p-6 bg-zinc-50">

  <div className="flex justify-between mb-2">
    <span>Products</span>
    <span>
      Rp{total.toLocaleString("id-ID")}
    </span>
  </div>
  <div className="flex justify-between mb-2">
    <span>Shipping</span>
    <span>
      Rp{shippingCost.toLocaleString("id-ID")}
    </span>
  </div>

  <hr className="my-4" />

  <div className="flex justify-between text-xl font-bold">
    <span>Total</span>
    <span>
      Rp{grandTotal.toLocaleString("id-ID")}
    </span>
  </div>

</div>

<button
  onClick={handleContinuePayment}
  className={`mt-6 w-full inline-flex items-center justify-center px-5 py-4 rounded-2xl font-medium transition ${
    isFormValid
      ? "bg-black text-white hover:bg-zinc-800"
      : "bg-zinc-300 text-zinc-500 pointer-events-none"
  }`}
>
  Continue to Payment
</button>

</main>
  );
}