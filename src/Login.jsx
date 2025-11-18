import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";

import { loginUser } from "./api/usersApi"; // make sure path is correct

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("Auth_key", data.token); // store token
        navigate("/"); // redirect to dashboard/home
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#f5f5f5" }}
    >
      <Grid item xs={11} sm={8} md={4}>
        <Paper elevation={6} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;