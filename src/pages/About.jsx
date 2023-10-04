import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ m: 3 }}>
      <img
        src={
          theme.palette.mode === 'dark'
            ? `${import.meta.env.PUBLIC_URL}/bdpa_logo.png`
            : `${import.meta.env.PUBLIC_URL}/bdpa_logo-color.svg`
        }
        alt='logo'
        width='150px'
        height='150px'
      />
      <Typography variant='h5'>
        Bangladesh Diploma Pharmacist Association (BDPA)
      </Typography>
      <Typography variant='h5'>Rajshahi District</Typography>
    </Box>
  );
};

export default About;
