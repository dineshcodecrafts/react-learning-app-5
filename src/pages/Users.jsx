import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import ExportPdf from "../components/ExportPdf";

import { useSelector, useDispatch } from 'react-redux';
import { updateCount } from '../Store/CountSlice';
import DataTable from "./PageComponents/DataTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCount(users.length));
  }, [users.length, dispatch]);

  const loadUsers = async (page = 1, limit = pageSize) => {
    setLoading(true);
    try {
      const data = await fetchUsers(page, limit, search);

      setUsers(data.data || []);
      setTotalRows(data.total || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage, pageSize);
  }, [currentPage, pageSize, search]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
      loadUsers(currentPage, pageSize);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Users List</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "8px",
          margin: "10px 0",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={() => navigate("/AddUser")}
        style={{
          background: "#1a5882",
          color: "#fff",
          padding: "6px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginLeft: 15,
         
        }}
      >
        + Add User
      </button>

      <DataTable
        users={users}
        handleDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRows={totalRows}
      />
    </div>
  );
};

export default Users;
