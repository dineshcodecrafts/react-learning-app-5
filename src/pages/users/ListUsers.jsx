import React, { useEffect, useState, useCallback } from "react";
import {
  Box, Container, TextField, Button, Typography, useTheme,
  useMediaQuery, Grid, Alert, Snackbar, Chip, MenuItem,
  InputAdornment, IconButton, Drawer, Divider
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers, deleteUserById } from "../../api/apiClient";
import { updateCount } from "../../store/CountSlice";

import ConfirmDialog from "../../components/ConfirmDialog";
import UsersTable from "./UsersTable";
import ProfileBreadcrumbs from "../../components/ProfileBreadcrumbs";

import {
  Clear as ClearIcon,
  Tune as TuneIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import PageContainer from "../../components/PageContainer";

const Users = () => {

  // USER DATA
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  // SEARCH & FILTERS
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({ status: "all", role: "all" });

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // DIALOG
  const [dialogState, setDialogState] = useState({
    open: false,
    type: null,
    id: null,
    msg: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Update count in Redux
  useEffect(() => {
    dispatch(updateCount(users.length));
  }, [users.length]);

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
      const data = await fetchUsers(currentPage, pageSize, debouncedSearch, filters);
      setUsers(data.data || []);
      setTotalRows(data.total || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, debouncedSearch, filters]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // HANDLE CONFIRM ACTION
  const handleConfirm = async () => {
    const { type, id } = dialogState;

    try {
      if (type === "delete") {
        await deleteUserById(id);
        await loadUsers();
      }
      if (type === "edit") {
        navigate(`/EditUser/${id}`);
      }
    } catch {
      setError(`Failed to ${type} user.`);
    }

    closeDialogBox();
  };

  // OPEN / CLOSE DIALOG
  const showDialogBox = (type, id, msg) =>
    setDialogState({ open: true, type, id, msg });

  const closeDialogBox = () =>
    setDialogState({ open: false, type: null, id: null, msg: "" });

  // FILTER CHANGE
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    if (isMobile) setFilterDrawerOpen(false);
  };

  const handleClearAllFilters = () => {
    setFilters({ status: "all", role: "all" });
    setCurrentPage(1);
  };

  // FILTER DRAWER UI
  const FilterDrawer = () => (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      PaperProps={{ sx: { width: isSmallMobile ? "100%" : 320, p: 3 } }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setFilterDrawerOpen(false)}>
          <ClearIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          fullWidth
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </TextField>

        <TextField
          select
          label="Role"
          value={filters.role}
          onChange={(e) => handleFilterChange("role", e.target.value)}
          fullWidth
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </TextField>

        <Button variant="outlined" onClick={handleClearAllFilters}>
          Clear All
        </Button>
        <Button variant="contained" onClick={() => setFilterDrawerOpen(false)}>
          Apply
        </Button>
      </Box>
    </Drawer>
  );

  return (
    <PageContainer title="Users List">
      <Container maxWidth="xl" sx={{ py: 3 }}>
        
        {/* ERROR SNACKBAR */}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>

        <FilterDrawer />

        <ProfileBreadcrumbs items={["Home", "User Management", "Users List"]} />

        {/* CONFIRM BOX */}
        <ConfirmDialog
          open={dialogState.open}
          title={dialogState.type === "delete" ? "Delete User" : "Edit User"}
          message={dialogState.msg}
          onClose={closeDialogBox}
          onConfirm={handleConfirm}
          confirmText={dialogState.type === "delete" ? "Delete" : "Edit"}
          confirmColor={dialogState.type === "delete" ? "error" : "primary"}
        />

        {/* HEADER */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4">Users List</Typography>
            <Typography variant="body2">Manage your team users</Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/AddUser")}
          >
            Add User
          </Button>
        </Box>

        {/* SEARCH */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
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

          {!isMobile && (
            <>
              <Grid item xs={6} md={3}>
                <TextField
                  select
                  label="Status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  fullWidth
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={6} md={3}>
                <TextField
                  select
                  label="Role"
                  value={filters.role}
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                  fullWidth
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </TextField>
              </Grid>
            </>
          )}

          {isMobile && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => setFilterDrawerOpen(true)}
                fullWidth
              >
                Filters
              </Button>
            </Grid>
          )}
        </Grid>

        {/* USERS TABLE */}
        <UsersTable
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
