import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
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
  Divider,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const EditUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: false,
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Load user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setForm({
          name: data.name || "",
          email: data.email || "",
          password: "", // optional: blank password
          role: data.role || "",
          isActive: data.isActive || false,
          gender: data.gender || "",
        });
      } catch (err) {
        console.error("Failed to load user:", err);
        alert("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Validation
  const validate = () => {
    const temp = {};
    if (!form.name) temp.name = "Name is required";
    if (!form.email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      temp.email = "Email is not valid";
    }
    if (!form.role) temp.role = "Role is required";
    if (!form.gender) temp.gender = "Gender is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await updateUser(id, form);
      alert("User updated successfully!");
      navigate("/Users");
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update user. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, textTransform: "none" }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1" fontWeight="600" color="primary">
          Edit User
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update user information and account settings
        </Typography>
      </Box>

      {/* Form Section */}
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Basic Information Section */}
              <Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 3, color: "primary.main" }}>
                  Basic Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name}
                      placeholder="Enter full name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="user@example.com"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      fullWidth
                      helperText="Leave blank to keep current password"
                      placeholder="Enter new password to change"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Account Settings Section */}
              <Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 3, color: "primary.main" }}>
                  Account Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth required error={!!errors.role}>
                      <InputLabel id="role-label">User Role</InputLabel>
                      <Select
                        labelId="role-label"
                        value={form.role}
                        label="User Role"
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                      >
                        <MenuItem value="admin">Administrator</MenuItem>
                        <MenuItem value="editor">Editor</MenuItem>
                        <MenuItem value="viewer">Viewer</MenuItem>
                      </Select>
                      {errors.role && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                          {errors.role}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset" required error={!!errors.gender} fullWidth>
                      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                      {errors.gender && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                          {errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Account Status */}
              <Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: "primary.main" }}>
                  Account Status
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight="500">
                        Activate User Account
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        User will be able to access the system immediately
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                  sx={{ textTransform: "none", px: 4 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  sx={{ 
                    textTransform: "none", 
                    px: 4,
                    background: "linear-gradient(45deg, #1a5882 30%, #2c77b1 90%)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #14476b 30%, #1a5882 90%)",
                    }
                  }}
                  size="large"
                  startIcon={submitting ? <CircularProgress size={20} /> : null}
                >
                  {submitting ? "Updating..." : "Update User"}
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditUser;