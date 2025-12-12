import { useState } from "react";
import api from "../../utils/api";

const AddProduct = () => {
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
  const [loading, setLoading] = useState(false);

  // Category → SubCategory groups
  const subCategoryOptions = {
    pickles: ["veg", "nonveg", "andhra", "telangana"],
    temple: ["agarbatti", "puja-items", "sandal"],
    home: []
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // If category changes → reset subCategory
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      // Append only non-empty values
      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          fd.append(key, value);
        }
      });

      // Images
      images.forEach((img) => fd.append("images", img));

      await api.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Added Successfully!");

      // Reset form
      setForm({
        name: "",
        slug: "",
        description: "",
        category: "",
        subCategory: "",
        price: "",
        countInStock: "",
      });
      setImages([]);
      setPreview([]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to upload product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* NAME + SLUG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              name="name"
              className="w-full border p-2 rounded"
              placeholder="Eg: Mango Pickle"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Slug</label>
            <input
              name="slug"
              className="w-full border p-2 rounded"
              placeholder="mango-pickle"
              value={form.slug}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* CATEGORY + SUBCATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CATEGORY */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              className="w-full border p-2 rounded"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="pickles">Pickles</option>
              <option value="temple">Temple Products</option>
              <option value="home">Home & Bathroom</option>
            </select>
          </div>

          {/* SUBCATEGORY */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Sub Category</label>
            <select
              name="subCategory"
              className="w-full border p-2 rounded"
              value={form.subCategory}
              onChange={handleChange}
              disabled={!form.category} // Disabled until category chosen
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
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded h-24"
            placeholder="Write product description..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* PRICE + STOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="w-full border p-2 rounded"
              placeholder="Eg: 250"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock Quantity</label>
            <input
              type="number"
              name="countInStock"
              className="w-full border p-2 rounded"
              placeholder="Eg: 20"
              value={form.countInStock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* IMAGES */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-4 mt-3 flex-wrap">
            {preview.map((url, i) => (
              <img
                key={i}
                src={url}
                className="w-24 h-24 object-cover rounded border"
                alt="preview"
              />
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
