"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [statusFilter, setStatusFilter] =
  useState("All");
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] =
  useState(null);

  useEffect(() => {
  loadOrders();

  const channel = supabase
    .channel("orders")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
      },
      () => {
        console.log("ORDER UPDATED");
        loadOrders();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  
  async function loadOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("JUMLAH ORDER:", data?.length);

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
    <th className="p-3 text-left">
      Order
    </th>

    <th className="p-3 text-left">
      Customer
    </th>

    <th className="p-3 text-left">
      Phone
    </th>

    <th className="p-3 text-left">
      Total
    </th>

    <th className="p-3 text-left">
      Status
    </th>

    <th className="p-3 text-left">
      Action
    </th>

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

  <span
    className={`
      inline-flex
      items-center
      gap-2
      px-3
      py-1
      rounded-full
      text-sm
      font-medium
      ${
        order.status === "Pending"
          ? "bg-yellow-100 text-yellow-700"
          : order.status === "Paid"
          ? "bg-green-100 text-green-700"
          : order.status === "Shipped"
          ? "bg-blue-100 text-blue-700"
          : "bg-zinc-100 text-zinc-700"
      }
    `}
  >
    <span>
      {order.status === "Pending" && "🟡"}
      {order.status === "Paid" && "🟢"}
      {order.status === "Shipped" && "🔵"}
      {order.status === "Completed" && "⚫"}
    </span>

    {order.status}
  </span>

</td>

<td className="p-3">

  <button
    onClick={() =>
      setSelectedOrder(order)
    }
    className="
      px-3
    py-1
    border
    rounded-lg
      hover:bg-zinc-100
    "
    >
        View
     </button>

     </td>
              </tr>
            ))}

          </tbody>

        </table>

            </div>

      {selectedOrder && (

        <div className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          p-4
          z-50
        ">

          <div className="
  relative
  bg-white
  rounded-2xl
  p-6
  w-full
  max-w-4xl
">
             <button
  onClick={() =>
    setSelectedOrder(null)
  }
  className="
    absolute
    top-4
    right-4
    text-2xl
    text-zinc-500
    hover:text-black
  "
>
  ×
</button>
            <h2 className="text-2xl font-bold mb-6">
  Order Detail
</h2>

<div className="space-y-3 mb-6">

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Order
    </span>
    <span className="mr-2">:</span>
    <div className="flex items-center gap-2">

  <span>
    {selectedOrder.order_number}
  </span>

  <button
    onClick={() =>
      navigator.clipboard.writeText(
        selectedOrder.order_number
      )
    }
    title="Copy Order Number"
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4 text-zinc-500 hover:text-black transition"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 16h8M8 12h8m-8-4h8M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
  />
</svg>
  </button>

</div>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Order Date
    </span>
    <span className="mr-2">:</span>
    <span>
      {new Date(
        selectedOrder.created_at
      ).toLocaleString("id-ID")}
    </span>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Name
    </span>
    <span className="mr-2">:</span>
    <span>
      {selectedOrder.full_name}
    </span>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Email
    </span>
    <span className="mr-2">:</span>
    <div className="flex items-center gap-2">

  <span>
    {selectedOrder.email}
  </span>

  <button
    onClick={() =>
      navigator.clipboard.writeText(
        selectedOrder.email
      )
    }
    title="Copy Email"
  >
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4 text-zinc-500 hover:text-black transition"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 16h8M8 12h8m-8-4h8M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
  />
</svg>
  </button>

</div>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Phone
    </span>
    <span className="mr-2">:</span>
    <span>
      {selectedOrder.phone}
    </span>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Address
    </span>
    <span className="mr-2">:</span>
    <span>
      {selectedOrder.address}
    </span>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      City
    </span>
    <span className="mr-2">:</span>
    <span>
      {selectedOrder.destination}
    </span>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Payment
    </span>
    <span className="mr-2">:</span>
    <span>
      {selectedOrder.payment_method}
    </span>
  </div>

  <div className="flex">
    <span className="w-36 font-semibold shrink-0">
      Status
    </span>
    <div className="mt-3">

</div>
    <span className="mr-2">:</span>

    <select
  value={selectedOrder.status}
  onChange={(e) =>
    updateStatus(
      selectedOrder.id,
      e.target.value
    )
  }
  className={`
    border
    rounded-xl
    px-4
    py-2
    font-medium
    ${
      selectedOrder.status === "Pending"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : selectedOrder.status === "Paid"
        ? "bg-green-50 text-green-700 border-green-200"
        : selectedOrder.status === "Shipped"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-zinc-50 text-zinc-700 border-zinc-200"
    }
  `}
>
  <option value="Pending">
    🟡 Pending
  </option>

  <option value="Paid">
    🟢 Paid
  </option>

  <option value="Shipped">
    🔵 Shipped
  </option>

  <option value="Completed">
    ⚫ Completed
  </option>
</select>

  </div>

</div>

<hr className="my-4" />

<h3 className="font-bold text-lg mb-3">
  Products
</h3>


{selectedOrder.items?.map(
  (item, index) => (
    <div
      key={index}
      className="
        border
        rounded-xl
        p-4
        mb-3
        flex
        gap-4
        items-center
      "
    >

      <img
        src={item.image}
        alt={item.name}
        className="
          w-20
          h-20
          object-cover
          rounded-lg
          border
        "
      />

      <div className="flex-1">

        <p className="font-semibold">
          {item.name}
        </p>

        <p className="text-sm text-zinc-600">
          Size: {item.size}
        </p>

        <p className="text-sm text-zinc-600">
          Qty: {item.qty}
        </p>

        <p className="font-semibold mt-2">
          Subtotal:
          {" "}
          Rp
          {Number(
            item.price * item.qty
          ).toLocaleString("id-ID")}
        </p>

      </div>

    </div>
  )
)}

<hr className="my-4" />

<p>
  <strong>Shipping:</strong>{" "}
  Rp
  {Number(
    selectedOrder.shipping_cost || 0
  ).toLocaleString("id-ID")}
</p>

<p className="text-2xl font-bold">
  Grand Total:
  {" "}
  Rp
  {Number(
    selectedOrder.total
  ).toLocaleString("id-ID")}
</p>

<div className="flex justify-end mt-6">
<a
  href={`https://wa.me/${selectedOrder.phone}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
  inline-flex
  items-center
  gap-2
  px-5
  py-3
  bg-green-600
  text-white
  rounded-xl
  shadow-sm
  hover:bg-green-700
  hover:shadow-md
  transition-all
"
>
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 32 32"
  className="w-5 h-5"
  fill="currentColor"
>
  <path d="M16 3C8.8 3 3 8.6 3 15.5c0 2.7.9 5.2 2.4 7.2L3.4 29l6.5-1.9c1.9 1 4 1.6 6.1 1.6 7.2 0 13-5.6 13-12.5S23.2 3 16 3zm0 22.7c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.9 1.1 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.7-1.8-5.8 0-5.5 4.7-10 10.5-10s10.5 4.5 10.5 10-4.7 10.5-10.4 10.5z"/>
</svg> WhatsApp Customer
</a>
</div>
          </div>

        </div>

      )}

    </main>
  );
}