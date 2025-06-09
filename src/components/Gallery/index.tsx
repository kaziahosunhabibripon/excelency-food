"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CommonHeader from "../common/CommonHeader";
import ImageModal from "./ImageModal";
import EyeIcon from "@/helpers/ui/customSvg/EyeIcon";
import { galleryImages } from "@/data/galleryImages";
import AOS from "aos";
import "aos/dist/aos.css";
import AppTitleHeader from "@/helpers/ui/AppTitleHeader";
import { useLocale, useTranslations } from "next-intl";

const GalleryComponent = () => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);

  return (
    <section dir={lang === "ar" ? "rtl" : "ltr"}>
      <CommonHeader
        title={t("gallery.title")}
        componentTitle={t("gallery.componentTitle")}
      />
      <div
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/gallery.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute left-10 top-20 opacity-10" data-aos="fade-up">
          <div className="w-24 h-24 border border-gray-300 rounded-full"></div>
        </div>
        <div className="absolute left-20 bottom-40 opacity-10">
          <div className="w-16 h-16 border border-gray-300 rounded-full"></div>
        </div>

        <div
          className="w-full flex justify-center items-center"
          data-aos="fade-up"
        >
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#ecbf4c] text-white uppercase text-xs font-semibold px-3 py-1 rounded-sm mb-2">
                {t("gallery.discoverExcellency")}
              </span>
              <div className="flex justify-center items-center gap-2">
                {/* <ServeIcon /> */}
                <AppTitleHeader
                  title={t("gallery.title1")}
                  subtitle={t("gallery.subtitle")}
                  secondarySubTitle={t("gallery.secondarySubTitle")}
                />
              </div>
              <div className="flex justify-center space-x-1 mt-2">
                <span className="w-1 h-1 bg-[#ecbf4c] rounded-full"></span>
                <span className="w-1 h-1 bg-[#ecbf4c] rounded-full"></span>
                <span className="w-1 h-1 bg-[#ecbf4c] rounded-full"></span>
                <span className="w-1 h-1 bg-[#ecbf4c] rounded-full"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {galleryImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 group"
                  onClick={() => openModal(index)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image?.thumbnail}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Overlay with Slide-in Effect */}
                    <div className="absolute inset-0 bg-[#ecbf4c]/50 flex items-center justify-center transition-all duration-500 transform -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-md">
                        <EyeIcon />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <ImageModal
            images={galleryImages}
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

export default GalleryComponent;
