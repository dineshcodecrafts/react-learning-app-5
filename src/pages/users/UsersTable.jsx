import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportPdf from "../../components/ExportPdf";

export default function UsersTable({
  users = [],
  handleDelete,
  handleEdit,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalRows,
  loading = false,
}) {
  const theme = useTheme();

  // Responsive breakpoints
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /** ------------------------------------
   * DataGrid Columns
   * ------------------------------------ */
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: isSmallMobile ? 60 : isMobile ? 80 : 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontSize: isSmallMobile ? "0.7rem" : "0.8rem",
            fontWeight: 600,
            color: "black",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: isSmallMobile ? 100 : isMobile ? 150 : 200,
      minWidth: isSmallMobile ? 80 : 100,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontSize: isSmallMobile ? "0.75rem" : "0.875rem",
            fontWeight: 500,
            color: "black",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: isSmallMobile ? 150 : isMobile ? 200 : 250,
      minWidth: isSmallMobile ? 120 : 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: isSmallMobile ? "0.7rem" : "0.8rem", color: "black" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isSmallMobile ? 120 : isMobile ? 150 : 200,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 0.5 : 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            size={isMobile ? "small" : "medium"}
            sx={{
              color: "black",
              padding: isMobile ? "2px" : "4px",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
            }}
            aria-label={`Edit user ${params.row.name}`}
          >
            <EditIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>

          <IconButton
            onClick={() => handleDelete(params.row.id)}
            size={isMobile ? "small" : "medium"}
            sx={{
              color: "black",
              padding: isMobile ? "2px" : "4px",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
            }}
            aria-label={`Delete user ${params.row.name}`}
          >
            <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>

          <ExportPdf user={params.row} size={isMobile ? "small" : "medium"} />
        </Box>
      ),
    },
  ];

  /** ------------------------------------
   * Mobile Card View
   * ------------------------------------ */
  const MobileCardView = ({ user }) => (
    <Box
      sx={{
        p: 2,
        mb: 1,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" fontSize="0.8rem" color="black">
            {user.name}
          </Typography>
          <Typography variant="caption" fontSize="0.7rem" color="black">
            ID: {user.id}
          </Typography>
        </Box>
        <Typography variant="caption" fontSize="0.7rem" color="black">
          {user.email}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}>
        <IconButton onClick={() => handleEdit(user.id)} size="small" sx={{ color: "black", padding: "4px" }}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleDelete(user.id)} size="small" sx={{ color: "black", padding: "4px" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <ExportPdf user={user} size="small" />
      </Box>
    </Box>
  );

  /** ------------------------------------
   * Empty State
   * ------------------------------------ */
  const EmptyState = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, color: "black" }}>
        {loading ? "Loading users..." : "No users found"}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" }, color: "black" }}>
        {loading
          ? "Please wait while we load your users"
          : "Get started by adding your first user to the system"}
      </Typography>
    </Box>
  );

  /** ------------------------------------
   * Render Mobile View if small screen
   * ------------------------------------ */
  if (isSmallMobile) {
    return (
      <Box sx={{ width: "100%" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <Typography color="black">Loading users...</Typography>
          </Box>
        ) : users.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {users.map((user) => (
              <MobileCardView key={user.id} user={user} />
            ))}

            {/* Simple pagination for mobile */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, p: 1 }}>
              <Button
                size="small"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                sx={{ color: "black" }}
              >
                Previous
              </Button>
              <Typography variant="body2" fontSize="0.8rem" color="black">
                Page {currentPage}
              </Typography>
              <Button
                size="small"
                disabled={currentPage * pageSize >= totalRows}
                onClick={() => setCurrentPage(currentPage + 1)}
                sx={{ color: "black" }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Box>
    );
  }

  /** ------------------------------------
   * Render DataGrid for larger screens
   * ------------------------------------ */
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={totalRows}
        pageSizeOptions={[5, 10, 20, 50]}
        paginationModel={{ page: currentPage - 1, pageSize }}
        onPaginationModelChange={(model) => {
          setCurrentPage(model.page + 1);
          setPageSize(model.pageSize);
        }}
        loading={loading}
        disableRowSelectionOnClick
        density={isMobile ? "compact" : "standard"}
        slots={{ noRowsOverlay: EmptyState }}
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            padding: isMobile ? "4px 8px" : "8px 16px",
            borderBottom: "1px solid #e0e0e0",
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            display: "flex",
            alignItems: "center",
            color: "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "white",
            color: "black",
            borderBottom: "2px solid #e0e0e0",
            padding: isMobile ? "8px 4px" : "8px 16px",
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
          },
          "& .MuiDataGrid-row:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
          "& .MuiDataGrid-footerContainer": { borderTop: "1px solid #e0e0e0", color: "black" },
        }}
      />
    </Box>
  );
}
