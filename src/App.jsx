import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
          <Route path="/AddUser" element={<AddUser/>} />
          {/* <Route path="/EditData" element={<EditData />} /> */}
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/EditUser/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

