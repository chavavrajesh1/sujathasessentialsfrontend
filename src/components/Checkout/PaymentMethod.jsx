import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  Smartphone,
  Lock,
  BadgeIndianRupee,
  Truck,
} from "lucide-react";

const COD_LIMIT = 1500;
const COD_EXTRA_CHARGE = 30;

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  setStep,
  onPayment,
  cartTotal,
  setCodCharge,
}) => {
  const [method, setMethod] = useState(paymentMethod || "card");
  const [showCODPopup, setShowCODPopup] = useState(false);

  const methods = [
    { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={22} /> },
    { id: "upi", label: "UPI", icon: <Smartphone size={22} /> },
    { id: "wallet", label: "Wallet", icon: <Wallet size={22} /> },
    {
      id: "cod",
      label: `Cash On Delivery (COD)`,
      icon: <BadgeIndianRupee size={22} />,
      disabled: cartTotal > COD_LIMIT,
    },
  ];

  const handlePay = () => {
    if (method === "cod") {
      setShowCODPopup(true);
      return;
    }

    setPaymentMethod(method);
    onPayment?.({ method, status: "success" });
    setStep(3);
  };

  const confirmCOD = () => {
    setPaymentMethod("cod");
    setCodCharge(COD_EXTRA_CHARGE);
    setShowCODPopup(false);
    onPayment?.({ method: "cod", status: "pending" });
    setStep(3);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>

      <div className="space-y-3">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            disabled={m.disabled}
            aria-disabled={m.disabled}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition
              ${method === m.id ? "border-blue-600 bg-blue-50" : "border-gray-300"}
              ${m.disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"}
            `}
          >
            {m.icon}
            <span className="text-lg">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Card Payment */}
      {method === "card" && (
        <div className="mt-6 space-y-3 bg-white p-4 border rounded-xl shadow-sm">
          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Card Holder Name"
          />
          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Card Number"
            maxLength={16}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full px-4 py-2 border rounded-xl"
              placeholder="MM/YY"
              maxLength={5}
            />
            <input
              className="w-full px-4 py-2 border rounded-xl"
              placeholder="CVV"
              maxLength={4}
            />
          </div>
        </div>
      )}

      {/* UPI Payment */}
      {method === "upi" && (
        <div className="mt-6 bg-white p-4 border rounded-xl shadow-sm">
          <input
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Enter UPI ID (you@upi)"
          />
        </div>
      )}

      {/* COD Confirmation Popup */}
      {showCODPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-80 rounded-xl shadow-lg text-center">
            <Truck size={40} className="mx-auto text-yellow-600 mb-3" />
            <h2 className="text-xl font-bold mb-2">Confirm COD?</h2>
            <p className="text-gray-600 text-sm mb-4">
              COD will have an extra delivery charge of <b>₹{COD_EXTRA_CHARGE}</b>.
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowCODPopup(false)}
                className="w-1/2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmCOD}
                className="w-1/2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirm COD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay / Continue Button */}
      <button
        onClick={handlePay}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg flex items-center justify-center gap-2 transition"
      >
        <Lock size={18} />
        {method === "cod" ? "Continue" : "Pay Securely"}
      </button>
    </div>
  );
};

export default PaymentMethod;
