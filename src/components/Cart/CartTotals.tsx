const CartTotals = ({ subtotal, total, onCheckout }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">CART TOTALS</h2>

      {/* Coupon */}
      <div className="mb-6">
        <details className="cursor-pointer">
          <summary className="text-gray-600 hover:text-gray-800">
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
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => onCheckout()}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded transition duration-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotals;
