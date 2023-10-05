import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddMember = ({ member, handleChange }) => {
  const memberArray = Object.keys(member).reduce((acc, cur) => {
    acc.push(member[cur]);
    return acc;
  }, []);

  return memberArray.length > 0 ? (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {memberArray.map((field) => {
        return (
          <TextField
            InputLabelProps={{ color: 'info' }}
            key={field}
            sx={{ flex: 1 }}
            // name={field.name}
            label={field}
            // value={field.value}
            // onFocus={onFocus}
            // onChange={onChange}
            // onBlur={onBlur}
            // error={error && error[field.name] ? true : false}
            // helperText={(error && error[field.name]) ?? ''}
            // placeholder={field.placeholder}
            variant='standard'
          />
        );
      })}
    </Box>
  ) : (
    ''
  );
};

export default AddMember;
