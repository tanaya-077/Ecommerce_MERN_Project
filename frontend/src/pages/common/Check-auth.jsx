import React from "react";
import { useLocation, Navigate } from "react-router-dom";

// Authentication guard
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // if user is not authenticated and tries to access anything other than login/register
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if user is authenticated but tries to go back to login/register page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // if normal user tries to access /admin pages
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/shop/home" />;
  }

  // if admin tries to access /shop pages
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // otherwise allow access
  return children;
}

export default CheckAuth;
