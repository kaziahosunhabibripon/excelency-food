"use client";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { MdOutlineResetTv } from "react-icons/md";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface CategoryProps {
  id: number;
  name: string;
  productCount: number;
  imageSrc: string;
  href: string;
  categoryType: string;
  nameAr: string;
  categoryTypeAr: string;
}

const categories: CategoryProps[] = [
  {
    id: 1,
    name: "Aloo Bharta",
    nameAr: "ألو بهرتا",
    productCount: 34,
    imageSrc: "/assets/food-11.jpg",
    href: "/categories/cases",
    categoryType: "Bangladeshi",
    categoryTypeAr: "بنغالي",
  },
  {
    id: 2,
    name: "Tomato Bharta",
    nameAr: "طماطم بهرتا",
    productCount: 15,
    imageSrc: "/assets/food-12.jpg",
    href: "/",
    categoryType: "Bangladeshi",
    categoryTypeAr: "بنغالي",
  },
  {
    id: 3,
    name: "Dal Bharta",
    nameAr: "دال بهرتا",
    productCount: 18,
    imageSrc: "/assets/food-13.jpg",
    href: "/",
    categoryType: "Pakistani",
    categoryTypeAr: "باكستاني",
  },
  {
    id: 4,
    name: "Baingan Bharta",
    nameAr: "باذنجان بهرتا",
    productCount: 12,
    imageSrc: "/assets/food-14.jpg",
    href: "/categories/charger",
    categoryType: "Indian",
    categoryTypeAr: "هندي",
  },
  {
    id: 5,
    name: "Hilsha Fish",
    nameAr: "سمك إيلشا",
    productCount: 38,
    imageSrc: "/assets/food-15.jpg",
    href: "/",
    categoryType: "Bangladeshi",
    categoryTypeAr: "بنغالي",
  },
  {
    id: 6,
    name: "Dal Chana",
    nameAr: "دال تشانا",
    productCount: 18,
    imageSrc: "/assets/food-16.jpg",
    href: "/",
    categoryType: "Indian",
    categoryTypeAr: "هندي",
  },
  {
    id: 7,
    name: "Katla Fish",
    nameAr: "سمك كاتلا",
    productCount: 13,
    imageSrc: "/assets/food-17.jpg",
    href: "/",
    categoryType: "Bangladeshi",
    categoryTypeAr: "بنغالي",
  },
];

export default function TopSelling() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredCategories = activeFilter
    ? categories.filter((cat) => cat.categoryType === activeFilter)
    : categories;

  const filterOptions = [
    t("filterOptions.cat1"), // Bangladeshi → بنغلاديشي
    t("filterOptions.cat2"), // Indian → هندي
    t("filterOptions.cat3"), // Arabian → عربي
    t("filterOptions.cat4"), // Pakistani → باكستاني
  ];

  return (
    <div
      className="w-full py-12 px-4 md:px-6 container mx-auto"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <AppTitleHeader
        title={t("Topselling.title")}
        subtitle={t("Topselling.subtitle")}
        secondarySubTitle={t("Topselling.secondarySubTitle")}
      />

      <div className="flex items-center justify-between border-b border-gray-300 mb-8">
        <h1 className="text-3xl font-bold text-gray-500 mb-2">
          {t("Topselling.dialog")}
        </h1>

        <div className="flex flex-col">
          <ul className="flex space-x-4">
            {filterOptions.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`cursor-pointer text-lg transition duration-200 ${
                  activeFilter === type
                    ? "text-gray-800 font-semibold border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="text-gray-800 cursor-progress font-semibold ml-4 hover:border-b-2 hover:border-blue-400"
              >
                <span className="flex items-center justify-center gap-1">
                  {t("reset.reset")}{" "}
                  <MdOutlineResetTv className="text-blue-500" />
                </span>
              </button>
            )}
          </ul>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={true}
        grabCursor={true}
        className="foodCard"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          468: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 10 },
        }}
      >
        {filteredCategories.map((category) => (
          <SwiperSlide key={category.name}>
            <Link
              href={category.href}
              className="flex flex-col items-center text-center group hover:bg-gray-100 transition-colors duration-300 ease-in-out p-4 rounded-lg"
            >
              <div className="relative flex w-[400px] h-[200px] items-center justify-center mb-3 overflow-hidden">
                <Image
                  src={category.imageSrc || "/placeholder.svg"}
                  alt={locale === "ar" ? category.nameAr : category.name}
                  width={800}
                  height={800}
                  className="object-cover rounded-lg p-4 transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-[1.3rem] font-medium text-gray-900">
                {locale === "ar" ? category.nameAr : category.name}
              </h3>
              <p className="text-[1rem] text-gray-500">
                {locale === "ar"
                  ? `${category.productCount} منتج`
                  : `${category.productCount} products`}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
