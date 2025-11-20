import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid
} from "@mui/material";

// Password Field Component
const PasswordField = ({ 
  label, 
  value, 
  onChange 
}) => (
  <TextField
    type="password"
    fullWidth
    label={label}
    value={value}
    onChange={onChange}
  />
);

// Submit Button Component
const SubmitButton = () => (
  <Button
    type="submit"
    variant="contained"
    fullWidth
    sx={{
      background: "#1a5882",
      "&:hover": { 
        background: "#144568" 
      },
      py: 1,
    }}
  >
    Update Profile
  </Button>
);

// Main Component
const ProfileAccount = () => {
  const [username, setUsername] = useState("Dinesh");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    alert("Profile updated successfully!");
  };

  return (
    <>
    <Box sx={{ p: 3 }}>
    
      <Paper 
        sx={{ 
          p: 4, 
          maxWidth: "100%", 
          mx: "auto" 
        }} 
        elevation={3}
      >
        <Typography 
          variant="h5" 
          mb={3} 
          fontWeight="bold"
        >
          Profile Settings
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                label="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <SubmitButton />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
    </>
  );
};

export default ProfileAccount;