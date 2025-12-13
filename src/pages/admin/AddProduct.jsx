import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    countInStock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const subCategoryMap = {
    pickles: ["veg", "nonveg", "andhra", "telangana"],
    temple: ["agarbatti", "puja-items", "sandal"],
    sweets: ["sweet", "hot"], // ✅ sweets & hot foods
    home: [],
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      if (image) data.append("images", image);

      await axios.post("/api/products", data);

      alert("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        {/* SLUG */}
        <input
          type="text"
          name="slug"
          placeholder="Slug (unique)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        {/* CATEGORY */}
        <select
          name="category"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
              subCategory: "",
            })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="pickles">Pickles</option>
          <option value="sweets">Sweets & Hot Foods</option> {/* ✅ */}
          <option value="temple">Temple Products</option>
          <option value="home">Home Essentials</option>
        </select>

        {/* SUB CATEGORY */}
        {formData.category && subCategoryMap[formData.category].length > 0 && (
          <select
            name="subCategory"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Sub Category</option>
            {subCategoryMap[formData.category].map((sub) => (
              <option key={sub} value={sub}>
                {sub.toUpperCase()}
              </option>
            ))}
          </select>
        )}

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        {/* STOCK */}
        <input
          type="number"
          name="countInStock"
          placeholder="Stock Count"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        {/* IMAGE */}
        <input type="file" onChange={handleImageChange} />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
