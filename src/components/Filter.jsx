import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const Filter = ({ pharmacists, onChange }) => {
  const [searchTearm, setSearchTearm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTearm(value);
    onChange(
      pharmacists.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.regNumber.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    onChange(pharmacists);
    setSearchTearm('');
  }, [pharmacists]);

  return (
    <Box sx={{ ml: -1.5, mr: 2, flex: '1 200px' }}>
      <TextField
        InputLabelProps={{ color: 'info' }}
        label='Search'
        value={searchTearm}
        onChange={handleChange}
        placeholder='Name or Registration'
        variant='standard'
        sx={{
          width: '100%',
        }}
      />
    </Box>
  );
};

export default Filter;
