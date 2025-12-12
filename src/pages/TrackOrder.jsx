import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!order) return <div className="pt-24 text-center text-red-600">Order not found</div>;

  return (
    <div className="pt-24 pb-10 px-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Track Your Order</h1>

      {/* Order Status Tracker */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="font-semibold mb-4">Order Status</h2>
        <div className="flex items-center">
          {/* Step 1: Paid */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                order.paymentStatus === 'Paid' || order.isPaid ? 'bg-green-600' : 'bg-gray-400'
              }`}
            >
              1
            </div>
            <p className="text-sm mt-2">Paid</p>
          </div>

          {/* Line */}
          <div
            className={`flex-1 h-1 mx-3 mt-5 ${
              order.isDelivered ? 'bg-green-600' : 'bg-gray-400'
            }`}
          ></div>

          {/* Step 2: Delivered */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                order.isDelivered ? 'bg-green-600' : 'bg-gray-400'
              }`}
            >
              2
            </div>
            <p className="text-sm mt-2">Delivered</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="font-semibold mb-3">Items</h2>
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.name} x {item.qty}</span>
            <span>₹ {(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="bg-white shadow rounded p-6 mb-6">
          <h2 className="font-semibold mb-3">Shipping Address</h2>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.mobile}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.district}, {order.shippingAddress.state}</p>
          <p>{order.shippingAddress.pincode}</p>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        <div className="flex justify-between"><span>Subtotal:</span><span>₹ {order.itemsTotal}</span></div>
        <div className="flex justify-between"><span>GST:</span><span>₹ {order.gst}</span></div>
        <div className="flex justify-between"><span>Shipping:</span><span>₹ {order.shipping}</span></div>
        <div className="flex justify-between font-semibold border-t pt-3 text-lg"><span>Total:</span><span>₹ {order.totalAmount}</span></div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/orders"
          className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Orders
        </Link>

        <Link
          to="/"
          className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default TrackOrder;
