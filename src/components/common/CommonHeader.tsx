"use client";
import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const CommonHeader = ({
  // from = "",
  title = "",
  subtitle = "",
  secondarySubTitle = "",
  componentTitle = "",
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const breadCrumbTitle = title || "";
  const breadCrumbSubTitle = subtitle || "";

  return (
    <div className="relative h-[31rem] bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center h-[100%]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(17, 17, 17, 0.7) 30%, rgba(17, 17, 17, 0.9) 80%), url("/assets/common-header.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
        }}
      />
      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        <div className="flex items-center justify-center">
          {isClient && (
            <>
              {/* Animate breadCrumbTitle text */}
              <div className="flex">
                {breadCrumbTitle?.split("").map((letter, index) => (
                  <motion.span
                    key={`contact-${index}`}
                    className="text-white text-2xl md:text-7xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Space between words */}
              <div className="w-1 md:w-3"></div>

              {/* Animated breadCrumbSubTitle text */}
              <div className="flex">
                {secondarySubTitle?.split("").map((letter, index) => (
                  <motion.span
                    key={`to-${index}`}
                    className="text-brand text-2xl md:text-7xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: breadCrumbTitle.length * 0.1 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              {/* Space between words */}
              <div className="w-1 md:w-3"></div>

              <div className="flex">
                {breadCrumbSubTitle?.split("").map((letter, index) => (
                  <motion.span
                    key={`us-${index}`}
                    className="text-brand text-2xl md:text-7xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: breadCrumbTitle.length * 0.1 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Breadcrumb */}
        <motion.div
          className="mt-4 md:mt-8 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay:
              (componentTitle?.length + breadCrumbSubTitle?.length) * 0.1 + 0.3,
          }}
        >
          <p className="flex items-center flex-wrap">
            <Link
              href="/"
              className="hover:text-brand text-white text-sm md:text-lg"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {t("companybrand.brandName")}
            </Link>
            <span className="mx-2">{">"}</span>{" "}
            <span className="text-brand font-semibold">{componentTitle}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(CommonHeader);
