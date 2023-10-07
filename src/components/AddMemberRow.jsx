import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const AddMemberRow = ({ member, onChange, defaultProps, deleteMemberRow }) => {
  const { id, serialNumber, postName, pharmacistId } = member;

  // const memberArray = Object.keys(member).reduce((acc, cur) => {
  //   acc.push(member[cur]);
  //   return acc;
  // }, []);

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        InputLabelProps={{ color: 'info' }}
        sx={{ flex: 1 }}
        name={serialNumber.name}
        label={serialNumber.label}
        value={serialNumber.value}
        placeholder={serialNumber.placeholder}
        // onFocus={onFocus}
        onChange={(e) => onChange(e, id)}
        // onBlur={onBlur}
        // error={error && error[field.name] ? true : false}
        // helperText={(error && error[field.name]) ?? ''}
        variant='standard'
      />
      <TextField
        InputLabelProps={{ color: 'info' }}
        sx={{ flex: 2 }}
        name={postName.name}
        label={postName.label}
        value={postName.value}
        placeholder={postName.placeholder}
        // onFocus={onFocus}
        onChange={(e) => onChange(e, id)}
        // onBlur={onBlur}
        // error={error && error[field.name] ? true : false}
        // helperText={(error && error[field.name]) ?? ''}
        variant='standard'
      />
      <Autocomplete
        {...defaultProps}
        value={pharmacistId.value}
        sx={{ flex: 3 }}
        onChange={(event, newValue) => {
          onChange(
            { target: { name: pharmacistId?.name, value: newValue } },
            id
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={pharmacistId.label}
            variant='standard'
          />
        )}
      />

      <IconButton
        onClick={() => deleteMemberRow(id)}
        variant='contained'
        color='error'
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default AddMemberRow;
