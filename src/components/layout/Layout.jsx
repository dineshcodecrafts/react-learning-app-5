import React, { useState } from "react";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import UserMenu from "./UserMenu";
import LogoutHandler from "./LogoutHandler";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar open={open} onDrawerOpen={handleDrawerOpen}>
        <UserMenu onLogoutClick={handleLogoutClick} />
      </AppBar>

      <LogoutHandler open={logoutOpen} setOpen={setLogoutOpen} />

      <Drawer open={open} onClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ height: '64px' }} /> {/* Spacer for AppBar */}
        {children}
      </Box>
    </Box>
  );
}