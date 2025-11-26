import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UserForm from "./UserForm";

import PageContainer from "../../components/PageContainer";
import CustomSnackbar from "../../components/CustomSnackbar";

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserById(id);
        setForm({
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          role: userData.role || "",
          isActive: userData.isActive || false,
          gender: userData.gender || "",
        });
      } catch (error) {
        console.error("Failed to load user:", error);
        alert("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!form.role) newErrors.role = "Role is required";
    if (!form.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await updateUser(id, form);
      setSnackbar({
        open: true,
        message: "User Updated successfully!",
        severity: "success",
      });

      setTimeout(() => navigate("/Users"), 900);
    } catch (error) {
      console.error("Failed to update user:", error);
      setSnackbar({
        open: true,
        message: "Failed to update user. Please try again.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (newForm) => {
    setForm(newForm);
    // Clear errors when user starts typing in a field that had an error
    const fieldWithError = Object.keys(errors).find(
      (key) => newForm[key] !== form[key]
    );
    if (fieldWithError && errors[fieldWithError]) {
      const newErrors = { ...errors };
      delete newErrors[fieldWithError];
      setErrors(newErrors);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <PageContainer title="Edit User">
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, color: "text.secondary", textTransform: "none" }}
        >
          Back to Users
        </Button>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Edit User
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update user information and permissions
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <UserForm
          form={form}
          errors={errors}
          onChange={handleFormChange}
          mode="edit"
          submitting={submitting}
        />

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
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={submitting}
            sx={{
              textTransform: "none",
              minWidth: 150,
            }}
            size="large"
          >
            {submitting ? "Updating..." : "Update User"}
          </Button>
        </Box>
      </form>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </PageContainer>
  );
};

export default EditUser;
