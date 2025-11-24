import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // your auth token

  if (!token) {
    return <Navigate to="./pages/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;
