import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStoreState } from 'easy-peasy';
import ColorTitle from '../components/ui/ColorTitle';

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
      <ColorTitle
        text={
          isBn
            ? 'বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসোসিয়েশন (বিডিপিএ)'
            : 'Bangladesh Diploma Pharmacist Association (BDPA)'
        }
        variant={'h5'}
      />

      <br />

      <Typography variant='h6'>
        বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসেসিয়েশনের স্মারক (১৯৪৯ সালে স্থাপিত)
        ১৮৬০ সালের ২১ নং আইনে নিবন্ধিত নং- ৩৮৪
      </Typography>
    </Box>
  );
};

export default About;
