"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentContent() {
  const searchParams = useSearchParams();

  const total = searchParams.get("total") || 0;
  const payment = searchParams.get("payment") || "bank";

  const whatsappMessage = encodeURIComponent(`
Hello Alea Winkel,

I have completed the payment.

Payment Method:
${payment === "bank" ? "Bank Transfer" : "Crypto Payment"}

Total:
Rp${Number(total).toLocaleString("id-ID")}

Please verify my payment.

Thank you.
`);

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
                onClick={() =>
                  navigator.clipboard.writeText("3820192132")
                }
                className="px-3 py-2 border rounded-lg"
              >
                Copy
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

            <p>USDT (TRC20)</p>

            <p className="break-all font-mono">
              TVtUcfu3yoAVXSeBsyoumMe3L46jiLQMei
            </p>
          </>
        )}
      </div>

      <a
        href={`https://wa.me/6287892550636?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 w-full inline-flex items-center justify-center px-5 py-4 rounded-2xl bg-black text-white hover:bg-zinc-800 transition"
      >
        Confirm Payment
      </a>

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