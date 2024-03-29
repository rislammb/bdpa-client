import { MenuItem, TextField } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';

const SelectComponent = ({
  name,
  label,
  value,
  options,
  onChange,
  style,
  error,
}) => {
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

  return (
    <TextField
      InputLabelProps={{ color: 'info' }}
      select
      name={name}
      label={label || ''}
      value={value}
      onChange={onChange}
      error={error ? true : false}
      helperText={error && error}
      variant='standard'
      style={{ textAlign: 'left', ...style }}
    >
      {options?.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {isBn ? option.bn_name : option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectComponent;

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  error: PropTypes.object,
};
