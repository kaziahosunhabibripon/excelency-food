/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
"use client";
import { productsData } from "@/data/ProductData";
import ProductCard from "../SingleFood/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { useTranslations } from "next-intl";

export default function MostPopular() {
  const t = useTranslations();
  return (
    <main className="container mx-auto px-4 py-8 w-full">
      <AppTitleHeader
        title={t("popular.title")}
        subtitle={t("popular.subtitle")}
        secondarySubTitle={t("popular.secondarySubTitle")}
      />

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
        {productsData?.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard data={product} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
