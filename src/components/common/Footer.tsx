"use client";

import { useEffect, useState } from "react";
import { size } from "lodash";
import { navData } from "@/data/navData";
import { footerSocialLinks } from "@/data";
import { getAllFoodsData } from "@/helpers/restApiRequest";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface CountryData {
  group: { id: number; name: string }[];
}

const Footer = () => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();

  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleFoodsData = async () => {
    try {
      const response = await getAllFoodsData();
      if (size(response?.data)) {
        setCountryData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFoodsData();
  }, []);

  return (
    <footer
      className={`bg-brand-secondary text-white relative ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${
            lang === "ar" ? "rtl" : ""
          }`}
        >
          {/* Logo & Description */}
          <div>
            <Image
              src={"/assets/logo-1.png"}
              alt="Fodis Logo"
              width={800}
              height={800}
              className="w-28 h-24 mb-6 object-contain"
            />
            <p className="text-gray-400 mb-6">{t("footer.description")}</p>
            <div className="flex gap-4">
              {footerSocialLinks?.map(({ link, icon: Icon, id }) => (
                <Link
                  key={id}
                  href={link}
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-700 hover:border-[#ff6b2c] hover:text-[#ff6b2c] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {navData?.slice(1, 7)?.map((item) => (
                <li key={item?.id}>
                  <Link
                    href={item?.link}
                    className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
                  >
                    {lang === "ar" ? item.labelAr : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Groups */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.groups")}</h3>
            {size(countryData?.group) ? (
              <ul className="space-y-3">
                {countryData.group.map((item) => (
                  <li key={item.id}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">{t("footer.noGroups")}</p>
            )}
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t("footer.contactUs")}
            </h3>
            <div className="space-y-4">
              <div className="text-gray-400">
                <div>{t("footer.mondayFriday")}</div>
                <div>{t("footer.saturday")}</div>
              </div>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-[#ff6b2c]"
                />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="mt-1.5" />
                <label htmlFor="privacy" className="text-sm text-gray-400">
                  {t("footer.agreePrivacy")}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
              lang === "ar" ? "rtl" : ""
            }`}
          >
            <div>
              <p className="text-gray-400 text-sm">
                {t("footer.developedBy")}{" "}
                <Link
                  href="https://rapidsmarterp.com/"
                  className="hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("footer.rapid")}
                </Link>
              </p>
            </div>
            <div className="text-gray-400 text-sm text-center">
              {t("footer.copyright")}
            </div>
            <div className="flex gap-4 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#ff6b2c] transition-colors"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
