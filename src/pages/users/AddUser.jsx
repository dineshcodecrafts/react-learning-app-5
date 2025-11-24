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
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UserForm from "./UserForm";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Valid email is required";
    }
    
    if (!form.password) newErrors.password = "Password is required";
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
      await addUser(form);
      alert("User added successfully!");
      navigate("/Users");
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("Failed to add user. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (newForm) => {
    setForm(newForm);
    // Clear errors when user starts typing in a field that had an error
    const fieldWithError = Object.keys(errors).find(key => newForm[key] !== form[key]);
    if (fieldWithError && errors[fieldWithError]) {
      const newErrors = { ...errors };
      delete newErrors[fieldWithError];
      setErrors(newErrors);
    }
  };

  return (


    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth={false} sx={{ py: 3, px: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3, width: "100%" }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2, color: "text.secondary", textTransform: "none" }}
          >
            Back to Users
          </Button>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Add New User
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create a new user account with appropriate permissions
          </Typography>
        </Box>

        {/* Form */}
        <Card elevation={2} sx={{ borderRadius: 2, width: "100%" }}>
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
              <Box sx={{ 
                display: "flex", 
                gap: 2, 
                justifyContent: "flex-end",
                pt: 3,
                borderTop: 1,
                borderColor: 'divider',
                mt: 3
              }}>
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
                    minWidth: 150
                  }}
                  size="large"
                >
                  {submitting ? "Creating..." : "Create User"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AddUser;