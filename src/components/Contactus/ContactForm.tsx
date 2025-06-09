"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const ContactForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guest: "",
    message: "",
    terms: false,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(formData);
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="text-2xl font-bold mb-6">
        {t("contactForm.getIn")}{" "}
        <span className="text-brand">{t("contactForm.touch")}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={t("contactForm.fullName")}
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          placeholder={t("contactForm.email")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder={t("contactForm.phone")}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          value={formData.guest}
          onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">{t("contactForm.guest")}</option>
          <option value="1">{t("contactForm.guest1")}</option>
          <option value="2">{t("contactForm.guest2")}</option>
          <option value="3">{t("contactForm.guest3")}</option>
          <option value="4">{t("contactForm.guest4plus")}</option>
        </select>
      </div>

      <textarea
        placeholder={t("contactForm.message")}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[150px]"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.terms}
          onChange={(e) =>
            setFormData({ ...formData, terms: e.target.checked })
          }
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          {t("contactForm.terms")}
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-brand hover:bg-bgLight text-white py-3 px-6 rounded-md transition duration-200 font-semibold"
      >
        {t("contactForm.submit")}
      </button>
    </form>
  );
};

export default ContactForm;
