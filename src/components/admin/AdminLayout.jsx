// src/layout/AdminLayout.jsx
import { useState, useMemo } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/login", { replace: true });
  };

  const navSections = useMemo(
    () => [
      {
        title: "Catalog",
        links: [
          { label: "Products", to: "/admin/products" },
          { label: "Add Product", to: "/admin/products/add" },
          { label: "Tours", to: "/admin/tours" },
          { label: "Add Tour", to: "/admin/tours/add" },
        ],
      },
      {
        title: "Users & Orders",
        links: [
          { label: "Orders", to: "/admin/orders" },
          { label: "Users", to: "/admin/users" },
        ],
      },
    ],
    []
  );

  const renderLinks = () =>
    navSections.map((section, idx) => (
      <div key={idx} className="mt-4">
        <h3 className="text-xs text-gray-500 uppercase px-3">
          {section.title}
        </h3>

        {section.links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    ));

  const sidebarContent = useMemo(
    () => (
      <div className="flex flex-col h-full overflow-y-auto overscroll-none">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Admin</h2>
          <p className="text-sm text-gray-500">Sujatha's Essentials</p>
        </div>

        <nav className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                }`
              }
            >
              Dashboard
            </NavLink>

            {renderLinks()}

            <Link
              to="/"
              className="mt-5 block bg-yellow-500 text-black py-2 px-3 rounded hover:bg-yellow-600 text-left"
            >
              ⬅ Back to Home
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50"
            aria-label="Logout"
          >
            Logout
          </button>
        </nav>
      </div>
    ),
    [handleLogout]
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ============== DESKTOP SIDEBAR ============== */}
      <aside className="hidden md:block w-64 bg-white border-t sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* ============== MOBILE SIDEBAR OVERLAY ============== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative w-64 bg-white h-full shadow-xl animate-slideIn overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* ============== MOBILE TOP BAR ============== */}
      <div className="md:hidden w-full bg-white p-3 border-b flex items-center justify-between sticky top-0 z-30">
        <div>
          <h2 className="font-bold">Admin</h2>
          <p className="text-xs text-gray-500">Sujatha's Essentials</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <button
            onClick={handleLogout}
            className="text-sm text-red-600"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ============== MAIN CONTENT ============== */}
      <main className="flex-1 p-6 pb-16 md:pb-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
