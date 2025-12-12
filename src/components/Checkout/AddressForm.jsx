const AddressForm = ({ address, setAddress, setStep }) => {
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        value={address.fullName}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <input
        name="mobile"
        placeholder="Mobile Number"
        value={address.mobile}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <input
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <input
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <input
        name="district"
        placeholder="District"
        value={address.district}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <textarea
        name="address"
        placeholder="Address"
        value={address.address}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded h-24 focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <input
        name="landmark"
        placeholder="Landmark (optional)"
        value={address.landmark}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
      />

      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        onClick={() => setStep(2)}
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default AddressForm;
