import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import ExportPdf from "../components/ExportPdf";

import { useSelector, useDispatch } from 'react-redux';
import { updateCount } from '../Store/CountSlice';
import DataTable from "./PageComponents/DataTable";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import DialogContentText from '@mui/material/DialogContentText';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openDeleteDialog = (id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };
  
  const closeDeleteDialog = () => {
    setSelectedUserId(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await deleteUserById(selectedUserId);
      loadUsers(currentPage, pageSize);
      closeDeleteDialog();
    }
  };
  

  return (
    <div style={{ padding: 20 }}>

    <Dialog
      open={deleteDialogOpen}
      onClose={closeDeleteDialog}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this user? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>


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

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/AddUser")}
        sx={{ marginLeft: 2 }}
      >
        + Add User
      </Button>

      <DataTable
        users={users}
        handleDelete={(id) => openDeleteDialog(id)}
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
