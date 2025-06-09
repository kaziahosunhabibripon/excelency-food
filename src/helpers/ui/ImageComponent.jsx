"use client";

import Image from "next/image";

const ImageComponent = ({
  alt,
  className,
  height = 500,
  src, // When using src, path url will not be rendered at all
  width = 500,
  defaultImageName = "",
  defaultImageClasses = "w-5 h-5",
  defaultUserNameTextSize = "text-16",
}) => {
  if (src) {
    return (
      <Image
        alt={alt}
        className={className}
        height={height}
        loading="lazy"
        placeholder="blur"
        blurDataURL="Loading..."
        src={src || imageUrl}
        width={width}
      />
    );
  }

  return (
    <div
      className={`${className} bg-blue-light text-brand rounded-full flex items-center justify-center ${defaultImageClasses}`}
    >
      <p className={`text-brand font-medium ${defaultUserNameTextSize}`}>
        {defaultImageName || "EX"}
      </p>
    </div>
  );
};

export default ImageComponent;
