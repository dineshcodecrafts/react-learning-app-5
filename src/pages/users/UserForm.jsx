import React, { useState } from "react";
import {
  TextField,
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
  FormHelperText,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UserForm = ({
  form,
  errors,
  onChange,
  mode = "add",
  submitting = false,
}) => {
  const [fileName, setFileName] = useState("");

  // Handle Input Fields
  const handleFieldChange = (field, value) => {
    onChange({ ...form, [field]: value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleFieldChange("profile_photo", file);
      setFileName(file.name);
    }
  };

  return (
    <form>
      <Grid container spacing={3}>
        
        {/* Name */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={form.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            required
            error={!!errors.name}
            helperText={errors.name}
            placeholder="Enter user's full name"
            disabled={submitting}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            required
            error={!!errors.email}
            helperText={errors.email}
            placeholder="user@company.com"
            disabled={submitting}
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            required={mode === "add"}
            error={!!errors.password}
            helperText={
              mode === "edit"
                ? "Leave blank to keep current password"
                : errors.password
            }
            placeholder={
              mode === "add"
                ? "Enter secure password"
                : "Enter new password to change"
            }
            disabled={submitting}
          />
        </Grid>

        {/* Role */}
        <Grid item xs={12} md={4}>
          <FormControl
            fullWidth
            size="medium"
            required
            error={!!errors.role}
            disabled={submitting}
          >
            <InputLabel>User Role</InputLabel>
            <Select
              value={form.role}
              label="User Role"
              onChange={(e) => handleFieldChange("role", e.target.value)}
            >
              <MenuItem value="admin">Administrator</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
            {errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Profile Photo */}
        <Grid item xs={12} md={4}>
          <Box>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Profile Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {/* Display Selected File Name */}
            {form.profile_photo && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {form.profile_photo.name}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Gender */}
        <Grid item xs={12}>
          <FormControl
            fullWidth
            required
            error={!!errors.gender}
            disabled={submitting}
          >
            <FormLabel sx={{ mb: 1 }}>Gender</FormLabel>

            <RadioGroup
              row
              value={form.gender}
              onChange={(e) => handleFieldChange("gender", e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>

            {errors.gender && (
              <FormHelperText error>{errors.gender}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Active Status */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isActive}
                onChange={(e) =>
                  handleFieldChange("isActive", e.target.checked)
                }
                disabled={submitting}
              />
            }
            label={
              mode === "add"
                ? "Activate user account immediately"
                : "User account is active"
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
