import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../config';

const PharmacistList = () => {
  const [loading, setLoading] = useState(true);
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      const res = await axiosInstance.get('/list');
      setPharmacists(res.data);
      setLoading(false);
    };
    fetchHome();
  }, []);
  return loading ? (
    <Typography>loading...</Typography>
  ) : pharmacists.length > 0 ? (
    <Box
      sx={{
        boxShadow: '1px 2px 3px 2px rgba(97,97,97,0.35)',
        maxWidth: 450,
        margin: 'auto',
        p: 3,
        borderRadius: 2,
      }}
    >
      {pharmacists.map((item) => (
        <Box
          key={item._id}
          sx={{
            display: 'flex',
            textAlign: 'left',
          }}
        >
          <Typography sx={{ flex: 1 }}>{item.name}</Typography>
          <Typography sx={{ flex: 1 }}>{item.nameBengali}</Typography>
          <Typography>{item.regNumber}</Typography>
        </Box>
      ))}
    </Box>
  ) : (
    <Typography>There is nothing to show</Typography>
  );
};

export default PharmacistList;
