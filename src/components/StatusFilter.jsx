import { FormControlLabel, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const StatusFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accountStatus, setAccountStatus] = useState(
    searchParams.get('account_status') || 'ALL'
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setAccountStatus(value);

    const params = new URLSearchParams(searchParams);
    params.set('account_status', value);

    setSearchParams(params);
  };

  return (
    <FormControlLabel
      sx={{ minWidth: 105, ml: 0 }}
      control={
        <TextField
          InputLabelProps={{ color: 'info' }}
          select
          name={'accountStatus'}
          label={'Account Status'}
          value={accountStatus}
          onChange={handleChange}
          variant='standard'
          sx={{
            width: '100%',
          }}
        >
          <MenuItem value={'ALL'}>All</MenuItem>
          <MenuItem value={'ACTIVE'}>Active</MenuItem>
          <MenuItem value={'PENDING'}>Pending</MenuItem>
          <MenuItem value={'SUSPEND'}>Suspend</MenuItem>
          <MenuItem value={'REJECTED'}>Rejected</MenuItem>
        </TextField>
      }
    />
  );
};

export default StatusFilter;
