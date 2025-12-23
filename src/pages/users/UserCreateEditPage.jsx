import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getUserById, updateUser } from "../../api/apiClient";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UserFormFields from "./UserFormFields";
import CustomSnackbar from "../../components/ui/CustomSnackbar";
import LinearProgress from '@mui/material/LinearProgress';


const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  role: "",
  gender: "",
  isActive: true,
  profile_photo: null,
};

const UserCreateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // 🔹 Load user for edit
  useEffect(() => {
    if (!isEdit) return;

    const loadUser = async () => {
      try {
        const user = await getUserById(id);
        setForm({
          name: user.name || "",
          email: user.email || "",
          password: "",
          role: user.role || "",
          gender: user.gender || "",
          isActive: !!user.isActive,
          profile_photo: user.profile_photo || "",
        });
      } catch {
        setSnackbar({
          open: true,
          message: "Failed to load user",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, isEdit]);

  // 🔹 Validation (shared)
  const validateForm = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";

    if (!isEdit && !form.password) e.password = "Password is required";
    if (!form.role) e.role = "Role is required";
    if (!form.gender) e.gender = "Gender is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // 🔹 Submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, key === "isActive" ? (value ? 1 : 0) : value);
      }
    });

    try {
      if (isEdit) {
        await updateUser(id, formData);
      } else {
        await addUser(formData);
      }

      setSnackbar({
        open: true,
        message: isEdit
          ? "User updated successfully!"
          : "User created successfully!",
        severity: "success",
      });

      setTimeout(() => navigate("/Users"), 800);
    } catch {
      setSnackbar({
        open: true,
        message: "Operation failed. Please try again.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (newForm) => {
    setForm(newForm);
    const cleared = { ...errors };
    Object.keys(newForm).forEach((k) => {
      if (errors[k] && newForm[k] !== form[k]) delete cleared[k];
    });
    setErrors(cleared);
  };

  if (loading) {
    return (
        <>
        <Box sx={{width: "100%",display: "flex",justifyContent: "center",alignItems: "center",}}>
            <LinearProgress sx={{ width: "100%" }} />
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth={false} sx={{ py: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Back to Users
        </Button>

        <Typography variant="h4" fontWeight={600}>
          {isEdit ? "Edit User" : "Add New User"}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {isEdit
            ? "Update user information and permissions"
            : "Create a new user account"}
        </Typography>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <UserFormFields
                form={form}
                errors={errors}
                onChange={handleFormChange}
                mode={isEdit ? "edit" : "add"}
                submitting={submitting}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={submitting}>
                  {submitting
                    ? isEdit ? "Updating..." : "Creating..."
                    : isEdit ? "Update User" : "Create User"}
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

export default UserCreateEditPage;
