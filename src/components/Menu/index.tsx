"use client";

import { menuItems } from "@/data";
import CommonHeader from "../common/CommonHeader";
import { MenuCard } from "./MenuCard";
import { useLocale, useTranslations } from "next-intl";

const MenuComponent = () => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();

  return (
    <section
      className={`min-h-screen bg-[#f2f2f25b]`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <CommonHeader
        title={t("menu.title")}
        componentTitle={t("menu.componentTitle")}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={{
                ...item,
                name: item.name[locale as "en" | "ar"],
                description: item.description[locale as "en" | "ar"],
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuComponent;
