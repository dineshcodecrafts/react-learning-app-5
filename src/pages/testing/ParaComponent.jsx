import React from "react";
import PageContainer from "../../components/ui/PageContainer";
import { Grid, Box, Typography } from "@mui/material";

export default function ParaComponent() {
  return (
    <PageContainer title="Para Component">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Typography variant="h5" gutterBottom>
              h1. Heading
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>

            <Typography variant="body1" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>

            <Typography variant="body2" gutterBottom>
              body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>

            <Typography variant="button" gutterBottom sx={{ display: "block" }}>
              button text
            </Typography>

            <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
              caption text
            </Typography>

            <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
              overline text
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
