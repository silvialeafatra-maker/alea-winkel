"use client";

export default function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="mt-10 px-6 py-2 border border-black text-black text-sm hover:bg-black hover:text-white transition"
    >
      Back to Top
    </button>
  );
}