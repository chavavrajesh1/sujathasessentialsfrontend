import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import imageCompression from "browser-image-compression";

export default function EditTour() {
  const { id } = useParams();
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

  // Fetch tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await api.get(`/tours/${id}`);
        setForm(data);
      } catch (err) {
        console.log("Fetch tour error:", err);
      }
    };
    fetchTour();
  }, [id]);

  // Compress & preview images
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Compress images
    const compressedFiles = await Promise.all(
      files.map((file) =>
        imageCompression(file, {
          maxSizeMB: 1, // max 1MB
          maxWidthOrHeight: 1024, // resize if larger
          useWebWorker: true,
        })
      )
    );

    setImages(compressedFiles);

    // Generate preview URLs
    const previews = compressedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previews);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => fd.append(key, form[key]));
      images.forEach((img) => fd.append("images", img));

      await api.put(`/tours/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tour updated successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to update tour.");
    } finally {
      setLoading(false);
    }
  };

  if (!form.title) return <p className="pt-24 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Edit Tour</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="input"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input h-24"
        />
        <textarea
          placeholder="Places"
          value={form.places}
          onChange={(e) => setForm({ ...form, places: e.target.value })}
          className="input h-24"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="input"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="input"
          />
        </div>

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="input h-24"
        />

        {/* Image Upload */}
        <div>
          <p className="text-gray-600 mb-2">Upload New Images (optional)</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />

          {preview.length > 0 && (
            <div className="flex gap-4 mt-3 flex-wrap">
              {preview.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Tour"}
        </button>
      </form>
    </div>
  );
}
