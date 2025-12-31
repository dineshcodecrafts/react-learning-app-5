import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers, deleteUserById, getAllUsers, testApiConnection } from "../../api/apiClient";
import { updateCount } from "../../store/slices/CountSlice";

import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ListUsersTable from "./ListUsersTable";
import ProfileBreadcrumbs from "../../components/ui/ProfileBreadcrumbs";

import ExportExcelButton from "../../components/ui/ExportExcelButton";

import {
  Clear as ClearIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import PageContainer from "../../components/ui/PageContainer";

const Users = () => {



  // USER DATA
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Excel column headings
  const exportData = useMemo(
    () => [
      { field: "id", headerName: "Id" },
      { field: "name", headerName: "Name" },
      { field: "email", headerName: "Email" },
      { field: "role", headerName: "Role" },
      { field: "gender", headerName: "Gender" },
    ],
    []
  );

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // DIALOG
  const [dialogState, setDialogState] = useState({
    open: false,
    type: null,
    id: null,
    msg: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // FETCH USERS
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      // filters removed → API sends only page, size, search
      const data = await fetchUsers(currentPage, pageSize, debouncedSearch);
      setUsers(data.data || []);
      setTotalRows(data.total || 0);
      dispatch(updateCount(data.data.length));
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, debouncedSearch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Confirm Action
  const handleConfirm = async () => {
    const { type, id } = dialogState;
    try {
      if (type === "delete") {
        await deleteUserById(id);
        await loadUsers();
      }
      if (type === "edit") {
        navigate(`/users/${id}/edit`);
      }
    } catch {
      setError(`Failed to ${type} user.`);
    }
    closeDialogBox();
  };

  // Dialog Functions
  const showDialogBox = (type, id, msg) =>
    setDialogState({ open: true, type, id, msg });

  const closeDialogBox = () =>
    setDialogState({ open: false, type: null, id: null, msg: "" });

  return (
    <PageContainer title="Users List">
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>

        <ProfileBreadcrumbs items={["Home", "Users List"]} />

        {/* Confirm Dialog */}
        <ConfirmDialog
          open={dialogState.open}
          title={dialogState.type === "delete" ? "Delete User" : "Edit User"}
          message={dialogState.msg}
          onClose={closeDialogBox}
          onConfirm={handleConfirm}
          confirmText={dialogState.type === "delete" ? "Delete" : "Edit"}
          confirmColor={dialogState.type === "delete" ? "error" : "primary"}
        />

        {/* Header */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4">Users List</Typography>
            <Typography variant="body2">Manage your team users</Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/users/new")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              borderRadius: 2,
            }}
          >
            Add User
          </Button>
        </Box>
        <Box
          sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
        ></Box>
        {/* Search */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          {/* Search (Left) */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm("")}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Export Excel (Right) */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <ExportExcelButton
              fetchData={getAllUsers}
              fileName="users.xlsx"
              columns={exportData}
            />
          </Grid>
        </Grid>

        {/* Users Table */}
        <ListUsersTable
          users={users}
          loading={loading}
          handleDelete={(id) =>
            showDialogBox("delete", id, "Are you sure you want to delete?")
          }
          handleEdit={(id) =>
            showDialogBox("edit", id, "Are you sure you want to edit?")
          }
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalRows={totalRows}
        />
      </Container>
    </PageContainer>
  );
};

export default Users;
