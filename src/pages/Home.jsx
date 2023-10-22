import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStoreState } from 'easy-peasy';

const Home = () => {
  const theme = useTheme();
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

  return (
    <Box sx={{ my: 3, mx: 1 }}>
      <Typography variant='h4' sx={{ mb: 4 }}>
        {isBn ? 'আস সালামু আলাইকুম' : 'Assalamu Alaikum'}
      </Typography>
      <Typography variant='h5'>
        {isBn ? '' : 'Welcome to'}
        <Typography
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main
          }
          variant='span'
        >
          {isBn
            ? 'বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসোসিয়েশন (বিডিপিএ) '
            : ' Bangladesh Diploma Pharmacist Association (BDPA) '}
        </Typography>{' '}
        {isBn ? 'এর ওয়েবসাইটে আপনাকে স্বাগতম।' : 'website.'}
      </Typography>
      <Typography variant='h6' sx={{ mt: 1 }}>
        {isBn
          ? 'ডেভেলপ করেছেঃ রাজশাহী জেলা'
          : 'Developed by: Rajshahi District'}
      </Typography>
    </Box>
  );
};

export default Home;
