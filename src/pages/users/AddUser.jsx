import React, { useState } from "react";
import { addUser } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UserForm from "./UserForm";

import CustomSnackbar from "../../components/CustomSnackbar";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profile_photo: null,
    role: "",
    isActive: true,
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  // -------------------------------
  // FORM VALIDATION
  // -------------------------------
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";

    if (!form.password) newErrors.password = "Password is required";
    if (!form.role) newErrors.role = "Role is required";
    if (!form.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------------
  // HANDLE SUBMIT
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("role", form.role);
    formData.append("gender", form.gender);
    formData.append("isActive", form.isActive ? 1 : 0);

    if (form.profile_photo) {
      formData.append("profile_photo", form.profile_photo);
    }

    try {
      await addUser(formData);
      setSnackbar({
        open: true,
        message: "User created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/Users"), 800);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to create user!",
        severity: "error",
      });
    }

    setSubmitting(false);
  };

  const handleFormChange = (newForm) => {
    setForm(newForm);

    const changedField = Object.keys(errors).find(
      (key) => newForm[key] !== form[key]
    );

    if (changedField && errors[changedField]) {
      const updated = { ...errors };
      delete updated[changedField];
      setErrors(updated);
    }
  };

  return (
    <Box
      sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Container maxWidth={false} sx={{ py: 3, px: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2, color: "text.secondary", textTransform: "none" }}
          >
            Back to Users
          </Button>

          <Typography variant="h4" fontWeight={600}>
            Add New User
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Create a new user account with appropriate permissions.
          </Typography>
        </Box>

        {/* Form */}
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <UserForm
                form={form}
                errors={errors}
                onChange={handleFormChange}
                mode="add"
                submitting={submitting}
              />

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  pt: 3,
                  borderTop: 1,
                  borderColor: "divider",
                  mt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                  sx={{ textTransform: "none", minWidth: 120 }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  sx={{ textTransform: "none", minWidth: 150 }}
                >
                  {submitting ? "Creating..." : "Create User"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default AddUser;
