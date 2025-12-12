import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import ProductCard from "../components/ProductCard";
import debounce from "lodash.debounce";

const PAGE_SIZE = 12;
const API_BASE = "https://sujathas-essentials-backend.onrender.com/api";

const TempleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [subCategory, setSubCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.set("category", "temple");
      if (search.trim()) params.set("search", search.trim());
      if (subCategory !== "all") params.set("subCategory", subCategory);
      if (brand !== "all") params.set("brand", brand);
      params.set("sort", sort);
      params.set("page", page);
      params.set("pageSize", PAGE_SIZE);
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);

      const res = await fetch(`${API_BASE}/products?${params.toString()}`);
      const data = await res.json();

      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error("Temple products load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [search, subCategory, brand, sort, page, priceRange]);

  const debouncedFetch = useMemo(
    () => debounce(fetchProducts, 300),
    [fetchProducts]
  );

  useEffect(() => {
    setPage(1);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [search, subCategory, brand, sort, priceRange, debouncedFetch]);

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const subCategories = ["all", "agarbatti", "puja-items", "sandal"];
  const brands = ["all", "SriSai", "Devi", "Kumbh", "LocalBrand"];

  return (
    <div className="pt-24 pb-10 px-4 md:px-10">
      <div className="mb-4 text-sm text-gray-600">
        Home &gt; <span className="font-semibold">Temple Products</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-3xl font-bold">Temple Products</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search temple products..."
          className="w-full md:w-1/3 border px-3 py-2 rounded"
        />
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm">Subcategory:</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {subCategories.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All" : s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Brand:</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === "all" ? "All" : b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </div>

        {/* PRICE RANGE */}
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm">Price</label>

          <input
            type="number"
            className="w-20 border px-2 py-1 rounded"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value || 0), priceRange[1]])
            }
          />

          <span>-</span>

          <input
            type="number"
            className="w-20 border px-2 py-1 rounded"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value || 0)])
            }
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-4 rounded shadow h-64" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isWished={wishlist.includes(product._id)}
                onToggleWishlist={() => toggleWishlist(product._id)}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Prev
            </button>

            <span>
              Page {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TempleProducts;
