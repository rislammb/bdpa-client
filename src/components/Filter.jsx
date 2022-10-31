import { Box, TextField } from '@mui/material';
import React from 'react';
// import PostingGroup from './PostingGroup';

const Filter = ({ searchTearm, onChange }) => {
  return (
    <Box sx={{ my: 2 }}>
      {/* <PostingGroup
      // postingInfo={mainPosting} onChange={changeMainPosting}
      /> */}
      <TextField
        InputLabelProps={{ color: 'info' }}
        sx={{ width: 175 }}
        label='Search by Name or Registration'
        value={searchTearm}
        onChange={onChange}
        placeholder='Abdullah or B-0182'
        variant='standard'
      />
    </Box>
  );
};

export default Filter;
