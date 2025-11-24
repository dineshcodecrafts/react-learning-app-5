import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import HomePage from "./pages/Home";
import UsersPage from "./pages/users/ListUsers";
import AboutPage from "./pages/About";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import ProfileAccount from "./pages/ProfileAccount";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                  <Outlet />   {/* All pages will render here */}
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
