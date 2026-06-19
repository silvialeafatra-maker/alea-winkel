"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("bank");
  const [shipping, setShipping] = useState("Jawa Tengah");
  const shippingRates = {
  "Jawa Tengah": 20000,
  "Jawa Barat": 25000,
  "Jabodetabek": 25000,
  "Jawa Timur": 25000,
  "Sumatra": 35000,
  "Kalimantan": 45000,
  "Sulawesi": 55000,
  "Bali & Nusa Tenggara": 55000,
  "Maluku & Papua": 75000,
};


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * (item.qty || 1),
    0
  );

  const shippingCost = shippingRates[shipping] || 0;

const grandTotal = total + shippingCost;

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold mb-2">
        Checkout
      </h1>
      <div className="border rounded-3xl p-6 mb-6">

  <h2 className="font-medium mb-4">
    Shipping Destination
  </h2>

  <select
    value={shipping}
    onChange={(e) => setShipping(e.target.value)}
    className="w-full border rounded-xl p-3"
  >
    <option>Jawa Tengah</option>
    <option>Jawa Barat</option>
    <option>Jabodetabek</option>
    <option>Jawa Timur</option>
    <option>Sumatra</option>
    <option>Kalimantan</option>
    <option>Sulawesi</option>
    <option>Bali & Nusa Tenggara</option>
    <option>Maluku & Papua</option>
  </select>

  <p className="mt-4 text-sm text-zinc-500">
    Shipping via J&T Express
  </p>

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

    </main>
  );
}