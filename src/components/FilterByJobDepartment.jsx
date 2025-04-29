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
import { DEPARTMENT_OPTIONS } from '../constants/initialInputInfo';

const FilterByJobDepartment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [departmentId, setDepartmentId] = useState(
    searchParams.get('job_department_id') || 'all'
  );

  const {
    ui: { language },
    auth: { user },
  } = useStoreState((state) => state);

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setDepartmentId(value);
    params.set('page', 1);

    if (value) {
      params.set('job_department_id', value);
    } else {
      params.delete('job_department_id');
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
        {isBn ? 'চাকুরীর বিভাগ অনুযায়ী বাছাই' : 'Filter by job department'}
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <TextField
              InputLabelProps={{ color: 'info' }}
              InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
              select
              name='jobDepartment'
              label={isBn ? 'চাকুরীর বিভাগ' : 'Job Department'}
              value={departmentId}
              onChange={handleChange}
              variant='standard'
              sx={{
                textAlign: 'left',
                width: '100%',
                mt: 1,
              }}
            >
              {DEPARTMENT_OPTIONS.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  sx={{ fontSize: 14 }}
                  disabled={!user}
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

export default FilterByJobDepartment;
