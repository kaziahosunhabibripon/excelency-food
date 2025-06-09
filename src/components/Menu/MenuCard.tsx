"use client";
import Image from "next/image";
import { alterCardImage } from "@/utils/appHelpers";

interface MenuItem {
  id: number;
  name: string; // localized string already
  price: number;
  currency: string;
  description: string; // localized string already
  image: string;
}

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="bg-white p-4 rounded-md border group border-gray-100 cursor-pointer flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <Image
          src={item.image || alterCardImage}
          alt={item.name}
          width={80}
          height={80}
          loading="lazy"
          className="rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base md:text-xl text-gray-900">
            {item.name}
          </h3>
          <div className="flex items-center">
            {item.name === "Honey Glazed Salmon" && (
              <div className="mr-2 text-gray-400">---</div>
            )}
            {item.name === "Braised Short Ribs" && (
              <div className="mr-2 text-gray-400">------</div>
            )}
            <span className="text-brand font-semibold text-lg">
              {item.currency} {item.price.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
      </div>
    </div>
  );
}
