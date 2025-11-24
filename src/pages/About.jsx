import React from "react";
import PageContainer from "../components/PageContainer";
import { TextField, Grid, Button } from "@mui/material";

export default function About() {
  return (
    
    <PageContainer title="Add New Record">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="First Name" />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Last Name" />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
