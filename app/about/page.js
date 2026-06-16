import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-white py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">

        <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
          Our Story
        </p>

        <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-8">
          ABOUT ALEA
        </h1>

        <div className="w-20 h-[1px] bg-black mx-auto mb-10" />

        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          Alea adalah brand fashion modern yang berfokus pada kualitas,
          kenyamanan, dan desain minimalis. Kami percaya bahwa jeans bukan
          hanya pakaian, tetapi bagian dari identitas dan gaya hidup
          sehari-hari.
        </p>

        <p className="text-gray-600 leading-relaxed text-base md:text-lg mt-6">
          Setiap produk Alea dibuat untuk memberikan tampilan yang sederhana,
          premium, dan nyaman digunakan dalam berbagai aktivitas.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">

          <Link
            href="/shop"
            className="px-8 py-3 bg-black text-white rounded-full hover:opacity-80 transition"
          >
            Shop Collection
          </Link>

          <Link
            href="/"
            className="px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition"
          >
            Back Home
          </Link>

        </div>

      </div>
    </section>
  );
}