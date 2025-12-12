import { Link } from "react-router-dom";
import { lazy, Suspense, useState, useCallback, memo } from "react";

// Lazy load Carousel (improves LCP)
const Carousel = lazy(() => import("../components/Carousel"));

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const openMenu = useCallback(() => setShowDropdown(true), []);
  const closeMenu = useCallback(() => setShowDropdown(false), []);
  const toggleMenu = useCallback(() => setShowDropdown((prev) => !prev), []);

  return (
    <main className="pt-16">
      {/* ================= CAROUSEL ================= */}
      <Suspense fallback={<div className="h-40 bg-gray-200 animate-pulse" />}>
        <Carousel />
      </Suspense>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-orange-200 to-yellow-100 py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Welcome to Sujatha's Essentials
        </h1>

        <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
          Authentic pickles, premium essentials & temple products.
        </p>

        <Link
          to="/shop"
          className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CategoryCard
            title="Pickles"
            desc="Traditional Andhra & Telangana pickles."
            link="/pickle"
          />

          <CategoryCard
            title="Temple Essentials"
            desc="Pooja, decorative and spiritual items."
            link="/temple"
          />

          <CategoryCard
            title="Home & Bathroom Products"
            desc="Cleaning, fragrances & storage essentials."
            link="/home-products"
          />
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Featured Products
        </h2>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard name="Mango Pickle" price="₹250" />
          <ProductCard name="Agarbatti" price="₹120" />
          <ProductCard name="Room Freshener" price="₹180" />
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="text-center py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Fresh Homemade Products. Delivered Fast.
        </h2>

        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          100% quality guarantee — FSSAI & GST certified.
        </p>

        {/* Dropdown */}
        <div
          className="relative inline-block mt-6"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <button
            onClick={toggleMenu}
            aria-haspopup="true"
            aria-expanded={showDropdown}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Explore Shop →
          </button>

          {showDropdown && (
            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-64 p-2 z-50">
              <Link
                to="/pickle"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Pickles (Andhra & Telangana)
              </Link>
              <Link
                to="/temple"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Temple Products
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/tours"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Explore Tours →
        </Link>
      </section>
    </main>
  );
};

//
// ================= REUSABLE COMPONENTS =================
//

// Memoized CategoryCard
const CategoryCard = memo(({ title, desc, link }) => (
  <div className="bg-white shadow rounded-lg p-5 hover:shadow-xl transition border border-gray-100">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 mt-2">{desc}</p>
    <Link
      to={link}
      className="text-orange-600 mt-3 inline-block font-medium hover:underline"
    >
      Browse →
    </Link>
  </div>
));

// Memoized ProductCard
const ProductCard = memo(({ name, price }) => (
  <div className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition border border-gray-100">
    <h4 className="font-semibold text-lg">{name}</h4>
    <p className="mt-2 font-bold">{price}</p>
  </div>
));

export default Home;
