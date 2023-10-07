import { Add } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddMemberRow from '../components/AddMemberRow';
import DatePickerComp from '../components/DatePickerComp';
import SnackbarComp from '../components/Snackbar';
import useAddCommittee from '../hooks/useAddCommittee';

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
    addMemberRow,
    members,
    handleChange,
    defaultProps,
    deleteMemberRow,
  } = useAddCommittee();

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

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6'>কমিটির সদস্যঃ</Typography>
          <Button
            startIcon={<Add />}
            size='small'
            variant='contained'
            onClick={addMemberRow}
          >
            সদস্য সারি
          </Button>
        </Box>
        {members.length > 0 &&
          members.map((member) => (
            <AddMemberRow
              key={member.id}
              member={member}
              onChange={handleChange}
              defaultProps={defaultProps}
              deleteMemberRow={deleteMemberRow}
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
        startIcon={<Add />}
        sx={{ my: 2 }}
        disabled={state.committeTitle?.value.length > 5 || submitting}
      >
        কমিটি
      </Button>
    </Box>
  );
};

export default AddCommittee;
