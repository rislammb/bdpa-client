import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStoreState } from 'easy-peasy';
const About = () => {
  const theme = useTheme();
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

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
        {isBn
          ? 'বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসোসিয়েশন (বিডিপিএ)'
          : 'Bangladesh Diploma Pharmacist Association (BDPA)'}
      </Typography>
      <Typography variant='h5'>
        {isBn ? 'রাজশাহী জেলা' : 'Rajshahi District'}
      </Typography>
    </Box>
  );
};

export default About;
