import { Box, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import ColorLink from '../components/ui/ColorLink';
import ColorTitle from '../components/ui/ColorTitle';

const About = () => {
  const theme = useTheme();
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

  useEffect(() => {
    document.title = isBn ? 'বিডিপিএ | বিডিপিএ সম্পর্কে' : 'BDPA | About BDPA';
  }, [isBn]);

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

      <Typography>
        বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসেসিয়েশনের স্মারক (১৯৪৯ সালে স্থাপিত)
        ১৮৬০ সালের ২১ নং আইনে নিবন্ধিত নং- ৩৮৪
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography>
        {isBn
          ? 'এই ওয়েবসাইট সম্পর্কে আরও তথ্যের জন্য অনুগ্রহ করে '
          : 'For more information about this website please mail to '}
        <ColorLink
          to={'mailto:rislammb@gmail.com'}
          text={'rislammb@gmail.com'}
        />
        {isBn && ' এ মেইল ​​করুন'}
      </Typography>
    </Box>
  );
};

export default About;
