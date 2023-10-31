import AddIcon from '@mui/icons-material/Add';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddOrEditMemberRow from '../components/AddOrEditMemberRow';
import DatePickerComp from '../components/DatePickerComp';
import SnackbarComp from '../components/Snackbar';
import ColorTitle from '../components/ui/ColorTitle';
import useAddCommittee from '../hooks/useAddCommittee';

const AddCommittee = () => {
  const {
    isBn,
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

  console.log(committeeInfo.committeeTitle);

  return (
    <Card
      sx={{
        m: 'auto',
        maxWidth: '850px',
      }}
    >
      <CardContent>
        <ColorTitle
          text={isBn ? 'কমিটি যোগ' : 'Add Committee'}
          variant={'h5'}
        />
        <Box
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
                      label={isBn ? field.bn_label : field.label}
                      value={field.value}
                      onChange={handleInfoChange}
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
                      onChange={handleInfoChange}
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
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>
              {isBn ? 'কমিটির সদস্যঃ' : 'Committee Members:'}
            </Typography>
            <Button
              startIcon={<AddIcon />}
              size='small'
              variant='contained'
              onClick={addMemberRow}
            >
              {isBn ? 'সদস্য সারি' : 'Member row'}
            </Button>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: '650px', overflow: 'auto' }}>
              <TableBody>
                {members.length > 0 &&
                  members.map((member, index) => (
                    <AddOrEditMemberRow
                      key={member.id}
                      member={member}
                      error={error?.members && error.members[index]}
                      onChange={handleMemberChange}
                      defaultProps={defaultProps}
                      deleteMemberRow={deleteMemberRow}
                      disableDeleteMemberRow={members.length < 3}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant='contained'
            type='submit'
            startIcon={<AddIcon />}
            sx={{ my: 2 }}
            size='large'
            disabled={
              committeeInfo.committeeTitle?.value.length < 7 ||
              committeeInfo.bn_committeeTitle?.value.length < 7 ||
              submitting
            }
          >
            {isBn ? 'কমিটি' : 'Committee'}
          </Button>
        </Box>
      </CardContent>
      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </Card>
  );
};

export default AddCommittee;
