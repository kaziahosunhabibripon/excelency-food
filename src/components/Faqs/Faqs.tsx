"use client";
import React, { useState } from "react";
import InfoCard from "../Contactus/InfoCard";
import { contactInfoData } from "@/data/contactInfoData";
import { Minus, Plus } from "react-feather";
import Image from "next/image";
import ServeIcon from "@/helpers/ui/customSvg/ServeIcon";
import { faqItems } from "@/data/faqItems";
import CommonHeader from "../common/CommonHeader";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F4F1EA]">
      {/* Hero Section */}
      <CommonHeader
        title="Get your"
        subtitle="answers"
        componentTitle="FAQ's"
      />

      {/* Info Cards */}
      <div className="max-w-8xl md:px-12 lg:px-12 px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfoData?.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* FAQ Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-[#f9f7f4]">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-2">
            <span>
              <ServeIcon />
            </span>
            <span className="uppercase text-brand">FAQ</span>
            <span>
              <ServeIcon />
            </span>
          </div>
          <h2 className="text-4xl font-bold text-[#0a0f17]">
            Frequently Ask Question
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Burger Image */}
          <div className="flex justify-center">
            <Image
              src="/assets/burger.png"
              alt="burger"
              width={500}
              height={500}
              loading="lazy"
              className="object-contain"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full bg-brand text-white p-4 flex justify-between items-center transition-all duration-300"
                  >
                    <span className="text-left">{item.question}</span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <Plus className="h-5 w-5 flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "max-h-[500px] opacity-100 p-4 bg-white"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
