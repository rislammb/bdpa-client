import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DatePickerComp from '../components/DatePickerComp';
import SnackbarComp from '../components/Snackbar';
import useAddCommittee from '../hooks/useAddCommittee';

const initial = {
  committeeTitle: {
    value: '',
    label: 'কমিটির নাম',
    placeholder: 'রাজশাহী জেলা কমিটি',
  },
  workHasStarted: { value: new Date(), type: 'date', label: 'কার্যক্রম শুরু' },
  willExpire: { value: new Date(), type: 'date', label: 'মেয়াদ' },
  indexNumber: {
    value: '',
    label: 'ক্রমিক ইনডেক্স',
    placeholder: '07',
  },
};

const AddCommittee = () => {
  const { state, onFocus, onChange, onBlur, onSubmit } =
    useAddCommittee(initial);

  const formFieldsArray = Object.keys(state).reduce((acc, cur) => {
    acc.push(state[cur]);

    return acc;
  }, []);

  const handleSubmit = (value) => {
    alert('Your submitted data: ' + JSON.stringify(value));
  };

  return (
    <Box
      component='form'
      sx={{
        p: 2,
        // '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={(e) => onSubmit(e, handleSubmit)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '550px',
          gap: 1.5,
          m: 'auto',
        }}
      >
        {formFieldsArray.map((field) => {
          if (field.type === 'date') {
            return (
              <DatePickerComp
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
              />
            );
          } else
            return (
              <TextField
                InputLabelProps={{ color: 'info' }}
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                error={field.error ? true : false}
                helperText={field.error ? field.error : ''}
                placeholder={field.placeholder}
                variant='standard'
              />
            );
        })}
      </Box>
      <SnackbarComp
      // open={snackbar.open}
      // severity={snackbar.severity}
      // text={snackbar.text}
      // handleClose={handleSnackbarClose}
      />
      <Button
        // disabled={
        //   !formFields.name.value || !formFields.regNumber.value || submitting
        // }
        variant='contained'
        type='submit'
        sx={{ my: 2 }}
      >
        Add Committee
      </Button>
    </Box>
  );
};

export default AddCommittee;
