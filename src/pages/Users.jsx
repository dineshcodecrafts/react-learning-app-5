import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Alert,
  Snackbar,
  Chip,
  MenuItem,
  InputAdornment,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers, deleteUserById } from "../api/usersApi";
import { updateCount } from "../Store/CountSlice";
import ConfirmDialog from "../components/ConfirmDialog";
import DataTable from "./PageComponents/DataTable";
import ProfileBreadcrumbs from '../components/ProfileBreadcrumbs';
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import PageLayout from "./PageLayout";

const Users = () => {
  // State: users & loading
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);

  // Search and Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    role: "all"
  });

  // Mobile filter drawer
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Single dialog state for both actions: { open, type: 'delete'|'edit'|null, id }
  const [dialogState, setDialogState] = useState({ 
    open: false, 
    type: null, 
    id: null 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update redux count
  useEffect(() => {
    dispatch(updateCount(users.length));
  }, [users.length, dispatch]);

  // Debounce search implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load users with error handling
  const loadUsers = useCallback(async (page = 1, limit = pageSize) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers(page, limit, debouncedSearch, filters);
      setUsers(data.data || []);
      setTotalRows(data.total || 0);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters, pageSize]);

  // Reload when page/search/filters changes
  useEffect(() => {
    loadUsers(currentPage, pageSize);
  }, [currentPage, pageSize, debouncedSearch, filters, loadUsers]);

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

    try {
      if (type === "delete") {
        await deleteUserById(id);
        await loadUsers(currentPage, pageSize);
      } else if (type === "edit") {
        navigate(`/EditUser/${id}`);
      }
    } catch (err) {
      setError(`Failed to ${type} user. Please try again.`);
    } finally {
      closeDialog();
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
    if (isMobile) {
      setFilterDrawerOpen(false);
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setError(null);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({
      status: "all",
      role: "all"
    });
    setCurrentPage(1);
  };

  // Mobile Filter Drawer Component
  const FilterDrawer = () => (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: isSmallMobile ? '100%' : 320,
          p: 3
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="black">
          Filters
        </Typography>
        <IconButton onClick={() => setFilterDrawerOpen(false)}>
          <ClearIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          variant="outlined"
          size="medium"
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
          onChange={(e) => handleFilterChange('role', e.target.value)}
          variant="outlined"
          size="medium"
          fullWidth
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </TextField>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClearAllFilters}
            fullWidth
            sx={{
              borderColor: 'black',
              color: 'black',
              '&:hover': {
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            onClick={() => setFilterDrawerOpen(false)}
            fullWidth
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              }
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (

    <PageLayout title="Add New Record">
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 2, md: 3 }, 
        px: { xs: 2, md: 3 },
        minHeight: '100vh'
      }}
    >
      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Filter Drawer for Mobile */}
      <FilterDrawer />

      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <ProfileBreadcrumbs items={["Home", "User Management", "Users List"]} />
      </Box>

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

      {/* Header Section - Black Text, No Border */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: { xs: 0, md: 0 },
            py: 1,
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ 
            flex: 1, 
            textAlign: { xs: "center", sm: "left" },
            mb: { xs: 2, sm: 0 }
          }}>
            <Typography 
              variant="h5" 
              fontWeight={700} 
              fontSize={{ xs: "1.5rem", sm: "1.75rem", md: "2.125rem" }}
              gutterBottom
              color="black"
            >
              Users List
            </Typography>
            <Typography 
              variant="body1" 
              fontSize={{ xs: "0.8rem", sm: "0.875rem" }}
              color="black"
            >
              Manage your team members and their account permissions
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/AddUser")}
            sx={{
              background: "black",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              boxShadow: "none",
              '&:hover': {
                background: "#333",
              },
              minWidth: { xs: "100%", sm: "auto" },
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* Search and Filters Section - No Border */}
      <Box
        sx={{
          p: { xs: 0, sm: 0 },
          mb: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} md={6}>
            <TextField
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearSearch}
                      edge="end"
                      size="small"
                      aria-label="Clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1
                }
              }}
            />
          </Grid>

          {/* Filters for Desktop */}
          {!isMobile && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  label="Status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  label="Role"
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                  variant="outlined"
                  size="small"
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
          
          {/* Filter Button for Mobile */}
          {isMobile && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => setFilterDrawerOpen(true)}
                startIcon={<TuneIcon />}
                fullWidth
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  '&:hover': {
                    borderColor: 'black',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                Filters
              </Button>
            </Grid>
          )}
        </Grid>

        {/* Active Filters Display */}
        {(filters.status !== 'all' || filters.role !== 'all') && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                alignSelf: 'center',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                color: 'black'
              }}
            >
              Active filters:
            </Typography>
            {filters.status !== 'all' && (
              <Chip
                label={`Status: ${filters.status}`}
                size="small"
                onDelete={() => handleFilterChange('status', 'all')}
                sx={{ 
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  backgroundColor: 'black',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white'
                  }
                }}
              />
            )}
            {filters.role !== 'all' && (
              <Chip
                label={`Role: ${filters.role}`}
                size="small"
                onDelete={() => handleFilterChange('role', 'all')}
                sx={{ 
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  backgroundColor: 'black',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white'
                  }
                }}
              />
            )}
            <Button
              size="small"
              onClick={handleClearAllFilters}
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                minWidth: 'auto',
                color: 'black'
              }}
            >
              Clear All
            </Button>
          </Box>
        )}
      </Box>

      {/* DataTable Section - No Border */}
      <Box
        sx={{
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        <DataTable
          users={users}
          loading={loading}
          handleDelete={(id) => openDialog("delete", id)}
          handleEdit={(id) => openDialog("edit", id)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalRows={totalRows}
        />
      </Box>
    </Container>
    </PageLayout>
  );
};

export default Users;