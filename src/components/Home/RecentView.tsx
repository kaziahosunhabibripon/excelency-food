"use client";
import { productsData } from "@/data/ProductData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import TopSellCard from "../SingleFood/TopSellCard";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { useLocale, useTranslations } from "next-intl";

export default function RecentlyView() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();
  return (
    <main
      className="container mx-auto px-4 py-8 w-full"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <AppTitleHeader
        title={t("Recently.title")}
        subtitle={t("Recently.subtitle")}
        secondarySubTitle={t("Recently.secondarySubTitle")}
      />
      <div className="flex items-center justify-between border-b border-gray-300 mb-8">
        <h1 className="text-3xl font-bold text-gray-500 mb-2">
          {t("Recently.dialog")}
        </h1>

        <div className="flex space-x-2" dir={locale === "ar" ? "rtl" : "ltr"}>
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="material-icons">
              {locale === "ar" ? <MdArrowForwardIos /> : <MdArrowBackIosNew />}
            </span>
          </button>
          <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="material-icons">
              {locale === "ar" ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
            </span>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
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
        {productsData?.map((product, index) => {
          const isArabic = locale === "ar";

          const localizedProduct = {
            ...product,
            title: isArabic ? product.titleAr : product.title,
            subtitle: isArabic ? product.subtitleAr : product.subtitle,
            features: isArabic ? product.featuresAr : product.features,
          };

          return (
            <SwiperSlide key={index}>
              <TopSellCard product={localizedProduct} index={index} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}
