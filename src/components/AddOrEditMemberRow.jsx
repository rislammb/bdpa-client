import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Box, TableCell, TableRow } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { getPharmacists } from '../api/pharmacist';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

const AddOrEditMemberRow = ({
  member,
  error,
  onChange,
  deleteMemberRow,
  disableDeleteMemberRow,
  type,
  cancelEdit,
  onSubmit,
}) => {
  const {
    ui: { language },
    member: { submitting },
  } = useStoreState((state) => state);
  const [searchParams] = useSearchParams();

  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    type === 'EDIT' ? member?.pharmacistId?.value?.regNumber : ''
  );

  const isBn = language === 'BN' ? true : false;

  const debounced = useDebouncedCallback(async (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    const {
      data: { pharmacists },
    } = await getPharmacists(params);

    if (pharmacists?.length > 0) {
      setOptions(pharmacists);
    }
  }, 300);

  const handleChange = (e) => {
    setOptions([]);
    const value = e.target.value;

    setSearchTerm(value);
    debounced(value);
  };

  const memberArray = Object.keys(member).reduce((acc, cur) => {
    if (cur === 'id') return acc;
    else {
      acc.push(member[cur]);
    }
    return acc;
  }, []);

  return (
    <TableRow sx={type ? { verticalAlign: 'top' } : { display: 'flex' }}>
      {memberArray?.length > 0 &&
        memberArray.map((property) => {
          return (
            <TableCell
              sx={{
                padding: '8px 6px',
                border: 'none',
                ...property.sx,
              }}
              colSpan={property.name === 'pharmacistId' ? 2 : 1}
              key={property.name}
            >
              {property.type === 'autocomplete' ? (
                <Autocomplete
                  options={options}
                  filterOptions={(x) => x}
                  getOptionLabel={(option) =>
                    `${isBn ? option.bn_name : option.name} | ${
                      option.regNumber
                    } | ${
                      isBn
                        ? option.bn_posting ?? getBnAreaInfo(option, 'posting')
                        : option.posting ?? getAreaInfo(option, 'posting')
                    }`
                  }
                  value={property.value}
                  onChange={(_event, newValue) => {
                    onChange(
                      { target: { name: property.name, value: newValue } },
                      member.id
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.regNumber === value?.regNumber
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={isBn ? 'ফার্মাসিস্ট আইডি' : 'Pharmacist Id'}
                      placeholder={
                        isBn
                          ? 'নাম, নিবন্ধন, সদস্য পরিচিতি বা ইমেইল'
                          : 'Name, Registration, Member ID or Email'
                      }
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: params.InputProps.endAdornment,
                      }}
                      variant='standard'
                      value={searchTerm}
                      onChange={handleChange}
                      color='info'
                      error={error && error['email'] ? true : false}
                      helperText={
                        error &&
                        error['email'] &&
                        (isBn
                          ? error['email'].bn_text ?? ''
                          : error['email'].text ?? '')
                      }
                    />
                  )}
                />
              ) : (
                <TextField
                  color='info'
                  key={property.name}
                  name={property.name}
                  sx={{ width: '100%' }}
                  label={isBn ? property.bn_label : property.label}
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

      <TableCell sx={{ padding: '8px 6px', border: 'none' }}>
        {type === 'ADD' || type === 'EDIT' ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
          >
            <IconButton
              disabled={submitting}
              onClick={cancelEdit}
              variant='contained'
              color='error'
            >
              <CloseIcon fontSize='small' />
            </IconButton>
            <IconButton
              disabled={submitting}
              onClick={onSubmit}
              variant='contained'
              color='info'
            >
              {type === 'ADD' ? (
                <AddIcon fontSize='small' />
              ) : (
                <DoneIcon fontSize='small' />
              )}
            </IconButton>
          </Box>
        ) : (
          <IconButton
            disabled={disableDeleteMemberRow}
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
