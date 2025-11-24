import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function PageLayout({ title, children }) {
  return (
    <Box
      className="MuiBox-root"
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Page Title */}
      <Typography variant="h5" fontWeight={700} mb={3}>
        {title}
      </Typography>

      {/* White Card Content */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 3 },
          minHeight: "calc(100vh - 150px)",
          borderRadius: 3,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
