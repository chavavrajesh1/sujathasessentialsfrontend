import { useEffect } from "react";

const OrderSummary = ({
  cartItems,
  totals,
  address,
  paymentMethod,
  codCharge,
  handlePlaceOrder,
  setStep,
}) => {
  useEffect(() => {
    console.log(totals);
  }, [totals]);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold mb-2">Review Your Order</h2>

      {/* Items */}
      <h3 className="font-semibold mt-4">Items</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto border p-3 rounded bg-gray-50">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span>
              {item.name} × <b>{item.qty}</b>
            </span>
            <span>₹ {(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Address */}
      <h3 className="font-semibold mt-4">Shipping Address</h3>
      <p>{address.fullName} — {address.mobile}</p>
      <p>{address.address}</p>
      <p>{address.district}, {address.state} — {address.pincode}</p>

      {/* Payment */}
      <h3 className="font-semibold mt-4">Payment Method</h3>
      <p className="capitalize">{paymentMethod}</p>

      {/* Pricing */}
      <h3 className="font-semibold mt-4">Price Details</h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹ {totals.itemsTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>
          <span>₹ {totals.gst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹ {totals.shipping.toFixed(2)}</span>
        </div>

        {codCharge > 0 && (
          <div className="flex justify-between">
            <span>COD Charge</span>
            <span>₹ {codCharge.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>₹ {totals.total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-2 rounded mt-6 hover:bg-green-700 transition"
      >
        Place Order
      </button>

      <button
        onClick={() => setStep(2)}
        className="w-full mt-3 border py-2 rounded hover:bg-gray-100 transition"
      >
        Back
      </button>
    </div>
  );
};

export default OrderSummary;
