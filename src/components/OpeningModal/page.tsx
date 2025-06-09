"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TopModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 slide-in-top-scale bg-opacity-50 cursor-pointer flex top-1 justify-center items-center z-50">
      {/* Wrapper for modal and button */}
      <div className="relative flex items-start mt-10">
        {/* Modal */}
        <div className="bg-brand rounded-lg shadow-lg max-w-xl w-full h-auto overflow-hidden">
          <Image
            width={800}
            height={800}
            src="/assets/offer-1.jpeg"
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Close Button - right of modal with gap-2 */}
        <button
          className="ml-2 mt-1 bg-purple-100  text-red-600 font-bold rounded-full h-8 w-8"
          onClick={() => setIsVisible(false)}
        >
          <span className="text-xl flex items-center font-light  justify-center animate-pulse">
            &times;
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopModal;
