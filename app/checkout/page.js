"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("bank");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * (item.qty || 1),
    0
  );

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold mb-2">
        Checkout
      </h1>

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

              <p className="text-2xl font-bold">
                3820192132
              </p>
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

                <p className="font-mono break-all">
                  TVtUcfu3yoAVXSeBsyoumMe3L46jiLQMei
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Bitcoin (BTC)
                </p>

                <p className="font-mono break-all">
                  bc1q23gzvpv75mmuchnfa3kewlltjr73arcys37z50
                </p>
              </div>

            </div>
          </>
        )}

      </div>

      {/* TOTAL */}
      <div className="mt-8 border rounded-3xl p-6 bg-zinc-50">
        <div className="text-sm text-zinc-500">
          Total Payment
        </div>

        <div className="text-3xl font-bold">
          Rp{total.toLocaleString("id-ID")}
        </div>
      </div>

    </main>
  );
}