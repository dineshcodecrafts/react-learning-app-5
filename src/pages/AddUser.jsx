import React, { useState } from "react";
import { addUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const AddUser = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const temp = {};
    if (!form.name) temp.name = "Name is required";
    if (!form.email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      temp.email = "Email is not valid";
    }
    if (!form.password) temp.password = "Password is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await addUser(form);
    alert("User added successfully!");
    navigate("/Users");
  };

  return (

    <>
    {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "10px",
          backgroundColor: "#ccc",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        >
        ← Back  {localStorage.getItem("Auth_key") };
      </button>
      <center>
      <h2>Add User</h2>
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ maxWidth: 350 }}>
            <TextField
              label="Name"
              variant="outlined"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#1a5882",   // custom green
              }}
              >
              Save
            </Button>
          </Stack>
        </form>
      </Box>
      </center>
    </>
  );
};

export default AddUser;
