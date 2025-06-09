"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { useLocale, useTranslations } from "next-intl";

const cards = [
  {
    tag: { en: "TOP PICK", ar: "الأكثر اختياراً" },
    title: { en: "DELICIOUS PIZZA", ar: "بيتزا لذيذة" },
    buttonColor: "bg-red-600 hover:bg-red-700",
    image: "/assets/offerThumb.png",
    sell: "90%",
  },
  {
    tag: { en: "STAFF FAVORITE", ar: "المفضل لدى الموظفين" },
    title: { en: "HOT CHEESE BURGER", ar: "برجر الجبن الحار" },
    buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    image: "/assets/offerThumb2.png",
    sell: "90%",
  },
  {
    tag: { en: "LIMITED OFFER", ar: "عرض محدود" },
    title: { en: "CRISPY FRIED WINGS", ar: "أجنحة مقلية مقرمشة" },
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    image: "/assets/offerThumb.png",
    sell: "90%",
  },
  {
    tag: { en: "NEW ARRIVAL", ar: "وصول جديد" },
    title: { en: "SPICY TANDOORI", ar: "تاندوري حار" },
    buttonColor: "bg-pink-600 hover:bg-pink-700",
    image: "/assets/offerThumb2.png",
    sell: "90%",
  },
  {
    tag: { en: "EXCLUSIVE", ar: "حصري" },
    title: { en: "VEGAN DELIGHT BOWL", ar: "وعاء البهجة النباتي" },
    buttonColor: "bg-green-600 hover:bg-green-700",
    image: "/assets/offerThumb.png",
    sell: "90%",
  },
  {
    tag: { en: "CHEF'S SPECIAL", ar: "خاص الشيف" },
    title: { en: "GARLIC NAAN COMBO", ar: "كومبو نان بالثوم" },
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    image: "/assets/offerThumb2.png",
    sell: "90%",
  },
];

export default function PopularFood() {
  const t = useTranslations();
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);

  return (
    <div className="w-full  py-16" data-aos="fade-up">
      <AppTitleHeader
        title={t("popularFood.title")}
        subtitle={t("popularFood.subtitle")}
        secondarySubTitle={t("popularFood.secondarySubTitle")}
      />

      <div className="relative  container mx-auto px-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden rounded-lg bg-slate-600">
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#2b1810] to-transparent" />
                <div
                  className={`relative p-8 min-h-[300px] ${
                    lang === "ar" ? "rtl-flip" : ""
                  }`}
                >
                  <div
                    className={`space-y-4 ${lang === "ar" ? "rtl-flip" : ""}`}
                  >
                    <span className="text-red-500 font-medium">
                      {card.tag[lang]}
                    </span>
                    <h2 className="text-3xl font-bold text-white leading-tight">
                      {card.title[lang]}
                    </h2>
                    <p className="text-orange-500">{t("popularFood.try")}</p>
                    <button
                      className={`${card.buttonColor} text-white px-8 py-3 rounded flex items-center gap-2 mt-4 transition-colors`}
                    >
                      {t("offer.title")}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="relative w-32 h-32 animate-float-item-one">
                      <Image
                        src={card.image}
                        alt="Food"
                        fill
                        className={`object-contain ${
                          lang === "ar" ? "rtl-flip" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-400  text-black font-bold px-4 py-2 rounded-full transform rotate-12">
                      {card.sell}
                      <span className="lowercase">
                        {t("popularFood.subtitle")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons below the swiper */}
        <div className="flex justify-center gap-6 mt-8">
          <span className="custom-prev bg-brand cursor-pointer text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition">
            {lang === "ar" ? <FaChevronRight /> : <FaChevronLeft />}
          </span>

          <span className="custom-next bg-brand cursor-pointer text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition">
            {lang === "ar" ? <FaChevronLeft /> : <FaChevronRight />}
          </span>
        </div>
      </div>
      <style jsx>{`
        .rtl-flip {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}
