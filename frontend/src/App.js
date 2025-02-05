import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Home from "./Component/Pages/Home/Home";
import Shop from "./Component/Pages/Shop/Shop";
import ProductDetail from "./Component/Pages/ProducDetail/ProductDetail";
import Cart from "./Component/Pages/Cart/Cart";
import ProfilePage from "./Component/ProfilePage/ProfilePage";
import LoginPage from "./Component/UserLogin/LoginPage";
import { CartProvider } from "./Component/Pages/Cart/CartContext";
import { UserProvider, UserContext } from "./Component/UserContext/UserContext";
import Layout from "./Component/Layout/Layout";
import LayoutCart from "./Component/Layout/LayoutCart";
import Checkout from "./Component/Pages/CheckOut/CheckOut";
import CustomerUser from "./CustomerUser";
import CreateCustomerUser from "./CreateCustomerUser";
import UpdateCustomerUser from "./UpdateCustomerUser";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import AdminPrivateRoute from "./Component/Admin/AdminPrivateRoute";
import AdminLogin from "./Component/Admin/AdminLogin";
import CreateAdminUser from "./Component/Admin/CreateAdminUser";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1220);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-sm font-normal px-8 leading-6">
          This site is not usable on small screens. Updates will be done in the
          future.
        </p>
      </div>
    );
  }

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/shop"
              element={
                <Layout>
                  <Shop />
                </Layout>
              }
            />
            <Route
              path="/shop/:slug"
              element={
                <Layout>
                  <ProductDetail />
                </Layout>
              }
            />
            <Route
              path="/shop/cart"
              element={
                <PrivateRoute>
                  <Layout>
                    <Cart />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/shop/checkout"
              element={
                <PrivateRoute>
                  <LayoutCart>
                    <Checkout />
                  </LayoutCart>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </PrivateRoute>
              }
            />
            {/* for checking user */}
            <Route path="/customer-user" element={<CustomerUser />} />
            <Route
              path="/create-customer-user"
              element={<CreateCustomerUser />}
            />
            <Route
              path="/update-customer-user/:id"
              element={<UpdateCustomerUser />}
            />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />{" "}
            {/* Admin Login */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminPrivateRoute>
                  <AdminDashboard />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/add"
              element={
                <AdminPrivateRoute>
                  <CreateAdminUser />
                </AdminPrivateRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
}

export default App;
