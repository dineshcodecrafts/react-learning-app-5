import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Correct file imports (with )
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import UsersPage from "./pages/users/ListUsers";
import AboutPage from "./pages/About";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import ProfileAccount from "./pages/ProfileAccount";

// Protected route
import ProtectedRoute from "./components/ProtectedRoute";

// Correct Layout import (uppercase L)
import Layout from "./components/layout/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "./pages/ImageUpload";

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Layout (GLOBAL) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Outlet /> {/* All pages will render here */}
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

            
          </Route>

        </Routes>
      </Router>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
