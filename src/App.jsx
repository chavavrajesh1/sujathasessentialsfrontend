import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// PUBLIC COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// PUBLIC PAGES
import Home from "./pages/Home";
import TempleProducts from "./pages/TempleProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Tours from "./pages/Tours";
import Sweets from "./pages/Sweets";
import NotFound from "./pages/NotFound";
import Pickles from "./pages/Pickles";
import CheckOut from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import TrackOrder from "./pages/TrackOrder";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ForgotUserId from "./pages/ForgotUserId";

// ADMIN COMPONENTS + LAYOUT
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import TourList from "./pages/admin/TourList";
import AddTour from "./pages/admin/AddTour";
import EditTour from "./pages/admin/EditTour";
import OrdersList from "./pages/admin/OrdersList";
import UsersList from "./pages/admin/UsersList";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES — NAVBAR + FOOTER */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/temple" element={<TempleProducts />} />
          <Route path="/pickle" element={<Pickles />} />
          <Route path="/sweets" element={<Sweets/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-userid" element={<ForgotUserId />} />

          <Route
            path="/checkout"
            element={<ProtectedRoute><CheckOut /></ProtectedRoute>}
          />

          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/track/:id"
            element={<ProtectedRoute><TrackOrder /></ProtectedRoute>}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute><Orders /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ADMIN ROUTES — NO NAVBAR / FOOTER */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="tours" element={<TourList />} />
          <Route path="tours/add" element={<AddTour />} />
          <Route path="tours/edit/:id" element={<EditTour />} />

          <Route path="orders" element={<OrdersList />} />
          <Route path="users" element={<UsersList />} />
        </Route>

        {/* 404 PAGE */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

/* PUBLIC LAYOUT */
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
