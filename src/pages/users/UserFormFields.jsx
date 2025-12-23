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
  Dialog,
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

  // 🔥 Modal Preview States
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleOpenPreview = (src) => {
    setPreviewImage(src);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

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

  const API_URL = `http://127.0.0.1:8000/`;

  return (
    <form>
      <Grid container spacing={3}>

        {/* Name */}
        <Grid size={6}>
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
        <Grid size={6}>
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
        <Grid size={6}>
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
        <Grid size={6}>
          <FormControl
            fullWidth
            size="medium"
            required
            error={!!errors.role}
            disabled={submitting}
          >
            <InputLabel>User Role </InputLabel>
            <Select
              value={form.role}
              label="User Role"
              onChange={(e) => handleFieldChange("role", e.target.value)}
            >
              <MenuItem value="admin">Administrator</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText error>{errors.role}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Profile Photo */}
        <Grid size={6}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 1 }}
            >
              Upload Profile Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {/* Show photo preview */}
            {form.profile_photo && (
              <Box sx={{ mt: 2 }}>
                {/* 🔥 EXISTING IMAGE FROM DATABASE */}
                {typeof form.profile_photo === "string" &&
                form.profile_photo.includes("/") ? (
                  <Box>
                     <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                        sx={{ cursor: "pointer", color: "primary.main" }}
                        onClick={() =>
                          handleOpenPreview(`${API_URL}storage/${form.profile_photo}`)
                        }
                      >
                        View
                      </Typography>
                      <br></br>
                    <img
                      src={`${API_URL}storage/${form.profile_photo}`}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #e0e0e0",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleOpenPreview(
                          `${API_URL}storage/${form.profile_photo}`
                        )
                      }
                    />
                    <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                      Current Profile
                    </Typography>
                  </Box>
                ) : form.profile_photo instanceof File ? (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Selected: {form.profile_photo.name}
                    </Typography>

                    {/* 🔥 NEW UPLOADED FILE PREVIEW */}
                    <img
                      src={URL.createObjectURL(form.profile_photo)}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #e0e0e0",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                      onClick={() =>
                        handleOpenPreview(
                          URL.createObjectURL(form.profile_photo)
                        )
                      }
                    />
                  </Box>
                ) : null}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Gender */}
        <Grid size={8}>
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
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            {errors.gender && (
              <FormHelperText error>{errors.gender}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Active Status */}
        <Grid size={8}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              pt: 2,
            }}
          >
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
          </Box>
        </Grid>
      </Grid>

      {/* 🔥 IMAGE PREVIEW MODAL */}
      <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="md">
        <Box sx={{ p: 2, textAlign: "center" }}>
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Dialog>
    </form>
  );
};

export default UserForm;
