import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/auth/Layout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AdminLayout from "./pages/admin-view/Layout.jsx";
import AdminDashboard from "./pages/admin-view/Dashboard.jsx";
import AdminProduct from "./pages/admin-view/Product.jsx";
import Orders from "./pages/admin-view/Orders.jsx";
import ShoppingLayout from "./pages/shopping-view/Layout.jsx";
import Notfound from "./pages/not-found/Index.jsx";
import Home from "./pages/shopping-view/Home.jsx";
import ShoppingListing from "./pages/shopping-view/Listing.jsx";
import Account from "./pages/shopping-view/Account.jsx";
import Checkout from "./pages/shopping-view/Checkout.jsx";
import CheckAuth from "./pages/common/Check-auth.jsx";
import UnauthPage from "./pages/unauth-page/Index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice/index.js";
import { Skeleton } from "@/components/ui/skeleton"
import Logout from "./pages/auth/Logout.jsx";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) {
    return (
     <Skeleton className="h-[600px] w-[600px]" />
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />

        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Add admin routes here */}
          <Route
            path="dashboard"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminDashboard />
              </CheckAuth>
            }
          />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        {/* shop routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          {/* Add admin routes here */}
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="*" element={<Notfound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App;
