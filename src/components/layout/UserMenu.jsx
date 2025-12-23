import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";

const VITE_STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

export default function UserMenu({ onLogoutClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const profile = useSelector((state) => state.users.profile);

  const userData = JSON.parse(localStorage.getItem("userDatas"));

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfilePage = () => {
    handleClose();
    navigate("/Profile")
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogoutClick();
  };

  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip 
          label={`Welcome ${userData?.name || "Guest"} !..`}

          sx={{ color: "#fff", borderColor: "#fff" }} 
        />
        <Button
          id="user-menu-button"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {/* <Avatar alt="User Avatar" src="../../images/avatar.png" /> */}
          <Avatar alt="User Avatar" src={`${VITE_STORAGE_URL}${userData.profilePhoto}` || "../../images/avatar.png"} />
          
        </Button>
      </Stack>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleProfilePage}>
          <PersonIcon sx={{ mr: 1 }} />
          My Account 
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}