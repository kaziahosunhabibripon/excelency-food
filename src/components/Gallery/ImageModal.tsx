"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "react-feather";

const ImageModal = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [setCurrentIndex, images.length]);

  console.log("currentIndex:", currentIndex);
  console.log("images:", images);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [setCurrentIndex, images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [goToPrevious, goToNext, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button
          role="button"
          tabIndex={0}
          onClick={onClose}
          className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex].thumbnail}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
          />
        </div>

        <button
          role="button"
          tabIndex={0}
          onClick={goToPrevious}
          className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          role="button"
          tabIndex={0}
          onClick={goToNext}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 cursor-pointer rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
