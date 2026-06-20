export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center border rounded-3xl p-8">

        <div className="text-5xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-semibold mb-3">
          Thank You
        </h1>

        <p className="text-zinc-500 mb-6">
          Your payment confirmation has been submitted.
          Our team will verify your order shortly.
        </p>

        <div className="bg-zinc-50 border rounded-2xl p-4 mb-6">
          <p className="text-sm text-zinc-500">
            Order Status
          </p>

          <p className="font-semibold">
            Awaiting Verification
          </p>
        </div>

        <div className="flex flex-col gap-3">

          <a
            href="https://wa.me/6287892550636"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-4 rounded-2xl bg-black text-white hover:bg-zinc-800 transition"
          >
            Chat Admin
          </a>

          <a
            href="/shop"
            className="inline-flex items-center justify-center px-5 py-4 rounded-2xl border hover:bg-zinc-50 transition"
          >
            Continue Shopping
          </a>

        </div>

      </div>
    </main>
  );
}