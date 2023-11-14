import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import dayjs from 'dayjs';

import AddOrEditCommittee from '../components/AddOrEditCommittee';
import AddOrEditMemberRow from '../components/AddOrEditMemberRow';
import DetailsCommitteeRow from '../components/DetailsCommitteeRow';
import SnackbarComp from '../components/Snackbar';
import TableHeader from '../components/TableHeader';
import SocialShare from '../components/shared/SocialShare';
import ColorTitle from '../components/ui/ColorTitle';
import Loading from '../components/ui/Loading';
import { getBnDate } from '../helpers/date';
import useDetailsCommittee from '../hooks/useDetailsCommittee';

const DetailsCommittee = () => {
  const {
    loading,
    isBn,
    isPermittedForEdit,
    committee,
    columns,
    isEditCommittee,
    toggleIsEditCommitttee,
    committeeInfo,
    handleCommitteeInfoChange,
    handleCommitteeSubmit,
    handleCommitteeDelete,
    isAddMember,
    toggleIsAddMember,
    member,
    defaultProps,
    handleMemberChange,
    handleMemberSubmit,
    error,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  } = useDetailsCommittee();

  const committeeInfoArray =
    committeeInfo &&
    Object.keys(committeeInfo).reduce((acc, cur) => {
      acc.push(committeeInfo[cur]);

      return acc;
    }, []);

  return loading ? (
    <Box sx={{ p: 3 }}>
      <Loading />
    </Box>
  ) : (
    <Card sx={{ maxWidth: '950px', margin: 'auto' }}>
      {committee ? (
        <CardContent sx={{ textAlign: 'left' }}>
          {isEditCommittee ? (
            <>
              <ColorTitle
                text={isBn ? 'কমিটি সম্পাদন' : 'Edit Committee'}
                variant={'h5'}
                textAlign='center'
              />
              <AddOrEditCommittee
                committeeInfoArray={committeeInfoArray}
                handleCommitteeInfoChange={handleCommitteeInfoChange}
                type={'EDIT'}
                toggleIsEditCommitttee={toggleIsEditCommitttee}
                handleCommitteeSubmit={handleCommitteeSubmit}
              />
            </>
          ) : (
            <Box
              sx={{
                my: 1.5,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {isPermittedForEdit && (
                <IconButton
                  sx={{
                    alignSelf: 'end',
                  }}
                  onClick={toggleIsEditCommitttee}
                >
                  <Edit color='info' />
                </IconButton>
              )}
              <ColorTitle
                variant='h5'
                text={
                  isBn ? committee.bn_committeeTitle : committee.committeeTitle
                }
              />

              <Typography>
                {isBn ? 'কার্যক্রম শুরুঃ ' : 'Work has started: '}
                {committee.workHasStarted && isBn
                  ? getBnDate(committee.workHasStarted)
                  : dayjs(committee.workHasStarted).format('DD MMM YYYY')}
              </Typography>
              <Typography>
                {isBn ? 'মেয়াদঃ ' : 'Will expire: '}
                {committee.willExpire && isBn
                  ? getBnDate(committee.willExpire)
                  : dayjs(committee.willExpire).format('DD MMM YYYY')}
              </Typography>

              <SocialShare
                url={window?.location?.href}
                title={
                  isBn ? committee.bn_committeeTitle : committee.committeeTitle
                }
                hastag={'#bdpa, #bdpa_commitee'}
                hastags={['bdpa', 'bdpa_commitee']}
              />
            </Box>
          )}

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
                    cancelEdit={toggleIsAddMember}
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
                  onClick={isAddMember ? handleMemberSubmit : toggleIsAddMember}
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
      ) : (
        <CardContent>
          <Typography
            sx={{
              p: 5,
              textAlign: 'center',
              color: '#de6176',
              fontSize: 17,
            }}
          >
            {isBn ? 'কমিটি খুঁজে পাওয়া যায় নি!' : 'Committee not found!'}
          </Typography>
        </CardContent>
      )}

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
