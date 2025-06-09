"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart } from "react-feather";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { size } from "lodash";
import ProductGallery from "./ProductGallery";
import CommonHeader from "../common/CommonHeader";
import {
  addToCart,
  changeQuantity,
  setGuestUserId,
} from "@/redux/cart/cartSlice";
import { useGetSingleFoodItemQuery } from "@/redux/cartApi/cartApi";
import { addToCartItem } from "@/helpers/restApiRequest";
import { useGetAllFoodsQuery } from "@/redux/apiSlice/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { footerSocialLinks } from "@/data";
interface SingleFoodComponentProps {
  foodId: string | number;
}

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  tax_1_id: number | string;
  tax_2_id: number | string;
  category_id: number;
  sub_category_id: number;
  status: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

const productImages = [
  "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const SingleFoodComponent = ({ foodId }: SingleFoodComponentProps) => {
  const dispatch = useAppDispatch();

  // queries
  const { data: singleFoodData } = useGetSingleFoodItemQuery(foodId);
  const { data: foodsData } = useGetAllFoodsQuery({});
  const { id, price, name, description, sub_category_id, image } =
    singleFoodData?.data || {};

  // redux state
  const cartItem = useAppSelector((state) =>
    state.cart.cartData.find((item) => item.id === id)
  );

  // get single food category
  const subCategory = useMemo(
    () =>
      foodsData?.categories
        .flatMap((category) => category?.sub_categories)
        .find((sub) => sub?.id === sub_category_id),
    [foodsData, sub_category_id]
  );

  // states
  const [activeTab, setActiveTab] = useState("description");
  const [disableBtn, setDisableBtn] = useState(false);

  const handleAddToCart = async (params: Item) => {
    try {
      const response = await addToCartItem({
        item_id: params?.id,
        quantity: 1,
      });

      if (size(response)) {
        setDisableBtn(true);
        const guestUserId = response?.data?.cart?.guest_id || "";
        dispatch(setGuestUserId(guestUserId));
        if (cartItem) {
          dispatch(
            changeQuantity({
              items: params,
              quantity: cartItem.quantity + 1,
              cartId: response?.data.cart?.id,
              guestId: size(guestUserId) && guestUserId,
            })
          );
        } else {
          dispatch(
            addToCart({
              items: params,
              quantity: 1 + 1,
              cartId: response?.data.cart?.id,
              guestId: size(guestUserId) && guestUserId,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveItem = () => {
    const currentQuantity = cartItem ? cartItem.quantity : 1;
    dispatch(
      changeQuantity({
        items: singleFoodData?.data,
        quantity: currentQuantity - 1,
      })
    );
  };

  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);

  return (
    <div className="w-full">
      {/* hero section */}
      <CommonHeader title={name} componentTitle="Single food" />
      <div className="md:px-24 px-8 py-12" data-aos="fade-up">
        {/* Product Section */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          id="single-food"
        >
          {/* Product Gallery */}
          <ProductGallery images={productImages} foodImg={image} />
          {/* Product Info */}
          <div className="space-y-6" data-aos="fade-up">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through">
                  AED {Math.round(price)}
                </span>
                <span className="text-3xl font-bold">
                  AED {Math.round(price)}
                </span>
              </div>
            </div>

            <p className="text-gray-600">{description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span>Quantity</span>
              <div className="flex items-center border border-gray-200 rounded">
                <button
                  role="button"
                  tabIndex={0}
                  disabled={cartItem?.id !== id}
                  className="px-3 py-1 border-r border-gray-200 cursor-pointer"
                  onClick={handleRemoveItem}
                >
                  -
                </button>
                <span className="w-16 text-center py-1 focus:outline-none cursor-pointer">
                  {cartItem ? cartItem?.quantity : 1}
                </span>
                {/* <input
                  type="number"
                  min="1"
                  value={cartItem ? cartItem?.quantity : 0}
                  className="w-16 text-center py-1 focus:outline-none cursor-pointer"
                /> */}
                <button
                  role="button"
                  tabIndex={0}
                  className="px-3 py-1 border-l border-gray-200 cursor-pointer"
                  onClick={() => handleAddToCart(singleFoodData?.data)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                role="button"
                tabIndex={0}
                onClick={() => handleAddToCart(singleFoodData?.data)}
                disabled={size(cartItem) > 0 && !disableBtn}
                className={`${
                  disableBtn
                    ? "cursor-not-allowed bg-orange-300 hover:bg-orange-300"
                    : ""
                } flex-1 bg-brand hover:bg-orange-700 text-white px-6 cursor-pointer py-3 rounded transition duration-200`}
              >
                Add To Cart
              </button>
              <button className="p-3 border border-gray-200 rounded hover:bg-gray-50 transition duration-200">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div>
                <span className="font-semibold">Shop:</span>{" "}
                <span className="text-brand font-semibold">Excellency</span>
              </div>
              <div>
                <span className="font-semibold">Categories:</span>{" "}
                <Link
                  href="#"
                  className="text-red-600 first-letter:uppercase lowercase"
                >
                  {subCategory?.name}
                </Link>
              </div>
              {/* <div>
                <span className="font-semibold">Tag:</span>{" "}
                <Link href="#" className="text-red-600">
                  Fish
                </Link>
              </div> */}
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <span className="font-semibold">Share:</span>
              <div className="flex gap-2">
                {footerSocialLinks?.map(({ link, icon: Icon }, index) => (
                  <Link
                    key={index}
                    href={link}
                    className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-[#cf3613] hover:text-white transition duration-200"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="mb-16">
          <div className="border-b mb-8 border-gray-200">
            <div className="flex gap-8">
              <button
                className={`pb-4 relative ${
                  activeTab === "description"
                    ? "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                    : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`pb-4 relative ${
                  activeTab === "reviews"
                    ? "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-600"
                    : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (0)
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            {activeTab === "description" ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p>{description}</p>
              </>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFoodComponent;
