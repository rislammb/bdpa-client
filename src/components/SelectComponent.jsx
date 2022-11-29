import { MenuItem, TextField } from '@mui/material';
import React from 'react';

const SelectComponent = ({ name, label, value, options, onChange, style }) => {
  return (
    <TextField
      InputLabelProps={{ color: 'info' }}
      select
      name={name}
      label={label || ''}
      value={value}
      onChange={onChange}
      variant='standard'
      style={{ textAlign: 'left', ...style }}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectComponent;
