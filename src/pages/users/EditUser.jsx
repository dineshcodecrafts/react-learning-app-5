import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";

// MUI Imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const EditUser = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // Load user data
  useEffect(() => {
    getUserById(id).then(setForm);
  }, [id]);

  // Validation function
  const validate = () => {
    const temp = {};
    if (!form.name) temp.name = "Name is required";
    if (!form.email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      temp.email = "Email is not valid";
    }
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await updateUser(id, form);
    alert("User updated successfully!");
    navigate("/Users");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        ← Back
      </Button>

      

      <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
        sx={{
          maxWidth: 400,
          margin: "0 auto",       // center horizontally
          mt: 5,                  // optional: add top margin
        }}
      >
          <h2>Edit User</h2>
          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Update Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditUser;
