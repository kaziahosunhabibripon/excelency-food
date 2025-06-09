"use client";

import { useEffect, useRef } from "react";

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  const modalRef = useRef(null);
  // Auto-hide after 50 seconds
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 50000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hiddent";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);

      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div
        ref={modalRef}
        className="relative max-w-xl w-full mx-auto animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 -right-8 w-8 h-8  bg-gray-700 rounded-full hover:cursor-pointer transition-all duration-200 group"
          aria-label="Close video modal"
        >
          <span className="w-8 h-8 group-hover:rotate-90 transition-transform duration-200">
            X
          </span>
        </button>

        {/* Modal Content */}
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
            title="Watch Video"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 animate-pulse"
            style={{
              animation: "progress 50s linear forwards",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
