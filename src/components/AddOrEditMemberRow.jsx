import { Close, Done } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, TableCell, TableRow } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useStoreState } from 'easy-peasy';

const AddOrEditMemberRow = ({
  member,
  error,
  onChange,
  defaultProps,
  deleteMemberRow,
  isEdit,
  cancelEdit,
  onSubmit,
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

  return (
    <TableRow sx={{ width: '100%', alignContent: 'start' }}>
      {memberArray?.length > 0 &&
        memberArray.map((property) => {
          return (
            <TableCell
              sx={{ padding: { xs: '8px 6px', sm: '12px' } }}
              colSpan={property.name === 'pharmacistId' ? 2 : 1}
              key={property.name}
            >
              {property.type === 'autocomplete' ? (
                <Autocomplete
                  {...defaultProps}
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
              )}
            </TableCell>
          );
        })}

      <TableCell sx={{ padding: { xs: '8px 6px', sm: '12px' } }}>
        {isEdit ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
          >
            <IconButton onClick={cancelEdit} variant='contained' color='error'>
              <Close fontSize='small' />
            </IconButton>
            <IconButton onClick={onSubmit} variant='contained' color='info'>
              <Done fontSize='small' />
            </IconButton>
          </Box>
        ) : (
          <IconButton
            onClick={() => deleteMemberRow(member.id)}
            variant='contained'
            color='error'
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AddOrEditMemberRow;
