import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

import ExportPdf from "../components/ExportPdf";

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
    navigate("/AddData/", { state: { method: "add" } });
  };

  const handleEditButton = (item) => {
    navigate(`/EditData/${item.id}`, { state: { ...item, method: "edit" } });
  };

  // ✅ Function to download PDF for specific user
  const downloadPDF = async (user) => {
    const input = pdfRef.current;
  
    // ✅ Make it off-screen for rendering
    input.style.position = "absolute";
    input.style.left = "-9999px";
    input.style.display = "block";
  
    // ✅ Add your user content with image + text formatting
    input.innerHTML = `
      <div style="
        width: 595px;  /* A4 width */
        min-height: 842px;
        padding: 40px;
        background: #fff;
        font-family: 'Arial', sans-serif;
        color: #333;
        box-sizing: border-box;
        border: 1px solid #ddd;
      ">
        <h1 style="
          text-align: center;
          font-size: 22px;
          margin-bottom: 30px;
          color: #2c3e50;
        ">User Profile</h1>
  
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        ">
          <div style="flex: 0 0 120px; text-align: center;">
            <img 
              src="${user.image || "https://via.placeholder.com/100"}" 
              alt="Profile Image"
              style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #007bff;"
            />
          </div>
          <div style="margin-left: 20px; flex: 1;">
            <p style="font-size: 16px; margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Role:</strong> ${user.role || "User"}</p>
          </div>
        </div>
  
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="background: #f8f9fa;">
            <td style="padding: 10px; font-weight: bold;">Joined:</td>
            <td style="padding: 10px;">${user.joined || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Status:</td>
            <td style="padding: 10px;">${user.status || "Active"}</td>
          </tr>
        </table>
  
        <div style="
          margin-top: 40px;
          text-align: center;
          color: #888;
          font-size: 12px;
        ">
          <em>Generated on ${new Date().toLocaleString()}</em>
        </div>
      </div>
    `;
  
    // ✅ Wait for DOM rendering
    await new Promise((r) => setTimeout(r, 300));
  
    // ✅ Convert to canvas
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
  
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
    // ✅ Add image to PDF
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  
    // ✅ Save with user name
    pdf.save(`${user.name}_Profile.pdf`);
  
    // ✅ Hide it again
    input.style.display = "none";
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
              <td colSpan="3" style={{ textAlign: "center" }}>Loading...</td>
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
                  <button
                    onClick={() => downloadPDF(item)}
                    style={{
                      background: "#007bff",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    Export PDF
                  </button>
                </td>
                <td><ExportPdf user={item} />  {/* 👈 Pass user data here */}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Hidden div used to generate PDF content */}
      <div ref={pdfRef} style={{ display: "none" }}></div>
    </div>
  );
};

export default Users;
