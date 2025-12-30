import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * @param {Function} fetchData - API function that returns ALL rows
 * @param {String} fileName - Excel file name
 * @param {Array} columns - Optional: [{ field, headerName }]
 */
const ExportExcelButton = ({ fetchData, fileName = "data.xlsx", columns }) => {
  const handleExport = async () => {
    try {
      const response = await fetchData();
      const rows = response.data || response;

      // Optional: map only required columns
      const formattedRows = columns
        ? rows.map((row) =>
            columns.reduce((acc, col) => {
              acc[col.headerName] = row[col.field];
              return acc;
            }, {})
          )
        : rows;

      const worksheet = XLSX.utils.json_to_sheet(formattedRows);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const file = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(file, fileName);
    } catch (error) {
      console.error("Excel export failed", error);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<FileDownloadIcon />}
      onClick={handleExport}
    >
      Export Excel
    </Button>
  );
};

export default ExportExcelButton;
