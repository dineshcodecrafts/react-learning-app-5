import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const authKey = localStorage.getItem("token"); // read inside effect
    if (authKey) {
      navigate("/dashboard", { replace: true }); // redirect to dashboard
    }
  }, [navigate]);

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
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // redirect to dashboard
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
      style={{
        minHeight: "100vh",
        background: "white",
      }}
    >
      <Grid item xs={11} sm={8} md={4}>
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            borderRadius: 3,
            backgroundColor: "#ffffffcc",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1a5882" }}
          >
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#1a5882",
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#1a5882",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={loading}
              sx={{
                backgroundColor: "#1a5882",
                "&:hover": {
                  backgroundColor: "#15446a",
                },
                fontWeight: "bold",
                mt: 1,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
