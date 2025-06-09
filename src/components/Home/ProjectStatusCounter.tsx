"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";

interface StatItemProps {
  value: number;
  label: string;
  subLabel: string;
}

const StatItem = ({ value, label, subLabel }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const step = 16; // roughly 60fps
      const increment = Math.ceil((value * step) / duration);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, step);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full md:items-start"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
          {count}
        </span>
        <div className="flex flex-col">
          <span className="text-sm md:text-base font-medium text-white/90 uppercase">
            {label}
          </span>
          <span className="text-sm md:text-base font-medium text-white/90 uppercase">
            {subLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProjectStatusCounter = () => {
  const locale = useLocale();
  const t = useTranslations();

  // Detect language (for potential RTL styling)
  const lang = locale === "ar" ? "ar" : "en";

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="w-full bg-[#ecbf4c] py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
          <StatItem
            value={15}
            label={t("stats.new.label")}
            subLabel={t("stats.new.subLabel")}
          />
          <StatItem
            value={15}
            label={t("stats.total.label")}
            subLabel={t("stats.total.subLabel")}
          />
          <StatItem
            value={20}
            label={t("stats.unique.label")}
            subLabel={t("stats.unique.subLabel")}
          />
          <StatItem
            value={69}
            label={t("stats.hard.label")}
            subLabel={t("stats.hard.subLabel")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusCounter;
