import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import ExportPdf from "../components/ExportPdf";
import ClipLoader from "react-spinners/ClipLoader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await fetchUsers(page, 3, search);
      setUsers(data.data || []);
      setTotalPages(data.last_page || 1);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage, search]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
      loadUsers(currentPage);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Users (Server-side Pagination)</h2>

      <div style={{ marginBottom: 15 }}>
        <button
          onClick={() => navigate("/AddUser")}
          style={{
            background: "green",
            color: "#fff",
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: 10,
          }}
        >
          + Add User
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 6 }}
        />
      </div>

      <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
            <th>Export</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <ClipLoader color="#3498db" loading={loading} size={50} />
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => navigate(`/EditUser/${user.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
                <td><ExportPdf user={user} /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {!loading && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Users;
