import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

// Icons
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdTravelExplore, MdContactMail } from "react-icons/md";
import { FaStore } from "react-icons/fa";

const LOGO_SRC = "/images/sujathasessential.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const searchTimeout = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const userInfo = useSelector((state) => state.user.userInfo);

  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.qty || 1),
    0
  );

  /* ===============================
     SEARCH (DEBOUNCED)
  =============================== */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      if (value.trim()) {
        navigate(`/shop?search=${encodeURIComponent(value)}`);
      }
    }, 300);
  };

  const manualSearch = () => {
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search)}`);
    }
  };

  /* ===============================
     CLOSE DROPDOWN ON OUTSIDE CLICK
  =============================== */
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () =>
      document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-yellow-200 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-5 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={LOGO_SRC}
              alt="Sujatha's Essentials"
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-xl font-bold text-gray-800">
              Sujatha&apos;s Essentials
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex items-center">
            <input
              value={search}
              onChange={handleSearchChange}
              className="px-3 py-1 border rounded-l w-64"
              placeholder="Search products..."
            />
            <button
              onClick={manualSearch}
              className="bg-yellow-500 text-white px-3 py-1 rounded-r"
            >
              <FiSearch />
            </button>
          </div>

          {/* DESKTOP MENU */}
          <div
            className="hidden md:flex items-center space-x-6"
            ref={dropdownRef}
          >
            {/* SHOP DROPDOWN */}
            <div className="relative">
              <button
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === "shop" ? null : "shop"
                  )
                }
                className="hover:text-yellow-700 flex items-center gap-1 font-medium"
              >
                <FaStore /> Shop
              </button>

              {dropdownOpen === "shop" && (
                <div className="absolute bg-white shadow-lg rounded-md mt-2 w-64 p-2 z-50">
                  <Link
                    to="/pickle"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Pickles (Veg & Non-Veg)
                  </Link>

                  <Link
                    to="/sweets"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Sweets & Hot Foods
                  </Link>

                  <Link
                    to="/temple"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Temple Products
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/tours"
              className="hover:text-yellow-700 flex items-center gap-1"
            >
              <MdTravelExplore /> Tours
            </Link>

            <Link
              to="/contact"
              className="hover:text-yellow-700 flex items-center gap-1"
            >
              <MdContactMail /> Contact
            </Link>

            {/* ADMIN */}
            {userInfo?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Admin Panel
              </Link>
            )}

            {/* CART */}
            <Link to="/cart" className="relative">
              <AiOutlineShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setDropdownOpen(
                      dropdownOpen === "user" ? null : "user"
                    )
                  }
                  className="px-3 py-1 bg-gray-900 text-white rounded"
                >
                  {userInfo.name?.split(" ")[0]}
                </button>

                {dropdownOpen === "user" && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-40 p-2">
                    <Link
                      to="/profile"
                      className="block px-3 py-1 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-yellow-100 px-5 py-4 space-y-4">
            {/* MOBILE SEARCH */}
            <div className="flex">
              <input
                value={search}
                onChange={handleSearchChange}
                className="flex-1 px-3 py-2 border rounded-l"
                placeholder="Search..."
              />
              <button
                onClick={manualSearch}
                className="bg-yellow-500 px-3 py-2 rounded-r"
              >
                <FiSearch />
              </button>
            </div>

            {/* SHOP */}
            <div className="border rounded">
              <button
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === "shop" ? null : "shop"
                  )
                }
                className="w-full py-2 flex justify-between"
              >
                <span className="flex gap-2 items-center">
                  <FaStore /> Shop
                </span>
                <span>{dropdownOpen === "shop" ? "▲" : "▼"}</span>
              </button>

              {dropdownOpen === "shop" && (
                <div className="bg-white px-4 py-2 space-y-2">
                  <Link to="/pickle">Pickles</Link>
                  <Link to="/sweets">Sweets & Hot Foods</Link>
                  <Link to="/temple">Temple Products</Link>
                </div>
              )}
            </div>

            <Link to="/tours">Tours</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart ({cartCount})</Link>

            {userInfo ? (
              <>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* NAVBAR SPACER */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
