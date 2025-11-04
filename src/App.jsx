import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";
import EditData from "./pages/EditData";

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
          <Route path="/EditData" element={<EditData />} />
          <Route path="/EditData/:id" element={<EditData />} /> {/* ✅ Add this */}
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

