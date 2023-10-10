import AddIcon from '@mui/icons-material/Add';
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
    committeeInfo,
    handleInfoChange,
    submitting,
    error,
    handleSubmit,
    snackbar,
    handleSnackbarClose,
    addMemberRow,
    members,
    handleMemberChange,
    defaultProps,
    deleteMemberRow,
  } = useAddCommittee();

  const committeeInfoArray = Object.keys(committeeInfo).reduce((acc, cur) => {
    acc.push(committeeInfo[cur]);

    return acc;
  }, []);

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          m: 'auto',
          maxWidth: '750px',
        }}
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
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
          {committeeInfoArray.length > 0 &&
            committeeInfoArray.map((field) => {
              if (field.type === 'date') {
                return (
                  <DatePickerComp
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    value={field.value}
                    onChange={handleInfoChange}
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
                    onChange={handleInfoChange}
                    error={error && error[field.name] ? true : false}
                    helperText={(error && error[field.name]) ?? ''}
                    placeholder={field.placeholder}
                    variant='standard'
                  />
                );
            })}
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6'>কমিটির সদস্যঃ</Typography>
          <Button
            startIcon={<AddIcon />}
            size='small'
            variant='contained'
            onClick={addMemberRow}
          >
            সদস্য সারি
          </Button>
        </Box>
        <Box
          sx={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            pb: 1,
          }}
        >
          {members.length > 0 &&
            members.map((member, index) => (
              <AddMemberRow
                key={member.id}
                member={member}
                error={error?.members && error.members[index]}
                onChange={handleMemberChange}
                defaultProps={defaultProps}
                deleteMemberRow={deleteMemberRow}
              />
            ))}
        </Box>
        <Button
          variant='contained'
          type='submit'
          startIcon={<AddIcon />}
          sx={{ my: 2 }}
          size='large'
          disabled={committeeInfo.committeTitle?.value.length > 5 || submitting}
        >
          কমিটি
        </Button>
      </Box>
      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default AddCommittee;
