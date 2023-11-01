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
import Typography from '@mui/material/Typography';
import AddOrEditCommittee from '../components/AddOrEditCommittee';
import AddOrEditMemberRow from '../components/AddOrEditMemberRow';
import SnackbarComp from '../components/Snackbar';
import ColorTitle from '../components/ui/ColorTitle';
import useAddCommittee from '../hooks/useAddCommittee';

const AddCommittee = () => {
  const {
    isBn,
    committeeInfo,
    handleCommitteeInfoChange,
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

  const committeeInfoArray =
    committeeInfo &&
    Object.keys(committeeInfo).reduce((acc, cur) => {
      acc.push(committeeInfo[cur]);

      return acc;
    }, []);

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
          <AddOrEditCommittee
            committeeInfoArray={committeeInfoArray}
            handleCommitteeInfoChange={handleCommitteeInfoChange}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
