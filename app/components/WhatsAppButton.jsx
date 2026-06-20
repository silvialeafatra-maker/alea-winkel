import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6287892550636"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-5 right-5 z-50
        w-12 h-12
        flex items-center justify-center
        rounded-full bg-black text-white
        shadow-2xl hover:scale-110
        transition-all duration-300
      "
    >
      <FaWhatsapp size={24} />
    </a>
  );
}