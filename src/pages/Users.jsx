import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import Pagination from "../components/Pagination";
import ClipLoader from "react-spinners/ClipLoader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const loadUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await fetchUsers(page, 2, search);
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

  const handleDeleteButton = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
      loadUsers(currentPage);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users (Server-side Pagination)</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: "6px", width: "250px" }}
      />

      <table border="1" cellPadding="8" width="100%" style={{ borderCollapse: "collapse" }}>
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
                <ClipLoader color="#3498db" loading={loading} size={50} />
              </td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteButton(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No users found</td>
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
