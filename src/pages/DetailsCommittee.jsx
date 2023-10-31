import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import dayjs from 'dayjs';
import AddOrEditMemberRow from '../components/AddOrEditMemberRow';
import DetailsCommitteeRow from '../components/DetailsCommitteeRow';
import SnackbarComp from '../components/Snackbar';
import TableHeader from '../components/TableHeader';
import ColorTitle from '../components/ui/ColorTitle';
import Loading from '../components/ui/Loading';
import useDetailsCommittee from '../hooks/useDetailsCommittee';

const DetailsCommittee = () => {
  const {
    loading,
    isBn,
    isPermittedForEdit,
    committee,
    columns,
    handleCommitteeDelete,
    isAddMember,
    member,
    defaultProps,
    toggleAddMember,
    handleMemberChange,
    handleMemberSubmit,
    error,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  } = useDetailsCommittee();

  if (loading)
    return (
      <Box sx={{ p: 3 }}>
        <Loading />
      </Box>
    );
  if (!committee)
    return (
      <Typography>
        {isBn ? 'কমিটি খুঁজে পাওয়া যায় নি!' : 'Committee not found!'}
      </Typography>
    );

  return (
    <Card sx={{ maxWidth: '1100px', margin: 'auto' }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Box
          sx={{
            my: 1.5,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <ColorTitle
            variant='h5'
            text={isBn ? committee.bn_committeeTitle : committee.committeeTitle}
          />

          <Typography>
            {isBn ? 'কার্যক্রম শুরুঃ ' : 'Work has started: '}
            {committee.workHasStarted &&
              dayjs(committee.workHasStarted).format('DD MMM YYYY')}
          </Typography>
          <Typography>
            {isBn ? 'মেয়াদঃ ' : 'Will expire: '}
            {committee.willExpire &&
              dayjs(committee.willExpire).format('DD MMM YYYY')}
          </Typography>
        </Box>

        <TableContainer>
          <Table size='small' stickyHeader>
            <TableHeader columns={columns} />
            <TableBody>
              {committee.members?.length > 0 &&
                committee.members.map((member) => (
                  <DetailsCommitteeRow
                    key={member._id}
                    member={member}
                    columns={columns}
                    setSnackbar={setSnackbar}
                    disableDeleteMember={committee?.members.length < 3}
                  />
                ))}
              {isPermittedForEdit && isAddMember && (
                <AddOrEditMemberRow
                  member={member}
                  onChange={handleMemberChange}
                  defaultProps={defaultProps}
                  cancelEdit={toggleAddMember}
                  onSubmit={handleMemberSubmit}
                  index={0}
                  error={error}
                  type={'ADD'}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {isPermittedForEdit && (
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={handleCommitteeDelete}
              variant='contained'
              startIcon={<DeleteIcon />}
              size='large'
              color='error'
            >
              {isBn ? 'কমিটি' : 'Committee'}
            </Button>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: { xs: 'flex-end', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                onClick={isAddMember ? handleMemberSubmit : toggleAddMember}
                variant='contained'
                startIcon={<AddIcon />}
                disabled={isAddMember}
                color='primary'
                size='small'
              >
                {isBn ? 'সদস্য' : 'member'}
              </Button>
            </Box>
          </Box>
        )}
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

export default DetailsCommittee;
