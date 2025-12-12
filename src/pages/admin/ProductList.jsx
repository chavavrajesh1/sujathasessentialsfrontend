import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Sub Categories Mapping
  const subCategories = {
    pickles: ["veg", "nonveg", "andhra", "telangana"],
    temple: ["agarbatti", "puja-items", "sandal"],
    home: [],
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = "/products?";

      if (category !== "all") url += `category=${category}&`;
      if (subCategory !== "all") url += `subCategory=${subCategory}&`;
      if (search.trim() !== "") url += `search=${search}&`;

      const { data } = await api.get(url);
      setProducts(Array.isArray(data.products) ? data.products : data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, subCategory, search, refresh]);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="pt-4 px-4 max-w-6xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="relative mb-6 py-2">
        <h1 className="text-2xl font-bold text-center">Products</h1>

        {/* Add Product button right aligned */}
        <Link
          to="/admin/products/add"
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("all"); // reset subcategory
          }}
        >
          <option value="all">All Categories</option>
          <option value="pickles">Pickles</option>
          <option value="temple">Temple Products</option>
          <option value="home">Home & Bathroom</option>
        </select>

        <select
          className="border p-2 rounded"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={category === "all"}
        >
          <option value="all">All Subcategories</option>

          {category !== "all" &&
            subCategories[category]?.map((sc) => (
              <option key={sc} value={sc}>
                {sc}
              </option>
            ))}
        </select>

        <button
          onClick={() => {
            setCategory("all");
            setSubCategory("all");
            setSearch("");
          }}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading products...</p>
      )}

      {/* ================= NO PRODUCTS ================= */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products found.
        </p>
      )}

      {/* ================= PRODUCTS TABLE ================= */}
      {!loading && products.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Subcategory</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={
                        p.images?.[0]?.url ||
                        p.images?.[0]?.secure_url ||
                        "/placeholder.png"
                      }
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{p.name}</td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3 capitalize">{p.subCategory || "-"}</td>
                  <td className="p-3 font-semibold">₹{p.price}</td>
                  <td className="p-3">{p.countInStock}</td>

                  <td className="p-3 text-right flex justify-end gap-2">
                    <Link
                      to={`/admin/products/edit/${p._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
