// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Pages
import Login from "../Login";
import HomePage from "../pages/Home";
import UsersPage from "../pages/users/ListUsers";
import AboutPage from "../pages/About";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import ProfileAccount from "../pages/ProfileAccount";
import ImageUpload from "../pages/testing/ImageUpload";
import SampleForm from "../pages/testing/SampleForm";

// Components
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Outlet />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="edituser/:id" element={<EditUser />} />
        <Route path="profile" element={<ProfileAccount />} />
        <Route path="upload" element={<ImageUpload />} />
        <Route path="sampleform" element={<SampleForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
