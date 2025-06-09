"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";
import VideoModal from "@/components/modal/WatchVideos";

const backgroundImages = [
  "/assets/banner.jpeg",
  "/assets/banner1.jpeg",
  "/assets/banner2.jpeg",
];

const Hero = () => {
  const t = useTranslations();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = () => {
    const section = document.getElementById("countryFlags");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className="absolute  inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentImageIndex === index ? 1 : 0,
            transform: currentImageIndex === index ? "scale(1.05)" : "scale(1)",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <p className="text-16 mb-4 hidden font-semibold md:block">
          {t("Hero.welcome")}{" "}
          <span className="text-brand">{t("Hero.second")}</span>
        </p>
        <h1
          className="text-5xl md:text-7xl font-serif max-w-5xl mb-6"
          data-aos="fade-up"
        >
          {t("Hero.headline")}
        </h1>
        <p className="text-xl mb-8" data-aos="fade-up">
          {t("Hero.subline")}
          <span className="emoji w-4 h-4 mb-8"> &#128522; </span>{" "}
          <span className="pl-[100px]">{t("Hero.smile")}</span>
        </p>

        <div className="flex items-center justify-between gap-4">
          <button
            data-aos="fade-up"
            role="button"
            tabIndex={0}
            onClick={handleScroll}
            className="bg-brand cursor-pointer text-white px-8 py-3 hover:bg-brand transition-colors flex justify-between items-center gap-2"
          >
            <ArrowDown className="animate-float-item-one" />
            <span className="uppercase">{t("Hero.button")}</span>
          </button>
          <button
            data-aos="fade-up"
            role="button"
            tabIndex={0}
            onClick={() => setIsOpen(true)}
            className="bg-brand cursor-pointer text-white px-8 py-3 hover:bg-brand transition-colors flex justify-between items-center gap-2"
          >
            <ArrowUp className="animate-float-item-one" />
            <span className="uppercase">{t("Hero.watch")}</span>
          </button>
          <VideoModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            videoUrl="https://www.youtube.com/embed/bca0uWV_j6Y?autoplay=1&rel=0&playlist=bca0uWV_j6Y&loop=1&wmode=transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
