import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ExportPdf from "../../components/ExportPdf";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({
  users,
  handleDelete,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalRows,
  columns_data,
}) {

  const navigate = useNavigate();
  const columns = columns_data;

  const sample_columns = [
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
            onClick={() => navigate(`/EditUser/${params.row.id}`)}
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
    <Paper sx={{ height: "100%", width: "100%" }}>
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
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
