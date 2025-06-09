"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AppTitleHeaderProps {
  title?: string;
  subtitle?: string;
  secondarySubTitle?: string;
  secondaryTitle?: string;
}

const AppTitleHeader = ({
  title = "",
  subtitle = "",
  secondarySubTitle = "",
  secondaryTitle = "",
}: AppTitleHeaderProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-12">
      {/* Secondary Title */}
      <span className="text-brand font-cursive text-xl md:text-2xl">
        {secondaryTitle}
      </span>

      <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-center">
        {/* Animate title text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap break-words whitespace-normal justify-center"
        >
          {title?.split("").map((letter, index) => (
            <motion.span
              key={`title-${index}`}
              className="text-2xl md:text-4xl font-bold mt-2 mb-4 text-brand"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap break-words whitespace-normal justify-center"
        >
          {subtitle?.split("").map((letter, index) => (
            <motion.span
              key={`subtitle-${index}`}
              className="text-2xl md:text-4xl font-bold mt-2 mb-4 text-slate-800"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.3,
                delay: title.length * 0.05 + index * 0.05,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Secondary Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex flex-wrap break-words whitespace-normal justify-center"
        >
          {secondarySubTitle?.split("").map((letter, index) => (
            <motion.span
              key={`secondary-${index}`}
              className="text-2xl md:text-4xl font-bold mt-2 mb-4 text-brand"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.3,
                delay:
                  title.length * 0.05 + subtitle.length * 0.05 + index * 0.05,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Underline Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex justify-center"
      >
        <svg className="w-16 md:w-24 h-6 text-brand" viewBox="0 0 100 24">
          <path fill="#ecbf4c" d="M0 12 Q 25 0, 50 12 T 100 12" />
        </svg>
      </motion.div>
    </div>
  );
};

export default AppTitleHeader;
