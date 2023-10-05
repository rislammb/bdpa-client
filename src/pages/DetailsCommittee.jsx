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
import DetailsCommitteeRow from '../components/DetailsCommitteeRow';
import TableHeader from '../components/TableHeader';
import ColorTitle from '../components/ui/ColorTitle';
import Loading from '../components/ui/Loading';
import useDetailsCommittee from '../hooks/useDetailsCommittee';

const DetailsCommittee = () => {
  const { loading, committee, columns, handleDelete } = useDetailsCommittee();

  if (loading)
    return (
      <Box sx={{ p: 3 }}>
        <Loading />
      </Box>
    );
  if (!committee) return <Typography>Committee not found!</Typography>;

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
          <ColorTitle variant='h5' text={committee.committeeTitle} />

          <Typography>
            কার্যক্রম শুরুঃ{' '}
            {dayjs(committee.workHasStarted).format('DD MMM YYYY')}
          </Typography>
          <Typography>
            মেয়াদঃ {dayjs(committee.willExpire).format('DD MMM YYYY')}
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
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            onClick={handleDelete}
            variant='contained'
            startIcon={<DeleteIcon />}
            color='error'
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailsCommittee;
