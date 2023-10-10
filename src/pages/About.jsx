import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ m: 3 }}>
      <img
        src={
          theme.palette.mode === 'dark'
            ? `./bdpa_logo.png`
            : `./bdpa_logo-color.svg`
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
