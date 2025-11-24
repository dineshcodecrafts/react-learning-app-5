import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

import { useSelector } from "react-redux";
import ProfileBreadcrumbs from "../components/ProfileBreadcrumbs";
import PageContainer from "../components/PageContainer";

const Home = () => {
  // const UserName = useSelector((state) => state.users.name) ;
  const profile = useSelector((state) => state.users.profile);
  // console.log("Profile:", profile);

  return (
    <>
      <PageContainer title="Add New Record">
        <Box sx={{ p: 3 }}>
          <ProfileBreadcrumbs items={["Home", "Profile Settings", "Profile"]} />
          <Typography variant="h4" gutterBottom>
            Welcome to My App! {profile.name}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            This is your home page. Use the navigation drawer to access
            different sections of the application.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: "#f8f8f8" }}>
                <CardContent>
                  <Typography variant="h6">Users</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Manage and view all registered users in the system.
                  </Typography>
                  <Button variant="contained" size="small" href="/users">
                    Go to Users
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: "#f8f8f8" }}>
                <CardContent>
                  <Typography variant="h6">About</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Learn more about this application and its features.
                  </Typography>
                  <Button variant="contained" size="small" href="/about">
                    About
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default Home;
