// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateCount } from "../Store/CountSlice";
import ConfirmDialog from "../components/ConfirmDialog";
import DataTable from "./PageComponents/DataTable";

import Button from "@mui/material/Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const [search, setSearch] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load user count to Redux
  useEffect(() => {
    dispatch(updateCount(users.length));
  }, [users.length, dispatch]);

  // Load users from API
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

  // Reload on page change / search change
  useEffect(() => {
    loadUsers(currentPage, pageSize);
  }, [currentPage, pageSize, search]);

  // Open delete dialog
  const openDeleteDialog = (id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  // Close delete dialog
  const closeDeleteDialog = () => {
    setSelectedUserId(null);
    setDeleteDialogOpen(false);
  };

  // Confirm delete → API call
  const handleConfirmDelete = async () => {
    await deleteUserById(selectedUserId);
    loadUsers(currentPage, pageSize);
    closeDeleteDialog();
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />

      <h2>Users List</h2>

      {/* Search */}
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

      {/* Add User Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/AddUser")}
        sx={{ marginLeft: 2 }}
      >
        + Add User
      </Button>

      {/* Data Table */}
      <DataTable
        users={users}
        handleDelete={openDeleteDialog}
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
