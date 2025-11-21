import React from "react";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export default function ProfileBreadcrumbs({ items = [] }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-li": {
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          // First Item → Home icon
          if (index === 0) {
            return (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                href="/dashboard"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {item}
              </Link>
            );
          }

          return isLast ? (
            <Typography key={index} color="text.primary">
              {item}
            </Typography>
          ) : (
            <Link key={index} underline="hover" color="inherit" href="#">
              {item}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
