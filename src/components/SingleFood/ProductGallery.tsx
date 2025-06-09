"use client";

import { useState } from "react";
import Image from "next/image";
import { alterCardImage } from "@/utils/appHelpers";

const ProductGallery = ({ images, foodImg }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || []);

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Sale badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
          Sale!
        </div>
        {/* Main image */}
        <div className="rounded-full border-2 border-dashed border-red-200 p-2 inline-block">
          <div className="rounded-full overflow-hidden w-[200px] h-[200px] md:w-[400px] md:h-[400px]">
            <Image
              src={`/${foodImg || selectedImage || alterCardImage}`}
              alt="Product"
              width={400}
              height={400}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`rounded-full cursor-pointer overflow-hidden w-[100px] h-[60px] md:w-20 md:h-20 border-2 ${
              selectedImage === image ? "border-red-500" : "border-transparent"
            }`}
          >
            <Image
              src={image || alterCardImage}
              alt={`Thumbnail ${index + 1}`}
              width={400}
              height={400}
              loading="lazy"
              className="md:w-full md:h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
