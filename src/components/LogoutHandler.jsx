import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, 
         DialogContentText, Snackbar, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/usersApi"; // your API

const LogoutHandler = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = async () => {
    setLoading(true);

    await logoutUser(); // clear token API
    localStorage.removeItem("token");

    setLoading(false);
    setOpen(false);
    setSnackbar(true);

    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <>
      {/* Confirm Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button 
            color="error" 
            onClick={handleLogoutConfirm} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Logout"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar}
        autoHideDuration={1500}
        message="Logged out successfully"
        onClose={() => setSnackbar(false)}
      />
    </>
  );
};

export default LogoutHandler;
