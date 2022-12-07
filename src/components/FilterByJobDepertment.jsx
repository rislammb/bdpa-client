import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { jobDepertmentOptions } from '../constants/jobDepertment';

const INITIAL_DEPERTMENT_INFO = {
  value: 'all',
  options: [
    {
      id: 'all',
      name: 'All',
    },
    ...jobDepertmentOptions,
  ],
};

const FilterByJobDepertment = ({ pharmacists, onChange }) => {
  const [jobDepertmentInfo, setJobDepertmentInfo] = useState({
    ...INITIAL_DEPERTMENT_INFO,
  });

  const handleJobDepertmentChange = (e) => {
    setJobDepertmentInfo((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));

    if (e.target.value === 'all') {
      onChange(pharmacists);
    } else {
      const nameFromId = jobDepertmentOptions.find(
        (option) => option.id === e.target.value
      )?.name;
      onChange(
        pharmacists.filter(
          (pharmacist) => pharmacist.jobDepertment === nameFromId
        )
      );
    }
  };

  useEffect(() => {
    onChange(pharmacists);
    setJobDepertmentInfo({ ...INITIAL_DEPERTMENT_INFO });
  }, [pharmacists]);

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      sx={{ flex: '1 300px' }}
    >
      <FormLabel component='legend'>Filter by Job Depertment</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <TextField
              InputLabelProps={{ color: 'info' }}
              select
              name='jobDepertment'
              label='Select Job Depertment'
              value={jobDepertmentInfo.value}
              onChange={handleJobDepertmentChange}
              variant='standard'
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              {jobDepertmentInfo.options.length > 0 ? (
                jobDepertmentInfo.options.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{ fontSize: 13 }}
                  >
                    {option.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem />
              )}
            </TextField>
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default FilterByJobDepertment;
