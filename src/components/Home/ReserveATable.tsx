"use client";

import dayjs from "dayjs";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown } from "react-feather";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarIcon from "@/helpers/ui/customSvg/CalendarIcon";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

const timeOptions = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

export default function ReserveATable() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations();
  const [formData, setFormData] = useState({
    guests: "",
    date: "",
    time: "",
    fullName: "",
    message: "",
    phoneNo: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectGuest = (value: string) => {
    setFormData((prev) => ({ ...prev, guests: value }));
    setDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, phoneNo, guests } = formData;

    // Validation
    if (!fullName || !phoneNo || !guests || !dateValue || !selectedTime) {
      toast.error("Please fill in all required fields.");
      return;
    }

    console.log("Form submitted:", {
      ...formData,
      date: dateValue,
      time: selectedTime,
    });
    // toast message show
    toast.success("Dear Guest Your Reservation is successfull");
    // from clear after data submit
    setFormData({
      guests: "",
      date: "",
      time: "",
      fullName: "",
      message: "",
      phoneNo: "",
    });
    setDateValue(new Date());
    setSelectedTime("10:00 AM");
  };

  const handleDate = (value: Date | null) => {
    setDateValue(value);
    setShowCalendar(false); // Auto-close calendar on date select
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setDropdownOpen(false);
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      )
        setShowCalendar(false);
      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      )
        setShowTimeDropdown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="w-full bg-[#ecbf4c] text-slate-50 px-4 py-8 md:px-12 md:py-12"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            {t("reserve.title")}
            <br />
            {t("reserve.title1")}
          </h1>
          <p className="mt-4 text-lg sm:text-xl">{t("reserve.mainTitle")}!</p>
        </div>

        <div className="md:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Guest Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-full bg-white text-gray-800 h-14 rounded-md flex items-center justify-between px-4 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span
                  className={
                    formData.guests ? "text-gray-800" : "text-gray-500"
                  }
                >
                  {formData.guests
                    ? `${formData.guests} ${
                        Number(formData.guests) === 1 ? "Guest" : "Guests"
                      }`
                    : "No of Guest"}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <div
                      key={num}
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectGuest(num.toString())}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date & Time Pickers */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Calendar */}
              <div className="relative w-full" ref={calendarRef}>
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded px-3 py-4 bg-white text-gray-800 flex justify-between items-center"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <span>
                    {dateValue && dayjs(dateValue).format("DD/MM/YYYY")}
                  </span>
                  <CalendarIcon />
                </button>

                {showCalendar && (
                  <div className="absolute z-10 mt-1 p-2 bg-white shadow rounded">
                    <Calendar
                      onChange={handleDate}
                      value={dateValue}
                      minDate={new Date()}
                      className="text-gray-800"
                    />
                  </div>
                )}
              </div>

              {/* Time Dropdown */}
              <div className="relative w-full" ref={timeDropdownRef}>
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded px-3 py-4 bg-white text-gray-800 flex justify-between items-center"
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                >
                  <span>{selectedTime}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showTimeDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded shadow-lg max-h-60 overflow-y-auto">
                    <ul className="py-1">
                      {timeOptions.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            className={`block w-full text-left px-4 py-2 cursor-pointer ${
                              selectedTime === option
                                ? "bg-brand text-gray-500"
                                : "text-gray-800"
                            }`}
                            onClick={() => {
                              setSelectedTime(option);
                              setShowTimeDropdown(false);
                            }}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Phone */}
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white text-gray-800 h-14 rounded-md px-4"
              placeholder="Full Name*"
              required
            />

            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full bg-white text-gray-800 h-14 rounded-md px-4"
              placeholder="Phone No*"
              required
            />

            {/* Message */}
            <div className="relative w-full md:col-span-2">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 pt-8 bg-white text-gray-800 min-h-[120px]"
                placeholder="Tell Us More About Your Special Message"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="bg-white cursor-pointer text-base sm:text-lg md:text-xl hover:bg-brand text-brand font-bold px-12 p-4 rounded-lg"
              >
                <span className="flex justify-center items-center">
                  {t("reserve.button")} <ArrowRight className="w-4 h-4 ms-2" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
