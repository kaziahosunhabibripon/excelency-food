"use client";

import Aos from "aos";
import React, { useEffect } from "react";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const items = [
  {
    id: 1,
    name: { en: "Pepperoni Pizza", ar: "بيتزا ببروني" },
    image: "/assets/bangladesh.png",
  },
  {
    id: 2,
    name: { en: "Cheese Burger", ar: "برجر الجبن" },
    image: "/assets/chaina.png",
  },
  {
    id: 3,
    name: { en: "Fried Chicken", ar: "دجاج مقلي" },
    image: "/assets/india.png",
  },
  {
    id: 4,
    name: { en: "Vegan Salad", ar: "سلطة نباتية" },
    image: "/assets/italy.png",
  },
  {
    id: 5,
    name: { en: "Sushi Roll", ar: "لفائف السوشي" },
    image: "/assets/arabia.png",
  },
  {
    id: 6,
    name: { en: "Tandoori Platter", ar: "صينية تندوري" },
    image: "/assets/srilanka.png",
  },
  {
    id: 7,
    name: { en: "Tandoori Platter", ar: "صينية تندوري" },
    image: "/assets/uae.png",
  },
  {
    id: 8,
    name: { en: "Tandoori Platter", ar: "صينية تندوري" },
    image: "/assets/pakistan.png",
  },
];

export default function Brand() {
  const locale = useLocale();
  const t = useTranslations();

  const lang = locale === "ar" ? "ar" : "en";

  useEffect(() => {
    Aos.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);

  return (
    <section
      className="py-16 sm:px-6 lg:px-8 bg-gray-50"
      data-aos="fade-up"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <AppTitleHeader
          title={t("brand.title")}
          subtitle={t("brand.subtitle")}
          secondarySubTitle={t("brand.secondarySubTitle")}
        />
        <div className="max-w-8xl md:px-12 lg:px-12 my-16" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative bg-amber-50 flex items-center justify-center space-y-4"
              >
                <Image
                  src={item.image}
                  alt={item.name[lang]}
                  width={800}
                  height={800}
                  className="w-56 border border-gray-500 h-auto object-contain opacity-80 transform transition duration-300 ease-in-out hover:opacity-100 hover:-translate-y-2 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
