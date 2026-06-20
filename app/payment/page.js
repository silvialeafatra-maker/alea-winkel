"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function PaymentContent() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const total = searchParams.get("total") || 0;
  const payment = searchParams.get("payment") || "bank";
  const orderId =
  "AW-" +
  Date.now().toString().slice(-8);
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const destination = searchParams.get("destination") || "";
  const address = searchParams.get("address") || "";
  const items = JSON.parse(
  decodeURIComponent(
    searchParams.get("items") || "[]"
  )
);
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdtPrice, setUsdtPrice] = useState(null);
  useEffect(() => {
  const fetchPrices = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=idr"
      );

      const data = await res.json();

      setBtcPrice(data.bitcoin.idr);
      setUsdtPrice(data.tether.idr);
    } catch (err) {
      console.error(err);
    }
  };

  fetchPrices();
}, []);

const btcAmount =
  btcPrice
    ? Number(total) / btcPrice
    : 0;

const usdtAmount =
  usdtPrice
    ? Number(total) / usdtPrice
    : 0;

  const [copied, setCopied] = useState(false);
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [copiedBtc, setCopiedBtc] = useState(false);
  const whatsappMessage = encodeURIComponent(`
🛒 PAYMENT CONFIRMATION

Order ID:
${orderId}

Name:
${name}

WhatsApp:
${phone}

Destination:
${destination}

Address:
${address}

Items:

${items


  .map(
    (item) =>
      `• ${item.name}
Size ${item.size}
Qty ${item.qty || 1}`
  )
  .join("\n\n")}

Payment Method:
${payment === "bank" ? "Bank Transfer" : "Crypto"}

Total:
Rp${Number(total).toLocaleString("id-ID")}

I have completed the payment.

Please verify my payment.

Thank you.
`);
 

const copyAccount = () => {
  navigator.clipboard.writeText("3820192132");
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
const copyUsdt = () => {
  navigator.clipboard.writeText(
    "TVtUcfu3yoAVXSeBsyoumMe3L46jiLQMei"
  );

  setCopiedUsdt(true);

  setTimeout(() => {
    setCopiedUsdt(false);
  }, 2000);
};

const copyBtc = () => {
  navigator.clipboard.writeText(
    "bc1q23gzvpv75mmuchnfa3kewlltjr73arcys37z50"
  );

  setCopiedBtc(true);

  setTimeout(() => {
    setCopiedBtc(false);
  }, 2000);
};

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-2xl mx-auto">

      <h1 className="text-4xl font-semibold mb-2">
        Payment Instructions
      </h1>

      <p className="text-zinc-500 mb-8">
        Complete your payment to proceed with your order.
      </p>

      <div className="border rounded-3xl p-6">

        <div className="flex justify-between mb-4">
          <span>Total Payment</span>

        <div className="bg-zinc-50 border rounded-2xl p-4 mb-6">
           <p className="text-sm text-zinc-500">
               Order ID
              </p>

                <p className="font-bold text-lg">
                 {orderId}
             </p>
        </div>

          <span className="font-bold text-xl">
            Rp{Number(total).toLocaleString("id-ID")}
          </span>
        </div>

        {payment === "bank" ? (
          <>
            <h2 className="font-medium mb-4">
              Bank Transfer
            </h2>

            <p>BCA</p>

            <div className="flex items-center justify-between mt-2">
              <p className="font-bold text-2xl">
                3820192132
              </p>

              <button
             onClick={copyAccount}
             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              copied
               ? "bg-green-600 text-white scale-105"
              : "bg-black text-white hover:bg-zinc-800"
               }`}
             >
             {copied ? "Copied ✓" : "Copy"}
             </button>
            
            </div>
            <p className="mt-3">
              Muhammad Dani Alfariza
            </p>
          </>
        ) : (
          <>
          
  <h2 className="font-medium mb-4">
    Crypto Payment
  </h2>

  <div className="bg-zinc-50 p-4 rounded-2xl">

    <p className="text-sm text-zinc-500">
      USDT (TRC20)
    </p>

    <p className="text-xl font-bold mt-1">
      {usdtAmount.toFixed(2)} USDT
    </p>

    <p className="text-sm text-zinc-500 mt-2">
      Rate: Rp
      {usdtPrice?.toLocaleString("id-ID")}
    </p>

    <div className="flex items-start gap-3 mt-4">
  <p className="break-all font-mono flex-1">
    TVtUcfu3yoAVXSeBsyoumMe3L46jiLQMei
  </p>

  <button
    onClick={copyUsdt}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      copiedUsdt
        ? "bg-green-600 text-white"
        : "bg-black text-white hover:bg-zinc-800"
    }`}
  >
    {copiedUsdt ? "Copied ✓" : "Copy"}
  </button>
</div>

  </div>

  <div className="bg-zinc-50 p-4 rounded-2xl mt-4">

    <p className="text-sm text-zinc-500">
      Bitcoin (BTC)
    </p>

    <p className="text-xl font-bold mt-1">
      {btcAmount.toFixed(8)} BTC
    </p>

    <p className="text-sm text-zinc-500 mt-2">
      Rate: Rp
      {btcPrice?.toLocaleString("id-ID")}
    </p>

    <div className="flex items-start gap-3 mt-4">
  <p className="break-all font-mono flex-1">
    bc1q23gzvpv75mmuchnfa3kewlltjr73arcys37z50
  </p>

  <button
    onClick={copyBtc}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      copiedBtc
        ? "bg-green-600 text-white"
        : "bg-black text-white hover:bg-zinc-800"
    }`}
  >
    {copiedBtc ? "Copied ✓" : "Copy"}
  </button>
</div>

  </div>
</>
        )}
      </div>

      <button
  onClick={() => {
    localStorage.removeItem("cart");

    window.open(
      `https://wa.me/6287892550636?text=${whatsappMessage}`,
      "_blank"
    );

    router.push("/thank-you");
  }}
  className="mt-8 w-full inline-flex items-center justify-center px-5 py-4 rounded-2xl bg-black text-white hover:bg-zinc-800 transition"
>
  Confirm Payment
</button>

    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentContent />
    </Suspense>
  );
}