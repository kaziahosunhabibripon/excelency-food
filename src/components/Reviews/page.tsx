"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
const reviewsData = [
  {
    id: 1,
    userName: { en: "Jese Leos", ar: "جيسي ليوس" },
    userImage:
      "https://images.pexels.com/photos/5325105/pexels-photo-5325105.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: { en: "", ar: "" }, // no title in original for id 1
    content: {
      en: [
        "This is my third Invicta Pro Diver. They are just fantastic value for money.The build quality is solid and it performs perfectly for the price.",
      ],
      ar: [
        "هذه هي ثالث ساعة Invicta Pro Diver لدي. إنها قيمة رائعة مقابل المال. جودة التصنيع متينة وتعمل بشكل ممتاز بالنسبة للسعر.",
      ],
    },
    reviewDateText: { en: "March 3, 2017", ar: "3 مارس 2017" },
    stars: 4,
  },
  {
    id: 2,
    userName: { en: "Sophia Smith", ar: "صوفيا سميث" },
    userImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: {
      en: "Exceeded my expectations!",
      ar: "تجاوز توقعاتي!",
    },
    content: {
      en: [
        "I wasn’t sure at first, but this product blew me away with its performance.Would definitely recommend it to my friends and family.",
      ],
      ar: [
        "لم أكن متأكدة في البداية، لكن هذا المنتج فاجأني بأدائه. أنصح به بالتأكيد لأصدقائي وعائلتي.",
      ],
    },
    reviewDateText: { en: "June 15, 2018", ar: "15 يونيو 2018" },
    stars: 5,
  },
  {
    id: 3,
    userName: { en: "Liam Johnson", ar: "ليام جونسون" },
    userImage:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: {
      en: "Good quality for the price",
      ar: "جودة جيدة مقابل السعر",
    },
    content: {
      en: [
        "Decent watch for casual use. It looks stylish and feels comfortable.The waterproofing test passed without any issues.",
      ],
      ar: [
        "ساعة مناسبة للاستخدام اليومي. مظهرها أنيق وشعورها مريح. اجتازت اختبار مقاومة الماء بدون مشاكل.",
      ],
    },
    reviewDateText: { en: "January 10, 2019", ar: "10 يناير 2019" },
    stars: 4,
  },
  {
    id: 4,
    userName: { en: "Emma Williams", ar: "إيما ويليامز" },
    userImage:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: {
      en: "Stylish and affordable",
      ar: "أنيقة وبسعر مناسب",
    },
    content: {
      en: [
        "I love how it looks and works well for daily wear.Definitely a great buy for the price range.",
      ],
      ar: [
        "أحب مظهرها وتعمل جيدًا للارتداء اليومي. بالتأكيد شراء رائع بالنسبة للسعر.",
      ],
    },
    reviewDateText: { en: "November 5, 2020", ar: "5 نوفمبر 2020" },
    stars: 5,
  },
  {
    id: 5,
    userName: { en: "Noah Davis", ar: "نوح ديفيس" },
    userImage:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: {
      en: "Could be better",
      ar: "يمكن أن يكون أفضل",
    },
    content: {
      en: [
        "The watch works fine but the strap could be more durable.Still, it’s a solid choice for a budget-friendly watch.",
      ],
      ar: [
        "تعمل الساعة بشكل جيد لكن الحزام يمكن أن يكون أكثر متانة. مع ذلك، إنها خيار جيد لساعه بميزانية محدودة.",
      ],
    },
    reviewDateText: { en: "July 20, 2021", ar: "20 يوليو 2021" },
    stars: 3,
  },
  {
    id: 6,
    userName: { en: "Olivia Brown", ar: "أوليفيا براون" },
    userImage:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: {
      en: "Highly recommend!",
      ar: "أنصح بها بشدة!",
    },
    content: {
      en: [
        "Amazing value for money and great design.I get compliments all the time when I wear it.",
      ],
      ar: [
        "قيمة مذهلة مقابل المال وتصميم رائع. أتلقى الكثير من الإطراءات عندما أرتديها.",
      ],
    },
    reviewDateText: { en: "February 14, 2022", ar: "14 فبراير 2022" },
    stars: 5,
  },
];

export default function Reviews() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  return (
    <>
      <section
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`py-16 sm:px-6 lg:px-8 bg-gray-50 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <AppTitleHeader
            title={lang === "ar" ? "قيم" : "Valuable"}
            subtitle={lang === "ar" ? "العملاء" : "Customers"}
            secondarySubTitle={lang === "ar" ? "المراجعات" : "Reviews"}
          />

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={`my-8 ${lang === "ar" ? "rtl-flip" : ""}`}
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id} className="my-6">
                <article className="max-w-md mx-auto bg-[#cf36130a] rounded-lg p-6 shadow-md transform transition duration-300 hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <Image
                      width={96}
                      height={96}
                      className="rounded-full w-24 h-24 border border-red-400"
                      src={review.userImage}
                      alt={`${review.userName[lang]} profile`}
                    />
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {review.userName[lang]}
                    </p>
                  </div>
                  <div className="text-center mb-4">
                    {review.content[lang].map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="mt-2 text-gray-500 dark:text-gray-400"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-1 rtl:space-x-0 rtl:space-x-reverse">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.stars
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-500"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 22 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {review.reviewDateText[lang]}
                    </time>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom red bottom navigation arrows */}
          <div className="flex justify-center gap-4 mt-8 cursor-pointer">
            <FaCircleArrowLeft className="custom-prev text-brand text-4xl" />
            <FaCircleArrowRight className="custom-next text-brand text-4xl" />
          </div>
        </div>
      </section>
      <style jsx>{`
        .rtl-flip {
          transform: scaleX(-1);
        }
      `}</style>
    </>
  );
}
