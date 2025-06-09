"use client";
import { productsData } from "@/data/ProductData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import TopSellCard from "../SingleFood/TopSellCard";

import DealCount from "../DealCounter/DealCounter";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { useLocale, useTranslations } from "next-intl";

export default function HurryUpDeals() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();
  const offerEndTime = new Date();
  offerEndTime.setDate(offerEndTime.getDate() + 255);
  offerEndTime.setHours(offerEndTime.getHours() + 10);
  offerEndTime.setMinutes(offerEndTime.getMinutes() + 50);
  offerEndTime.setSeconds(offerEndTime.getSeconds() + 10);

  return (
    <main
      className="container mx-auto px-4 py-8 w-full"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <AppTitleHeader
        title={t("hurryUp.title")}
        subtitle={t("hurryUp.subtitle")}
        secondarySubTitle={t("hurryUp.secondarySubTitle")}
      />
      <div className="flex items-center justify-between border-b border-gray-300 mb-8">
        <h1 className="text-3xl font-bold text-gray-500 mb-2">
          {t("hurryUp.dialog")}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-col py-2">
            <DealCount endDate={offerEndTime} />
          </div>
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
