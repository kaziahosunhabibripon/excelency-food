"use client";
import AppButton from "@/helpers/ui/AppButton";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Offer({}) {
  const t = useTranslations();
  return (
    <div className="w-full container mx-auto py-12">
      <div className="relative bg-[#e8e5d865] rounded-lg overflow-hidden p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
        {/* Left content */}
        <div className="z-10 mb-8 md:mb-0 md:w-1/2">
          <p className="text-brand font-semibold text-base mb-2 uppercase">
            {t("offer.type")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            {t("offer.amount")}
            <br className="hidden sm:block" /> {t("offer.items")}
          </h2>
          <AppButton title={t("offer.title")} />
        </div>

        {/* Right content - Headphone images */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-1/2 gap-2">
          <div className="relative h-[180px] md:h-[250px] w-[360px] md:w-[550px]">
            {/* Black headphones */}
            <Image
              src="/assets/food-1.png"
              alt="Black over-ear headphones"
              width={180}
              height={180}
              className="absolute left-0 bottom-0 transform -translate-y-4 object-contain animate-float-item-one"
              priority
            />

            {/* AirPods */}
            <Image
              src="/assets/food-3.png"
              alt="White wireless earbuds with charging case"
              width={180}
              height={180}
              className="absolute left-1/2 top-1/2 animate-float-item-one transform -translate-x-1/2 -translate-y-1/2 object-contain"
              priority
            />

            {/* Blue headphones */}
            <Image
              src="/assets/food-2.png"
              alt="Blue over-ear headphones"
              width={180}
              height={180}
              className="absolute right-0 bottom-0 transform animate-float-item-one -translate-y-4 object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
