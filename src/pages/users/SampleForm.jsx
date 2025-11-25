import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {TextField} from "@mui/material";


import PageContainer from '../../components/PageContainer'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function SampleForm() {
  return (

    <PageContainer>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5} rowSpacing={4}>
        <Grid size={8}>
          
        <TextField
  label="Responsive Width"
  variant="outlined"
  sx={{ width: { xs: "100%", sm: "70%", md: "100%" } }}
/>
        {/* <Item>size=4</Item> */}
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"  sx={{ width: { xs: "100%", sm: "70%", md: "50%" } }} /> */}
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
      </Grid>
    </Box>
    </PageContainer>
  );
}
