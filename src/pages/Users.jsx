import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import ExportPdf from "../components/ExportPdf";
import ClipLoader from "react-spinners/BarLoader";

const Users = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const pdfRef = useRef(); // Hidden container for rendering PDF content

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setItems(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      await deleteUserById(id);
      await loadUsers();
      alert("Record Successfully Deleted!");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleAdd = () => {
    navigate("/AddUser/", { state: { method: "add" } });
  };

  const handleEditButton = (item) => {
    navigate(`/EditData/${item.id}`, { state: { ...item, method: "edit" } });
  };



  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      <button
        onClick={handleAdd}
        style={{
          marginBottom: "15px",
          background: "green",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        + Add User
      </button>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                <center>
                <ClipLoader
                  color="#3498db"
                  loading={loading}
                  size={60}
                  aria-label="Loading Spinner"
                />
                </center>
                
              </td>
            </tr>
          ) : (
            Array.isArray(items) &&
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEditButton(item)}>Edit</button>
                  <button onClick={() => handleDeleteButton(item.id)}>Delete</button>
                </td>
                <td><ExportPdf user={item} />  {/* 👈 Pass user data here */}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default Users;
