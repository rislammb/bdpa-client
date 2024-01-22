import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEPERTMENT_OPTIONS } from '../constants/initialInputInfo';

const FilterByJobDepertment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [depertmentId, setDepertmentId] = useState(
    searchParams.get('job_depertment_id') || 'all'
  );

  const {
    ui: { language },
  } = useStoreState((state) => state);

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setDepertmentId(value);
    params.set('page', 1);

    if (value) {
      params.set('job_depertment_id', value);
    } else {
      params.delete('job_depertment_id');
    }

    setSearchParams(params);
  };

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      sx={{
        flex: '1 280px',
      }}
    >
      <FormLabel component='legend'>
        {isBn ? 'চাকুরীর বিভাগ অনুযায়ী বাছাই' : 'Filter by job depertment'}
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <TextField
              InputLabelProps={{ color: 'info' }}
              InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
              select
              name='jobDepertment'
              label={isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment'}
              value={depertmentId}
              onChange={handleChange}
              variant='standard'
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              {DEPERTMENT_OPTIONS.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{ fontSize: 14 }}
                >
                  {isBn ? option.bn_name : option.name}
                </MenuItem>
              ))}
            </TextField>
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default FilterByJobDepertment;
