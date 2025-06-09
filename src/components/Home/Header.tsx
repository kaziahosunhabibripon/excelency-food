import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight } from "react-feather";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";
import { slidersData } from "@/data/slidersData";
import { truncateText } from "@/utils/appHelpers";

const HeaderComponent = () => {
  const handleCallback = () => {
    console.log("Button Clicked");
  };

  return (
    <div className="h-full w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        grabCursor={true}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          468: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
      >
        {slidersData?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <section className="relative h-[70vh] md:h-[80vh] lg:h-[90vh]">
              <Image
                src={slide?.image || "/assets/program-1.jpg"}
                alt="Hero Image"
                fill
                loading="lazy"
                className="brightness-50 object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center pt-28 px-4 bg-gradient-to-t from-gray-900 to-transparent">
                <div className="text-center text-white">
                  <h1 className="text-20 md:text-40 lg:text-6xl font-bold mb-4">
                    {truncateText(slide?.title, 55)}
                  </h1>
                  <p className="text-14 md:text-2xl mb-4">
                    {truncateText(slide?.description, 60)}
                  </p>
                  <button
                    role="button"
                    tabIndex={0}
                    className="bg-brand justify-center text-white 500 px-6 py-2"
                    onClick={() => handleCallback()}
                  >
                    <span>
                      <ArrowRight />
                    </span>{" "}
                    Order now
                  </button>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderComponent;
