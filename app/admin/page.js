"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  setOrders(data || []);
}

async function updateStatus(id, status) {
  const response = await fetch(
    "/api/update-order-status",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    alert(result.error);
    return;
  }

  loadOrders();
}

  return (
    <main className="min-h-screen p-8 bg-white">

      <h1 className="text-4xl font-bold mb-8">
        ALEA Winkel Orders
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-zinc-200">

          <thead className="bg-zinc-100">

            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t"
              >
                <td className="p-3">
                  {order.order_number}
                </td>

                <td className="p-3">
                  {order.full_name}
                </td>

                <td className="p-3">
                  {order.phone}
                </td>

                <td className="p-3">
                  Rp{Number(order.total).toLocaleString("id-ID")}
                </td>

                <td className="p-3">
  <select
    value={order.status}
    onChange={(e) =>
      updateStatus(order.id, e.target.value)
    }
    className="border rounded px-3 py-1"
  >
    <option value="Pending">
      Pending
    </option>

    <option value="Paid">
      Paid
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Completed">
      Completed
    </option>
  </select>
</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}