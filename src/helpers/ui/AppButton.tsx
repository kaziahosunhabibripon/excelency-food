"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "react-feather";

export default function AppButton({
  title = "",
  subtitle = "",
  customClasses = "bg-brand",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <motion.button
        className={`relative px-8 py-2 overflow-hidden text-white rounded ${customClasses}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="flex items-center justify-center font-medium text-lg"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isHovered ? -30 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {title} <ArrowRight className="w-4 h-4 ms-2" />
        </motion.span>

        <motion.span
          className="absolute inset-0 flex items-center justify-center font-medium text-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {subtitle} <ArrowRight className="w-4 h-4 ms-2" />
        </motion.span>
      </motion.button>
    </div>
  );
}
