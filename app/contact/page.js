export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">

      {/* Header */}
      <div className="text-center mb-16">
        <p className="uppercase tracking-[0.3em] text-gray-500 mb-3">
          Customer Support
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          Need help with your order, sizing, shipping, or anything else?
          Our team is ready to assist you.
        </p>
      </div>

      {/* Customer Care */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">

        <div className="border rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3">📦 Shipping</h3>
          <p className="text-gray-600 text-sm">
            Information about delivery, tracking, and shipping times.
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3">🔄 Returns</h3>
          <p className="text-gray-600 text-sm">
            Need a different size? Contact us for exchange assistance.
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-3">💬 Support</h3>
          <p className="text-gray-600 text-sm">
            Our support team is available to answer your questions.
          </p>
        </div>

      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Customer Service
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Email:</strong><br />
              support@aleawinkel.com
            </p>

            <p>
              <strong>WhatsApp:</strong><br />
              +62 8789-2550-636
            </p>

            <p>
              <strong>Operating Hours:</strong><br />
              Monday - Saturday<br />
              09:00 - 21:00 WIB
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">

            <div>
              <h3 className="font-semibold">
                How long does shipping take?
              </h3>
              <p className="text-gray-600 text-sm">
                Orders are processed within 1-2 business days.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Can I exchange sizes?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes, size exchanges are available subject to stock availability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                What payment methods are accepted?
              </h3>
              <p className="text-gray-600 text-sm">
                We accept various secure payment methods.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="https://wa.me/6287892550636"
          target="_blank"
          className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition"
        >
          Chat via WhatsApp
        </a>
      </div>

    </main>
  );
}