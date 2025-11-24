import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import UsersPage from "./pages/Users";
import AboutPage from "./pages/About";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import MiniDrawer from "./components/Navbar"; // your drawer
import Layout from "./components/layout/layout";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (

    <>
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="./pages/Login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
              {/* <MiniDrawer> */}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<HomePage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/AddUser" element={<AddUser />} />
                  <Route path="/EditUser/:id" element={<EditUser />} />
                </Routes>
              {/* </MiniDrawer> */}
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>

    {/* Toast Container for notifications */}
     {/* Custom Styled Toast Container */}
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
