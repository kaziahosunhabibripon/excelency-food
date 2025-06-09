import Image from "next/image";

interface CartItemProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
  savings: number;
}

const CartItem = ({
  image,
  name,
  price,
  originalPrice,
  description,
  quantity,
  onQuantityChange,
  onRemove,
  savings,
}: CartItemProps) => {
  return (
    <div className="py-6 border-b">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            <div>
              <a
                href="#"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {name}
              </a>
              {savings > 0 && (
                <span className="ml-2 inline-block px-2 py-1 bg-gray-100 text-xs">
                  SAVE ${savings.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                ${(quantity * price).toFixed(2)}
              </div>
              {originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${(quantity * originalPrice).toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4">{description}</p>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center border rounded">
              <button
                className="px-3 py-1 border-r hover:bg-gray-50"
                onClick={() => onQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  onQuantityChange(Number.parseInt(e.target.value) || 0)
                }
                className="w-16 text-center py-1 focus:outline-none"
              />
              <button
                className="px-3 py-1 border-l hover:bg-gray-50"
                onClick={() => onQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={onRemove}
              className="text-gray-500 hover:text-red-600 text-sm"
            >
              Remove item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
