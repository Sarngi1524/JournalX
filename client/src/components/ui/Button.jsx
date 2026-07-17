import { motion } from "framer-motion";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {

  const styles = {
    primary:
      "bg-pink-400 hover:bg-pink-500 text-white",

    secondary:
      "bg-[#DDE8D5] hover:bg-[#C7D7BD] text-gray-800",

    outline:
      "border border-pink-400 text-pink-500 hover:bg-pink-50",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default Button;