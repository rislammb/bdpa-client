import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import DatePickerComp from './DatePickerComp';

const AddOrEditCommittee = ({
  committeeInfoArray,
  handleCommitteeInfoChange,
  type,
  toggleIsEditCommitttee,
  handleCommitteeSubmit,
}) => {
  const {
    ui: { language },
    committee: { error },
  } = useStoreState((state) => state);

  const isBn = language === 'BN' ? true : false;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '550px',
        gap: 1.5,
        m: 'auto',
        my: 2,
      }}
    >
      {committeeInfoArray?.length > 0 &&
        committeeInfoArray.map((field) => {
          if (field.type === 'date') {
            return (
              <DatePickerComp
                key={field.name}
                name={field.name}
                label={isBn ? field.bn_label : field.label}
                value={field.value}
                onChange={handleCommitteeInfoChange}
                error={error && error[field.name] ? true : false}
                helperText={
                  error &&
                  error[field.name] &&
                  (isBn
                    ? error[field.name].bn_text ?? ''
                    : error[field.name].text ?? '')
                }
              />
            );
          } else
            return (
              <TextField
                InputLabelProps={{ color: 'info' }}
                key={field.name}
                name={field.name}
                label={isBn ? field.bn_label : field.label}
                value={field.value}
                onChange={handleCommitteeInfoChange}
                error={error && error[field.name] ? true : false}
                helperText={
                  error &&
                  error[field.name] &&
                  (isBn
                    ? error[field.name].bn_text ?? ''
                    : error[field.name].text ?? '')
                }
                placeholder={field.placeholder}
                variant='standard'
              />
            );
        })}

      {type === 'EDIT' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Button
            onClick={toggleIsEditCommitttee}
            variant='contained'
            startIcon={<CloseIcon />}
            color='error'
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </Button>
          <Button
            onClick={handleCommitteeSubmit}
            variant='contained'
            startIcon={<SaveIcon />}
            color='primary'
          >
            {isBn ? 'সংরক্ষণ' : 'Save'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddOrEditCommittee;

AddOrEditCommittee.propTypes = {
  committeeInfoArray: PropTypes.array,
  handleCommitteeInfoChange: PropTypes.func,
  type: PropTypes.string,
  toggleIsEditCommitttee: PropTypes.func,
  handleCommitteeSubmit: PropTypes.func,
};
