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
import ExportPdf from "../../components/ui/ExportPdf";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  /** Helper responsive font */
  const font = (small, normal) => (isSmall ? small : normal);

  /** --------------------------
   * Empty State Component
   -------------------------- */
  const EmptyState = () => (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography sx={{ fontWeight: 600 }}>
        {loading ? "Loading users..." : "No users found"}
      </Typography>
      <Typography sx={{ fontSize: "0.8rem" }}>
        {loading ? "Please wait…" : "Add your first user to begin"}
      </Typography>
    </Box>
  );

  /** --------------------------
   * Mobile Card View
   -------------------------- */
  const MobileCard = ({ user }) => (
    <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
      <Typography fontWeight={600} fontSize="0.85rem">
        {user.name}
      </Typography>
      <Typography fontSize="0.75rem">ID: {user.id}</Typography>
      <Typography fontSize="0.75rem">{user.email}</Typography>

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <IconButton size="small" onClick={() => handleEdit(user.id)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete(user.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <ExportPdf user={user} size="small" />
      </Box>
    </Box>
  );

  /** --------------------------
   * If Mobile → Show Card View
   -------------------------- */
  if (isSmall) {
    if (loading) return <EmptyState />;
    if (!users.length) return <EmptyState />;

    return (
      <Box>
        {users.map((u) => (
          <MobileCard key={u.id} user={u} />
        ))}

        {/* Simple Pagination */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>

          <Typography fontSize="0.8rem">Page {currentPage}</Typography>

          <Button
            size="small"
            disabled={currentPage * pageSize >= totalRows}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    );
  }

  /** --------------------------
   * Desktop → DataGrid
   -------------------------- */
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography fontSize={font("0.75rem", "0.9rem")}>{value}</Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography fontSize={font("0.75rem", "0.85rem")}>{value}</Typography>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: ({ value }) => (
        <Typography fontSize={font("0.75rem", "0.85rem")} fontWeight={500}>
          {value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => handleEdit(params.row.id)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} size="small">
            <DeleteIcon />
          </IconButton>
          <ExportPdf user={params.row} size="small" />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={totalRows}
        loading={loading}
        pageSizeOptions={[5, 10, 20, 50]}
        paginationModel={{ page: currentPage - 1, pageSize }}
        onPaginationModelChange={(m) => {
          setCurrentPage(m.page + 1);
          setPageSize(m.pageSize);
        }}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: EmptyState }}
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            fontSize: font("0.75rem", "0.85rem"),
          },
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: 600,
          },
        }}
      />
    </Box>
  );
}
