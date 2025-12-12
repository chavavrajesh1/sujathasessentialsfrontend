import React, { useState } from "react";
import api from "../../utils/api";

export default function AddTour() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    places: "",
    duration: "",
    price: "",
    notes: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      images.forEach((img) => fd.append("images", img));

      await api.post("/tours", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tour Added Successfully!");
      setForm({
        title: "",
        slug: "",
        description: "",
        places: "",
        duration: "",
        price: "",
        notes: "",
      });
      setImages([]);
      setPreview([]);
    } catch (err) {
      console.error(err);
      alert("Failed to add tour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6">Add Tour</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl space-y-4"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="places"
          placeholder="Places"
          value={form.places}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />

        {/* Preview Images */}
        {preview.length > 0 && (
          <div className="flex gap-4 mt-2 flex-wrap">
            {preview.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="preview"
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Tour"}
        </button>
      </form>
    </div>
  );
}
