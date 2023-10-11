import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BnHome = () => {
  const theme = useTheme();

  return (
    <Box sx={{ my: 3, mx: 1 }}>
      <Typography variant='h4' sx={{ mb: 4 }}>
        আস সালামু আলাইকুম
      </Typography>
      <Typography variant='h5'>
        <Typography
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main
          }
          variant='span'
        >
          বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসোসিয়েশন (বিডিপিএ)
        </Typography>{' '}
        এর ওয়েবসাইটে আপনাকে স্বাগতম
      </Typography>
      <Typography variant='h6' sx={{ mt: 1 }}>
        ডেভেলপ করেছেঃ রাজশাহী জেলা
      </Typography>
    </Box>
  );
};

export default BnHome;
