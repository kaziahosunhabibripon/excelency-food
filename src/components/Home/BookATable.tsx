"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "react-feather";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AppButton from "@/helpers/ui/AppButton";

export default function BookATable() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState("1 Person");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  const calendarRef = useRef<HTMLDivElement>(null);
  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const timeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
      if (
        guestDropdownRef.current &&
        !guestDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGuestDropdown(false);
      }
      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTimeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDate = (value: Date | null) => {
    setDateValue(value);
  };

  const guestOptions = [
    "1 Person",
    "2 People",
    "3 People",
    "4 People",
    "5 People",
    "6+ People",
  ];
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

  return (
    <div className="min-h-[80vh] bg-brand-secondary p-4">
      <div className="py-8">
        <h1 className="text-white text-center text-base md:text-4xl">
          Book A Table
        </h1>
        <p className="text-white text-center text-base md:text-2xl pt-2 ">
          Book A Open Table For Your Happy Time Spent.
        </p>
      </div>
      <div className="flex items-center justify-center pt-14">
        <div className="w-full max-w-3xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Number of Guests */}
              <div className="space-y-2">
                <label
                  htmlFor="guests"
                  className="block text-sm md:text-base font-medium text-white"
                >
                  NUMBER OF GUEST <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={guestDropdownRef}>
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-white flex justify-between items-center"
                    onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                  >
                    <span>{selectedGuests}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showGuestDropdown && (
                    <div className="absolute bg-white z-10 mt-1 w-full rounded shadow-lg">
                      <ul className="py-1">
                        {guestOptions.map((option) => (
                          <li key={option}>
                            <button
                              type="button"
                              role="button"
                              tabIndex={0}
                              className={`block ${
                                selectedGuests === option
                                  ? "bg-brand text-white"
                                  : ""
                              } cursor-pointer w-full text-left px-4 py-2 text-gray-regular hover:bg-brand`}
                              onClick={() => {
                                setSelectedGuests(option);
                                setShowGuestDropdown(false);
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

              {/* Date Picker */}
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm md:text-base font-medium text-white"
                >
                  SELECT DATE <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={calendarRef}>
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-white flex justify-between items-center"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <span>
                      {dateValue && dayjs(dateValue).format("DD/MM/YYYY")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  </button>

                  {showCalendar && (
                    <div className="absolute z-10 mt-1 p-2">
                      <Calendar onChange={handleDate} value={dateValue} />
                    </div>
                  )}
                </div>
              </div>

              {/* Time Picker */}
              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="block text-sm md:text-base 2xl:text-lg font-medium text-white"
                >
                  SELECT TIME <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={timeDropdownRef}>
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-white flex justify-between items-center"
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
                              className={`block ${
                                selectedTime === option
                                  ? "bg-brand text-white"
                                  : ""
                              } cursor-pointer w-full text-left px-4 py-2 text-gray-regular`}
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
            </div>

            {/* Your Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm md:text-base font-medium text-white"
                >
                  YOUR NAME <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:none"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base font-medium text-white"
                >
                  EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:none"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm md:text-base font-medium text-white"
                >
                  PHONE NUMBER <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:none"
                  required
                />
              </div>
            </div>

            {/* Special Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm md:text-base font-medium text-white"
              >
                TYPE YOUR SPECIAL MESSAGE
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  placeholder=""
                  className="w-full border border-gray-300 rounded px-3 py-2 pt-8 text-gray-regular placeholder:text-gray-500 min-h-[120px] focus:outline-none focus:none"
                ></textarea>
                <div className="absolute top-3 left-3 flex items-center text-xs text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Tell Us More About Your Special Message</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              {/* <button
                type="submit"
                role="button"
                tabIndex={0}
                className="bg-brand hover:bg-orange-500 cursor-pointer text-white text-base px-8 py-2 rounded flex items-center"
              >
                Reservation
                <ArrowRight className="w-4 h-4 ms-2" />
              </button> */}
              <AppButton title="Reservation" subtitle="Reservation" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
