import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import AddMember from '../components/AddMember';
import DatePickerComp from '../components/DatePickerComp';
import SnackbarComp from '../components/Snackbar';
import useAddCommittee from '../hooks/useAddCommittee';

const initialMembers = [
  {
    serialNumber: 'সিরিয়াল নাম্বার',
    postName: 'পদের নাম',
    pharmacistId: 'ফার্মাসিস্টের নাম',
  },
  {
    serialNumber: 'সিরিয়াল নাম্বার',
    postName: 'পদের নাম',
    pharmacistId: 'ফার্মাসিস্টের নাম',
  },
  {
    serialNumber: 'সিরিয়াল নাম্বার',
    postName: 'পদের নাম',
    pharmacistId: 'ফার্মাসিস্টের নাম',
  },
  {
    serialNumber: 'সিরিয়াল নাম্বার',
    postName: 'পদের নাম',
    pharmacistId: 'ফার্মাসিস্টের নাম',
  },
  {
    serialNumber: 'সিরিয়াল নাম্বার',
    postName: 'পদের নাম',
    pharmacistId: 'ফার্মাসিস্টের নাম',
  },
  {
    serialNumber: 'সিরিয়াল নাম্বার',
    postName: 'পদের নাম',
    pharmacistId: 'ফার্মাসিস্টের নাম',
  },
];

const AddCommittee = () => {
  const {
    state,
    onFocus,
    onChange,
    onBlur,
    onSubmit,
    submitting,
    error,
    handleSubmit,
    snackbar,
    handleSnackbarClose,
  } = useAddCommittee();

  const [members, setMembers] = useState(initialMembers);

  const handleChange = (e) => {
    console.log(e.target);
  };

  const formFieldsArray = Object.keys(state).reduce((acc, cur) => {
    acc.push(state[cur]);

    return acc;
  }, []);

  return (
    <Box
      component='form'
      sx={{
        p: 2,
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
                error={error && error[field.name] ? true : false}
                helperText={(error && error[field.name]) ?? ''}
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
                error={error && error[field.name] ? true : false}
                helperText={(error && error[field.name]) ?? ''}
                placeholder={field.placeholder}
                variant='standard'
              />
            );
        })}

        <Typography variant='h6' sx={{ mt: 2 }} align='left'>
          কমিটির সদস্যঃ
        </Typography>
        {members.map((member) => (
          <AddMember
            key={member.serialNumber}
            member={member}
            onChange={handleChange}
          />
        ))}
      </Box>
      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
      <Button
        variant='contained'
        type='submit'
        sx={{ my: 2 }}
        disabled={state.committeTitle?.value.length > 5 || submitting}
      >
        Add Committee
      </Button>
    </Box>
  );
};

export default AddCommittee;
