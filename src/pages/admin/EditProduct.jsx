import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    countInStock: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // Category → Subcategory mapping (same as AddProduct)
  const subCategoryOptions = {
    pickles: ["veg", "nonveg", "andhra", "telangana"],
    temple: ["agarbatti", "puja-items", "sandal"],
    home: []
  };

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description,
          category: data.category,
          subCategory: data.subCategory || "",
          price: data.price,
          countInStock: data.countInStock,
        });
      } catch (err) {
        console.error("Fetch product error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // ---------------------------
  // Handle Changes
  // ---------------------------
  const handleInput = (e) => {
    const { name, value } = e.target;

    // Reset subCategory if category changes
    if (name === "category") {
      setForm({
        ...form,
        category: value,
        subCategory: "",
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // Images
  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // ---------------------------
  // Submit
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // Append only non-empty fields (prevents overwriting)
      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          fd.append(key, value);
        }
      });

      // New images
      images.forEach((img) => fd.append("images", img));

      await api.put(`/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  if (!form.name) return <p className="pt-24 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* NAME + SLUG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleInput}
            className="input border p-2 rounded"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleInput}
            className="input border p-2 rounded"
            required
          />
        </div>

        {/* CATEGORY + SUBCATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleInput}
            className="input border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="pickles">Pickles</option>
            <option value="temple">Temple Products</option>
            <option value="home">Home & Bathroom</option>
          </select>

          {/* SubCategory */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleInput}
            className="input border p-2 rounded"
            disabled={!form.category}
          >
            <option value="">Select Sub Category</option>

            {form.category &&
              subCategoryOptions[form.category].map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
          </select>
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInput}
          className="input border p-2 rounded h-24"
          required
        />

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleInput}
            className="input border p-2 rounded"
            required
          />

          <input
            type="number"
            name="countInStock"
            placeholder="Stock Quantity"
            value={form.countInStock}
            onChange={handleInput}
            className="input border p-2 rounded"
            required
          />
        </div>

        {/* IMAGES */}
        <div>
          <p className="text-gray-600 mb-2">Upload New Images (optional)</p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />

          {preview.length > 0 && (
            <div className="flex gap-4 mt-3 flex-wrap">
              {preview.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  className="w-24 h-24 object-cover rounded border"
                  alt="preview"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
