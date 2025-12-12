import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { calculateTotals } from "../utils/priceUtils";
import api from "../utils/api";
import AddressForm from "../components/Checkout/AddressForm";
import OrderSummary from "../components/Checkout/OrderSummary";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [codCharge, setCodCharge] = useState(0);

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    state: "",
    district: "",
    address: "",
    landmark: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Load checkout items once
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    setCartItems(saved);
  }, []);

  // Prevent unnecessary recalculation
  const totals = useMemo(
    () => calculateTotals(cartItems, codCharge),
    [cartItems, codCharge]
  );

  const handlePlaceOrder = useCallback(async () => {
    try {
      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return navigate("/cart");
      }

      const { data } = await api.post(
        "/orders",
        {
          orderItems: cartItems,
          shippingAddress: address,
          paymentMethod,
          paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
          itemsTotal: totals.itemsTotal,
          gst: totals.gst,
          shipping: totals.shipping,
          codCharge,
          totalAmount: totals.total,
        },
        { withCredentials: true }
      );

      // Clear cart
      localStorage.removeItem("checkoutCart");
      dispatch(clearCart());

      navigate("/order-success", { state: { orderId: data._id } });
    } catch (error) {
      console.error(error);
      alert("Order failed. Try again.");
    }
  }, [
    cartItems,
    address,
    paymentMethod,
    totals,
    codCharge,
    navigate,
    dispatch,
  ]);

  return (
    <div className="pt-24 px-4 pb-16">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        {/* Step indicators */}
        <div className="flex justify-between mb-8 text-sm font-medium">
          <div className={step === 1 ? "text-blue-600" : "text-gray-500"}>
            1. Address
          </div>
          <div className={step === 2 ? "text-blue-600" : "text-gray-500"}>
            2. Payment
          </div>
          <div className={step === 3 ? "text-blue-600" : "text-gray-500"}>
            3. Review
          </div>
        </div>

        {/* Render Step Components */}
        {step === 1 && (
          <AddressForm
            address={address}
            setAddress={setAddress}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            setStep={setStep}
            cartTotal={totals.total}
            setCodCharge={setCodCharge}
          />
        )}

        {step === 3 && (
          <OrderSummary
            cartItems={cartItems}
            totals={totals}
            address={address}
            paymentMethod={paymentMethod}
            codCharge={codCharge}
            handlePlaceOrder={handlePlaceOrder}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
};

export default CheckOut;
