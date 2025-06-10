"use client";
import React, { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "@/helpers/ui/Loader";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { useGetAllFoodsQuery } from "@/redux/apiSlice/apiSlice";
import { getImageUrl } from "@/utils/imageHelpers";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CountryCategoryProps {
  onSelectCountry: (countryName: string) => void;
}

const CountryCategory: React.FC<CountryCategoryProps> = ({
  onSelectCountry,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("Arabic"); // Default

  const { data: foodsData, isLoading } = useGetAllFoodsQuery({});

  // Initialize AOS only once
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []); // Empty dependency array - runs only once

  // Handle URL hash and country selection when data is available
  useEffect(() => {
    if (foodsData?.group) {
      // Check if there's a country in the URL hash
      const hashCountry = window.location.hash.replace("#", "");
      if (hashCountry && hashCountry !== "countryFlags") {
        // Find the country in the data and select it
        const country = foodsData.group.find(
          (c) => c.name.toLowerCase() === hashCountry.toLowerCase()
        );
        if (country) {
          handleCountrySelect(country);
        }
      }
    }
  }, [foodsData?.group]); // Only depend on the group array

  const handleCountrySelect = (country) => {
    setSelectedCountry(country?.name);
    onSelectCountry(country?.name);
  };

  const t = useTranslations();

  return (
    <div
      className="px-8 md:px-0 pt-16 pb-2 bg-[#f2f2f25b]"
      data-aos="fade-up"
      id="countryFlags"
    >
      <AppTitleHeader
        title={t("Country.title")}
        subtitle={t("Country.subtitle")}
        secondarySubTitle={t("Country.secondarySubTitle")}
      />

      {/* Mobile */}
      <div className="flex items-center flex-row overflow-x-auto gap-4 rounded-md md:hidden lg:hidden">
        {isLoading && (
          <div className="py-14 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!isLoading &&
          foodsData?.group
            ?.slice()
            .reverse()
            .map((country) => (
              <div
                key={country.id}
                className="w-[120px] cursor-pointer p-2 rounded-md transition-all duration-300 ease-in-out"
                onClick={() => handleCountrySelect(country)}
                data-country={country.name}
              >
                <div
                  className={`${
                    selectedCountry === country.name
                      ? "border-2 shadow-2xl border-orange-500 bg-primary"
                      : ""
                  } h-[120px] rounded-full flex flex-col justify-center items-center gap-1 shadow-md p-4 hover:shadow-2xl`}
                >
                  <Image
                    src={getImageUrl(country.image) || "/assets/arabia.png"}
                    alt={country.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-36 h-32 object-cover rounded-full aspect-[4/3]"
                  />
                  <h3 className="text-center mt-2 font-semibold text-16 text-border-dark first-letter:uppercase">
                    {country.name}
                  </h3>
                </div>
              </div>
            ))}
      </div>

      {/* Desktop */}
      {!isLoading && (
        <div className="px-8 hidden md:block lg:block mx-auto">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            navigation
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
            className="px-4 py-4"
          >
            {foodsData?.group?.map((country) => (
              <SwiperSlide key={country.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCountrySelect(country)}
                  data-country={country.name}
                  className={`bg-[rgba(235,179,38,0.57)] ${
                    selectedCountry === country.name
                      ? "border-2 shadow-2xl border-red-400"
                      : ""
                  } border border-amber-50 hover:border-2 cursor-pointer rounded-lg p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 h-full`}
                >
                  <div className="relative w-10 h-10 mb-1">
                    <Image
                      src={getImageUrl(country.image) || "/placeholder.svg"}
                      alt={country.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="object-fit w-full h-full rounded-full border border-gray-100"
                    />
                  </div>
                  <h3 className="text-gray-700 font-medium text-base 2xl:text-xl first-letter:uppercase">
                    {country.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default CountryCategory;
