"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

export const Drawer = ({
  open,
  placement,
  onClose,
  children,
  className = "",
  closeButton = true,
}) => {
  const baseClasses =
    "fixed bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out p-6";

  const positions = {
    top: `top-0 left-0 w-full transform ${
      open ? "translate-y-0" : "-translate-y-full"
    }`,
    right: `top-0 right-0 h-full w-[300px] transform ${
      open ? "translate-x-0" : "translate-x-full"
    }`,
    bottom: `bottom-0 left-0 w-full transform ${
      open ? "translate-y-0" : "translate-y-full"
    }`,
    left: `top-0 left-0 h-full w-[300px] transform ${
      open ? "translate-x-0" : "-translate-x-full"
    }`,
  };

  // Optional: handle Escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <>
      {/* Optional overlay (no close on click to meet your earlier requirement) */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 pointer-events-none" />
      )}

      <div className={`${baseClasses} ${positions[placement]} ${className}`}>
        {closeButton && (
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  placement: PropTypes.oneOf(["top", "right", "bottom", "left"]).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
};
