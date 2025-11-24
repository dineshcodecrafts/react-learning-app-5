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
} from "@mui/material";

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

  // Validation
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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await addUser(form);
    alert("User added successfully!");
    navigate("/Users");
  };

  return (
    <>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}>
          ← Back
        </Button>
        <h2>Add User</h2>
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ maxWidth: "100%" }}>
              {/* Two-column Grid for Name and Email (smaller width, separate) */}
              {/* Two-column Grid for Name and Email (full width in each column) */}
              <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
              </Grid>
              {/* Password (full width) */}
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password}
              />

              {/* Role Dropdown */}
              <FormControl fullWidth required error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={form.role}
                  label="Role"
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
                {errors.role && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.role}
                  </span>
                )}
              </FormControl>

              {/* Active Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                  />
                }
                label="Active"
              />

              {/* Gender Radio */}
              <FormControl component="fieldset" required error={!!errors.gender}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  value={form.gender}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                {errors.gender && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.gender}
                  </span>
                )}
              </FormControl>

              {/* Submit Button */}
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#1a5882" }}
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>

    </>
  );
};

export default AddUser;
