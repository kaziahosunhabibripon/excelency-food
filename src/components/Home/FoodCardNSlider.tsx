"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import { size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import NoDataFoundIcon from "@/helpers/ui/customSvg/NoDataFoundIcon";
import ProductCard from "../SingleFood/ProductCard";
import { useAppSelector } from "@/redux/hooks/hooks";
import { FoodItem } from "@/types/types";
import { FoodGroup } from "@/types/GroupFoodTypes";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const FoodCardNSlider = ({
  group,
  items,
}: {
  group: FoodGroup; // group data with a "categories" array
  items: FoodItem[];
}) => {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const router = useRouter();

  const { modalProps, selectedSearchData } = useAppSelector(
    (state) => state.app
  );

  // Two states: one for the active main category and one for the sub-category filter.
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  // On mount, default to "Set Menu" if it exists, otherwise the first category.
  useEffect(() => {
    if (group?.categories && size(group.categories) > 0) {
      const setMenuCategory = group.categories.find(
        (cat) => cat.name.trim().toLowerCase() === "set menu"
      );
      if (setMenuCategory) {
        setActiveMainCategory(setMenuCategory);
      } else {
        setActiveMainCategory(group.categories[0]);
      }
      // By default, no sub category is selected ("All" sub categories).
      setActiveSubCategory(null);
    }
  }, [group]);

  // Change main category and reset sub-category.
  const handleMainCategoryChange = (mainCat) => {
    setActiveMainCategory(mainCat);
    setActiveSubCategory(null);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  // Change sub-category.
  const handleSubCategoryChange = (subCat) => {
    setActiveSubCategory(subCat);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  // Filtering logic: if a sub-category is selected, filter by its id.
  // Otherwise, filter by the main category id (matching item.sub_category.purchase_category_id).
  const filteredItems = useMemo(() => {
    if (activeMainCategory) {
      if (activeSubCategory) {
        return items.filter(
          (item) => item?.purchase_sub_category_id === activeSubCategory.id
        );
      } else {
        return items.filter(
          (item) => item?.purchase_category_id === activeMainCategory.id
        );
      }
    }
    return items;
  }, [items, activeMainCategory, activeSubCategory]);

  const handleRedirect = (params) => {
    router.push(`/food/${params?.id}`);
  };

  // Check if the selected sarch item match with the category data
  useEffect(() => {
    if (
      selectedSearchData &&
      activeMainCategory &&
      selectedSearchData?.purchase_category_id === activeMainCategory?.id
    ) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedSearchData, activeMainCategory]);

  // Check if the selected country id matches with the group id
  useEffect(() => {
    if (modalProps?.id === group?.id && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [modalProps, group]);
  const t = useTranslations();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const handleMouseEnter = () => {
    swiperInstance?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperInstance?.autoplay?.start();
  };
  return (
    <div
      className="h-full w-full py-8  bg-[#f2f2f25b]"
      // id="foodSlide"
      ref={sectionRef}
    >
      <AppTitleHeader
        title={`${group?.name || ""}`}
        secondaryTitle={t("food.secondaryTitle")}
      />

      {/* Main Category Tabs (without "All Foods") */}
      <div className="flex md:justify-center !ml-8 !mr-8 md:mr-0 md:ml-0 gap-8 overflow-x-auto pb-2">
        {group?.categories?.map((mainCat) => (
          <button
            key={mainCat.id}
            role="button"
            tabIndex={0}
            onClick={() => handleMainCategoryChange(mainCat)}
            className={`relative text-base 2xl:text-xl font-semibold cursor-pointer pb-2 whitespace-nowrap ${
              activeMainCategory?.id === mainCat.id
                ? "text-brand"
                : "text-gray-600"
            }`}
          >
            {mainCat.name}
            {activeMainCategory?.id === mainCat.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
        ))}
      </div>

      {/* Sub Category Tabs for "Set Menu" */}
      {activeMainCategory &&
        activeMainCategory.sub_categories &&
        activeMainCategory.sub_categories.length > 0 && (
          <div className="flex md:justify-center !ml-8 !mr-8 md:mr-0 md:ml-0 gap-8 overflow-x-auto pb-2">
            <button
              role="button"
              tabIndex={0}
              onClick={() => handleSubCategoryChange(null)}
              className={`relative text-base 2xl:text-xl font-semibold cursor-pointer pb-2 whitespace-nowrap ${
                !activeSubCategory ? "text-brand" : "text-gray-600"
              }`}
            >
              All
              {!activeSubCategory && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
              )}
            </button>
            {activeMainCategory.sub_categories.map((subCat) => (
              <button
                role="button"
                tabIndex={0}
                key={subCat.id}
                onClick={() => handleSubCategoryChange(subCat)}
                className={`relative text-base 2xl:text-xl font-semibold cursor-pointer pb-2 whitespace-nowrap first-letter:uppercase lowercase ${
                  activeSubCategory?.id === subCat.id
                    ? "text-brand"
                    : "text-gray-600"
                }`}
              >
                {subCat.name}
                {activeSubCategory?.id === subCat.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                )}
              </button>
            ))}
          </div>
        )}

      <div className="px-4 md:px-12">
        {size(filteredItems) > 0 ? (
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            navigation={true}
            grabCursor={true}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="foodCard"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              468: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 4, spaceBetween: 10 },
            }}
          >
            {filteredItems.map((item) => (
              <SwiperSlide
                key={item?.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ProductCard
                  key={item?.id}
                  data={item}
                  callback={() => handleRedirect(item)}
                  customClasses="w-[400px] h-[300px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="flex flex-col justify-center items-center gap-4">
              <NoDataFoundIcon />
              <p className="font-medium first-letter:uppercase lowercase">
                No items found
                {activeSubCategory && (
                  <>
                    {" "}
                    for{" "}
                    <span className="text-brand font-medium">
                      {activeSubCategory.name}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FoodCardNSlider);
