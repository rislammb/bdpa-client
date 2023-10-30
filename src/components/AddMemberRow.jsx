import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useStoreState } from 'easy-peasy';

const AddMemberRow = ({
  member,
  error,
  onChange,
  defaultProps,
  deleteMemberRow,
}) => {
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

  const memberArray = Object.keys(member).reduce((acc, cur) => {
    if (cur === 'id') return acc;
    else {
      acc.push(member[cur]);
    }
    return acc;
  }, []);

  console.log('member from add =>', member);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'flex-start',
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
                  label={isBn ? property.bn_label : property.label}
                  variant='standard'
                  error={error && error[property.name] ? true : false}
                  helperText={
                    error &&
                    error[property.name] &&
                    (isBn
                      ? error[property.name].bn_text ?? ''
                      : error[property.name].text ?? '')
                  }
                />
              )}
            />
          ) : (
            <TextField
              InputLabelProps={{ color: 'info' }}
              key={property.name}
              name={property.name}
              label={isBn ? property.bn_label : property.label}
              sx={{ ...property.sx }}
              value={property.value}
              placeholder={property.placeholder}
              onChange={(e) => onChange(e, member.id)}
              error={error && error[property.name] ? true : false}
              helperText={
                error &&
                error[property.name] &&
                (isBn
                  ? error[property.name].bn_text ?? ''
                  : error[property.name].text ?? '')
              }
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
