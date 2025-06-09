"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Star } from "react-feather";

const TopSellCard = ({
  product,
  index,
}: {
  product: {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    image?: string;
  };
  index: number;
}) => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      key={index}
      className="flex flex-col relative group group-hover:shadow-2xl"
    >
      <Link href={"#"}>
        <div className="group bg-gray-100 rounded-lg mb-3 w-full h-48 relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={800}
            height={800}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            <button className="bg-white p-1.5 rounded-md shadow-md hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
            <button className="bg-white p-1.5 rounded-md shadow-md hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="bg-white p-1.5 rounded-md shadow-md hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-red-500"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <button
            role="button"
            tabIndex={0}
            className="absolute inset-x-0 bottom-0 bg-brand cursor-pointer text-white py-2 text-center text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform"
          >
            {t("hurryUp.cart")}
          </button>
        </div>
      </Link>

      <Link href={"#"}>
        <div
          className={`flex flex-col pb-2 px-2 ${
            lang === "ar" ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <h3 className="text-base font-medium text-gray-800 mb-1">
            {product.title}
          </h3>
          <p className="text-base font-medium text-gray-700 mb-1">
            {product.subtitle}
          </p>
          <p className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 inline-block" />
            ))}
          </p>
          <p className="text-base font-medium text-gray-900">
            {t("hurryUp.currency")} {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TopSellCard;
