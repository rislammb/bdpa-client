import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { axiosInstance } from '../config';

const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    axiosInstance
      .get('/health')
      .then(() => {})
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ my: 3, mx: 1 }}>
      <Typography variant='h4' sx={{ mb: 4 }}>
        Assalamu Alaikum
      </Typography>
      <Typography variant='h5'>
        Welcome to{' '}
        <Typography
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main
          }
          variant='span'
        >
          Bangladesh Diploma Pharmacist Association
        </Typography>{' '}
        website
      </Typography>
      <Typography variant='h6' sx={{ mt: 1 }}>
        Developed by: Rajshahi District
      </Typography>
    </Box>
  );
};

export default Home;
