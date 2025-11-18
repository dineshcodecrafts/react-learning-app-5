import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomePage from "./pages/Home";
import UsersPage from "./pages/Users";
import AboutPage from "./pages/About";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import MiniDrawer from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes wrapped with layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MiniDrawer>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<HomePage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/AddUser" element={<AddUser />} />
                  <Route path="/EditUser/:id" element={<EditUser />} />
                </Routes>
              </MiniDrawer>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
