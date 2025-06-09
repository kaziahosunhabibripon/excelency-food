"use client";
import { memo, useEffect, useMemo, useRef, useState } from "react";

import { size } from "lodash";
import Image from "next/image";
import { Heart, Minus, Plus, ShoppingCart, Star } from "react-feather";
import toastAlert from "@/utils/toastConfig";
import { alterCardImage, truncateText } from "@/utils/appHelpers";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  addToCart,
  setGuestUserId,
  setOpenCartModal,
} from "@/redux/cart/cartSlice";
import { FoodItem } from "@/types/types";
import { addToCartItem } from "@/helpers/restApiRequest";
import Link from "next/link";

interface ProductCardProps {
  data: FoodItem;
  callback?: () => void;
  customClasses?: string;
  index?: number;
}

const isValidImgUrl = (img: string | undefined) => {
  return img?.startsWith("http://") || img?.startsWith("https://");
};

const ProductCard = ({
  data,
  customClasses = "w-40 h-40",
}: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const toastId = useRef<string | number | null>(null);

  const { id, image_url, price, sub_category, name } = data || {};

  const cartItem = useAppSelector((state) =>
    state.cart.cartData?.find((item) => item?.id === id)
  );

  // ✅ Quantity state synced with cart if exists
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const foodImage = useMemo(
    () => (isValidImgUrl(image_url) ? image_url : alterCardImage),
    [image_url]
  );

  // ➕ Increment quantity
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // ➖ Decrement quantity
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // 🛒 Add to cart and open modal
  const handleAddToCart = async () => {
    try {
      const response = await addToCartItem({
        item_id: id,
        quantity,
      });

      if (size(response)) {
        const guestUserId = response?.data?.cart?.guest_id || "";
        dispatch(setGuestUserId(guestUserId));
        dispatch(
          addToCart({
            items: data,
            quantity,
            cartId: response?.data?.cart?.id,
            guestId: guestUserId,
          })
        );
        dispatch(setOpenCartModal(true));
      }
    } catch (err) {
      const { response } = err as { response: { data: { message: string } } };
      toastAlert("error", response?.data?.message, "top-right", toastId, {
        autoClose: 4000,
      });
    }
  };

  return (
    <div
      className="max-w-sm rounded-xl overflow-hidden p-3 shadow-lg group bg-white transition-transform duration-300 ease-in-out"
      key={id}
    >
      <div className="relative overflow-hidden">
        <Link href="#">
          <Image
            src={foodImage}
            alt={name || "Food title"}
            width={200}
            height={200}
            loading="lazy"
            className={`${customClasses} object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110`}
          />
        </Link>

        <div className="flex justify-between items-center">
          <div className="absolute top-4 right-4 text-sm font-medium cursor-pointer border hover:!text-white border-gray-200 p-2 rounded-full hover:bg-[#cf3613]">
            <Heart className="w-6 h-6 text-brand hover:!text-white font-bold cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base 2xl:text-xl font-semibold text-gray-900 lowercase first-letter:uppercase">
              {truncateText(name, 25) || ""}
            </h3>
            <p className="text-gray-600 text-sm">{sub_category?.name}</p>
          </div>

          <div className="group flex items-center justify-center text-center px-2 py-1 rounded">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-gray-500 ml-1 group-hover:fill-orange-500 group-hover:text-orange-500 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex justify-between items-center gap-4">
            <span className="text-gray-900 font-medium text-base 2xl:text-lg">
              AED {Math.round(Number(price))}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center bg-gray-200 rounded-full">
              <button
                role="button"
                tabIndex={0}
                onClick={handleDecrement}
                className="uppercase cursor-pointer border border-gray-300 rounded-full h-8 w-8 bg-white hover:bg-slate-100 flex items-center justify-center"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              {quantity}
              <button
                role="button"
                tabIndex={0}
                onClick={handleIncrement}
                className="uppercase cursor-pointer border border-gray-300 rounded-full h-8 w-8 text-white bg-white hover:bg-slate-100 flex items-center justify-center"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={handleAddToCart}
            className="border border-gray-300 cursor-pointer p-2 text-white rounded-full hover:bg-slate-100"
          >
            <ShoppingCart className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
