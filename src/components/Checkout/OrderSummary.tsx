import { useMemo } from "react";
import Image from "next/image";
import { alterCardImage } from "@/utils/appHelpers";
import { useAppSelector } from "@/redux/hooks/hooks";

const OrderSummary = () => {
  // redux states
  const { checkoutCartItem } = useAppSelector((state) => state.cart);

  const totalAmount = useMemo(() => {
    if (!Array.isArray(checkoutCartItem)) {
      console.warn("checkoutCartItem is not an array:", checkoutCartItem);
      return 0;
    }

    return checkoutCartItem.reduce(
      (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
      0
    );
  }, [checkoutCartItem]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>

      {/* Order Items */}
      {checkoutCartItem?.map((item, index) => (
        <div key={index} className="flex gap-4 mb-4 pb-4 border-b">
          <div className="relative">
            <Image
              src={item.image_url || alterCardImage}
              alt={item.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">
              {item?.quantity}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 line-through">
                AED {Math.round(item?.originalPrice || item?.price)}
              </span>
              <span className="font-semibold">
                AED {Math.round(item?.price)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item?.description}</p>
          </div>
        </div>
      ))}

      {/* Coupon */}
      <details className="mb-4">
        <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
          Add a coupon
        </summary>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Coupon code"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </details>

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>AED {Math.round(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>AED {Math.round(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
