import React from "react";
import {TextField,FormControl,InputLabel,Select,MenuItem,FormControlLabel,Checkbox,Radio,RadioGroup,FormLabel,Grid,FormHelperText,} from "@mui/material";

const UserForm = ({form,errors,onChange,mode = "add",submitting = false, }) => {

  const handleFieldChange = (field, value) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <form>
      <Grid container spacing={3}>
        {/* Name */}
        <Grid  size={6}>
          <TextField
          sx={{ width: { xs: "100%", sm: "70%", md: "100%" } }}
            label="Full Namee"
            value={form.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            fullWidth
            size="medium"
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
            sx={{ width: { xs: "100%", sm: "70%", md: "100%" } }}
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            fullWidth
            size="large"
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
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            fullWidth
            size="medium"
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

        {/* Role - FIXED */}
        <Grid size={6}>
        <FormControl
          fullWidth
          sx={{ width: { xs: "100%", sm: "70%", md: "100%" } }}
          size="medium"
          required
          error={!!errors.role}
          disabled={submitting}
        >
          <InputLabel id="role-select-label">User Role</InputLabel>
          <Select
            labelId="role-select-label"
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

        {/* Gender */}
        <Grid  size={12}>
          <FormControl
          sx={{ width: { xs: "100%", sm: "70%", md: "100%" } }}
            component="fieldset"
            required
            error={!!errors.gender}
            fullWidth
            disabled={submitting}
          >
            <FormLabel
              component="legend"
              sx={{ fontSize: "1rem", mb: 2, fontWeight: 500 }}
            >
              Gender
            </FormLabel>

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
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
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
