import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { logoutUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";

export default function LogoutHandler({ open, setOpen }) {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    logoutUser();
    setOpen(false);
    toast.error("Logged out successfully!...");
    
    // Small delay to show the message before redirect
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">
        Confirm Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmLogout} color="error" autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}