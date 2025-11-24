import React, { useState } from "react";
import { addUser } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: false,
    gender: "",
  });

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
    if (!form.role) temp.role = "Role is required";
    if (!form.gender) temp.gender = "Gender is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await addUser(form);
      alert("User added successfully!");
      navigate("/Users");
    } catch (err) {
      console.error("Failed to add user:", err);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 1 }}
          size="small"
        >
          Back
        </Button>
        <Typography variant="h5" fontWeight="600">
          Add New User
        </Typography>
      </Box>

      {/* Form */}
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* Basic Information */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    fullWidth
                    size="small"
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    fullWidth
                    size="small"
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    fullWidth
                    size="small"
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
              </Grid>

              {/* Account Settings */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small" required error={!!errors.role}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={form.role}
                      label="Role"
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="editor">Editor</MenuItem>
                      <MenuItem value="viewer">Viewer</MenuItem>
                    </Select>
                    {errors.role && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                        {errors.role}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" required error={!!errors.gender} fullWidth>
                    <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                      <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                      <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                      <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                    </RadioGroup>
                    {errors.gender && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                        {errors.gender}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {/* Account Status */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    size="small"
                  />
                }
                label="Active User Account"
              />

              {/* Actions */}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                >
                  Create User
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddUser;