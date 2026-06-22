"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [statusFilter, setStatusFilter] =
  useState("All");
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

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

async function logout() {
  await fetch(
    "/api/admin-logout",
    {
      method: "POST",
    }
  );

  window.location.href =
    "/admin/login";
}

const filteredOrders = orders.filter(
  (order) => {

    const matchesSearch =
      !search ||
      order.order_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.phone
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  }
);

  return (
    <main className="min-h-screen p-8 bg-white">

      <div className="flex items-center justify-between mb-8">

  <h1 className="text-4xl font-bold">
    ALEA Winkel Orders
  </h1>

  <button
    onClick={logout}
    className="
      px-4
      py-2
      border
      border-zinc-300
      rounded-xl
      hover:bg-zinc-100
      transition
    "
  >
    Logout
  </button>

</div>
    <div className="mb-6">

  <input
    type="text"
    placeholder="Search order, customer, phone..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="
      w-full
      md:w-96
      border
      border-zinc-300
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-black
    "
  />

</div>
 <div className="flex gap-2 flex-wrap mb-6">

  {[
    "All",
    "Pending",
    "Paid",
    "Shipped",
    "Completed",
  ].map((status) => (

    <button
      key={status}
      onClick={() =>
        setStatusFilter(status)
      }
      className={`
        px-4
        py-2
        rounded-xl
        border
        transition-all
        ${
          statusFilter === status
            ? "bg-black text-white"
            : "bg-white"
        }
      `}
    >
      {status}
    </button>

  ))}

</div>
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

            {filteredOrders.map((order) => (
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