import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const AddMemberRow = ({
  member,
  index,
  error,
  onChange,
  defaultProps,
  deleteMemberRow,
}) => {
  const memberArray = Object.keys(member).reduce((acc, cur) => {
    if (cur === 'id') return acc;
    else {
      acc.push(member[cur]);
    }
    return acc;
  }, []);

  console.log(error);

  const errorObj = error?.members[index];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        minWidth: '620px',
      }}
    >
      {memberArray?.length > 0 &&
        memberArray.map((property) => {
          return property.type === 'autocomplete' ? (
            <Autocomplete
              {...defaultProps}
              key={property.name}
              value={property.value}
              sx={{ ...property.sx }}
              onChange={(_event, newValue) => {
                onChange(
                  { target: { name: property.name, value: newValue } },
                  member.id
                );
              }}
              isOptionEqualToValue={(option, value) =>
                option?._id === value?._id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={property.label}
                  variant='standard'
                  error={errorObj && errorObj[property.name] ? true : false}
                  helperText={(errorObj && errorObj[property.name]) ?? ''}
                />
              )}
            />
          ) : (
            <TextField
              InputLabelProps={{ color: 'info' }}
              key={property.name}
              name={property.name}
              label={property.label}
              sx={{ ...property.sx }}
              value={property.value}
              placeholder={property.placeholder}
              onChange={(e) => onChange(e, member.id)}
              error={errorObj && errorObj[property.name] ? true : false}
              helperText={(errorObj && errorObj[property.name]) ?? ''}
              variant='standard'
            />
          );
        })}

      <IconButton
        onClick={() => deleteMemberRow(member.id)}
        variant='contained'
        color='error'
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    </Box>
  );
};

export default AddMemberRow;
