import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
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
import AddMemberRow from '../components/AddMemberRow';
import DetailsCommitteeRow from '../components/DetailsCommitteeRow';
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
            {dayjs(committee.workHasStarted).format('DD MMM YYYY')}
          </Typography>
          <Typography>
            {isBn ? 'মেয়াদঃ ' : 'Will expire: '}
            {dayjs(committee.willExpire).format('DD MMM YYYY')}
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
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isPermittedForEdit && (
          <>
            {isAddMember && (
              <Box sx={{ my: 1.5, overflow: 'auto', pb: 1 }}>
                <AddMemberRow
                  member={member}
                  onChange={handleMemberChange}
                  deleteMemberRow={toggleAddMember}
                  defaultProps={defaultProps}
                  index={0}
                  error={error}
                />
              </Box>
            )}
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
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
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {isAddMember && (
                  <Button
                    onClick={toggleAddMember}
                    variant='contained'
                    startIcon={<ClearIcon />}
                    color='error'
                    size='small'
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </Button>
                )}
                <Button
                  onClick={isAddMember ? handleMemberSubmit : toggleAddMember}
                  variant='contained'
                  startIcon={isAddMember ? <SaveIcon /> : <AddIcon />}
                  color='primary'
                  size='small'
                >
                  {isAddMember
                    ? isBn
                      ? 'সদস্য সংরক্ষণ'
                      : 'Save member'
                    : isBn
                    ? 'সদস্য'
                    : 'Member'}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsCommittee;
