import React, { useState,useEffect  } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ProfileBreadcrumbs from "../components/ui/ProfileBreadcrumbs";

import { getUserById, updateUser } from "../api/apiClient";

export default function ProfileAccount() {

  const APIURL = import.meta.env.VITE_API_URL;
  const VITE_STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  const [firstName, setFirstName] = useState("");
  const [gender, setgender] = useState("");
  const [eMail, seteMail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setprofilePhoto] = useState("");
  const [uploadPreview, setUploadPreview] = useState(null);


  useEffect(() => {
    const userDatas = JSON.parse(localStorage.getItem("userDatas"));
    const load = async () => {
   
      try {
        const data = await getUserById(userDatas.id);
        console.log('new');
        console.log(data);

        // alert('welcome');

        setFirstName(data.name);
        setgender(data.gender);
        seteMail(data.email);
        // phone(data.email);
        setprofilePhoto(`${data.profile_photo}`)  // use URL from API

        // alert('welcome');

      } catch (err) {

      } finally {

      }

    };

    load();
  }, []);




  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <>


      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <ProfileBreadcrumbs items={["Home", "Profile Settings", "Profile"]} />
        <Typography variant="h5" mb={2} fontWeight={700}>
          Profile {APIURL}
        </Typography>

        <Paper elevation={1} sx={{ overflow: "hidden" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#0e3047",
              color: "#fff",
              px: { xs: 2, md: 4 },
              py: 3,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            {/* Profile Picture with Upload Overlay */}
            <Box
              sx={{
                position: "relative",
                mr: { xs: 0, sm: 2 },
                mb: { xs: 1, sm: 0 },
              }}
            >
              <Avatar
                // src={profilePhoto || ""}
                src={`${VITE_STORAGE_URL}${profilePhoto}` || ""}
                sx={{
                  width: { xs: 80, sm: 100 },
                  height: { xs: 80, sm: 100 },
                  border: "3px solid white",
                }}
              />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                    color: "#0e3047",
                    width: 32,
                    height: 32,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </label>
            </Box>

            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", sm: "left" },
                mb: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                fontSize={{ xs: "1.1rem", sm: "1.25rem" }}
              >
                {firstName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  mt: 1,
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MailIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    fontSize={{ xs: "0.8rem", sm: "0.875rem" }}
                  >
                    {eMail}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    fontSize={{ xs: "0.8rem", sm: "0.875rem" }}
                  > 
                    {/* {profile.phone} */}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                background: "#fff",
                color: "#0e3047",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                boxShadow: "none",
                "&:hover": {
                  background: "#f5f5f5",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>

          {/* Content */}
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="subtitle1" fontWeight={700} mb={3}>
              Personal Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Gender"
                  fullWidth
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  value={eMail}
                  onChange={(e) => seteMail(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Profile Picture Upload Hint */}
            <Box
              sx={{ mt: 3, p: 2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 1 }}
            >
              <Typography variant="caption" color="text.secondary">
                💡 Click the camera icon on your profile picture to upload a new
                photo. Recommended size: 200×200px, max 2MB.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
