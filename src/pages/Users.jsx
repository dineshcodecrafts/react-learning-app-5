import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateCount } from "../Store/CountSlice";

import ConfirmDialog from "../components/ConfirmDialog";
import DataTable from "./PageComponents/DataTable";
import Button from "@mui/material/Button";

const Users = () => {
  // State: users & loading
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // <-- already exists

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  // Search
  const [search, setSearch] = useState("");

  // Single dialog state for both actions: { open, type: 'delete'|'edit'|null, id }
  const [dialogState, setDialogState] = useState({ open: false, type: null, id: null });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Update redux count
  useEffect(() => {
    dispatch(updateCount(users.length));
  }, [users.length, dispatch]);

  // Load users
  const loadUsers = async (page = 1, limit = pageSize) => {
    setLoading(true); // <-- start spinner
    try {
      const data = await fetchUsers(page, limit, search);
      setUsers(data.data || []);
      setTotalRows(data.total || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false); // <-- stop spinner
    }
  };

  // Reload when page/search changes
  useEffect(() => {
    loadUsers(currentPage, pageSize);
  }, [currentPage, pageSize, search]);

  // Open shared confirm dialog for either edit or delete
  const openDialog = (type, id) => {
    setDialogState({ open: true, type, id });
  };

  // Close dialog
  const closeDialog = () => {
    setDialogState({ open: false, type: null, id: null });
  };

  // Confirm handler that branches based on dialog type
  const handleConfirm = async () => {
    const { type, id } = dialogState;

    if (!type || !id) {
      closeDialog();
      return;
    }

    if (type === "delete") {
      await deleteUserById(id);
      await loadUsers(currentPage, pageSize);
      closeDialog();
    } else if (type === "edit") {
      navigate(`/EditUser/${id}`);
      closeDialog();
    } else {
      closeDialog();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <ProfileBreadcrumbs items={["Home", "Profile Settings", "Profile"]} />
      <ConfirmDialog
        open={dialogState.open}
        title={dialogState.type === "delete" ? "Delete User" : "Edit User"}
        message={
          dialogState.type === "delete"
            ? "Are you sure you want to delete this user? This action cannot be undone."
            : "Do you want to edit this user's details?"
        }
        onClose={closeDialog}
        onConfirm={handleConfirm}
        confirmText={dialogState.type === "delete" ? "Delete" : "Edit"}
        cancelText="Cancel"
        confirmColor={dialogState.type === "delete" ? "error" : "primary"}
      />

      <h2>Users List</h2>

      {/* Search input */}
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

      {/* Add user button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/AddUser")}
        sx={{ marginLeft: 2 }}
      >
        + Add User
      </Button>

      {/* DataTable: pass loading state */}
      <DataTable
        users={users}
        loading={loading}  // <-- pass loading here
        handleDelete={(id) => openDialog("delete", id)}
        handleEdit={(id) => openDialog("edit", id)}
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
