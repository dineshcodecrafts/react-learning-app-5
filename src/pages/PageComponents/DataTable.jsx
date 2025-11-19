import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import ExportPdf from "../../components/ExportPdf";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({
  users,
  handleDelete,
  handleEdit,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalRows,
  loading = false, // pass loading from parent
}) {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 350 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: 8 }}>
          <EditIcon
            sx={{
              fontSize: 40,
              padding: "10px",
              cursor: "pointer",
              color: "#1a5882",
            }}
            onClick={() => handleEdit(params.row.id)}
          />

          <DeleteIcon
            sx={{
              fontSize: 40,
              padding: "10px",
              cursor: "pointer",
              color: "black",
            }}
            onClick={() => handleDelete(params.row.id)}
          />

          <ExportPdf user={params.row} />
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: "100%", width: "100%", mt: 2 }}> {/* fixed height */}
      <DataGrid
        rows={users}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={totalRows}
        pageSizeOptions={[5, 10, 20, 50]}
        paginationModel={{
          page: currentPage - 1,
          pageSize: pageSize,
        }}
        onPaginationModelChange={(model) => {
          setCurrentPage(model.page + 1);
          setPageSize(model.pageSize);
        }}
        loading={loading} // this triggers built-in spinner overlay
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
