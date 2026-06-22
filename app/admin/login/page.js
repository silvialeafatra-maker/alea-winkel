"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
  setError("");

  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  if (!res.ok) {
    setError("Password salah");
    return;
  }

  window.location.href = "/admin";
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm border rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-4">
          Admin Login
        </h1>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  onKeyDown={(e) => {
  if (e.key === "Enter") {
    login();
  }
}}
  className={`
    w-full
    border
    p-3
    rounded
    transition-all
    duration-300
    ${
      error
        ? "border-red-500 ring-2 ring-red-200"
        : "border-zinc-300"
    }
  `}
/>

{error && (
  <div className="mt-3 flex items-center gap-2 text-red-500 text-sm font-medium animate-pulse">
    <span>❌</span>
    <span>{error}</span>
  </div>
)}
    
        <button
          onClick={login}
          className="w-full mt-4 bg-black text-white p-3 rounded"
        >
          Login
        </button>

      </div>
    </main>
  );
}