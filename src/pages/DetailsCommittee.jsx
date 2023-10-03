import {
  Box,
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
import useDetailsCommittee from '../hooks/useDetailsCommittee';

const DetailsCommittee = () => {
  const { loading, details, columns } = useDetailsCommittee();

  if (loading) return <Typography>Loading...</Typography>;
  if (!details) return <Typography>Committee not found!</Typography>;

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
          <ColorTitle variant='h5' text={details.committeeTitle} />

          <Typography>
            কার্যক্রম শুরুঃ{' '}
            {dayjs(details.workHasStarted).format('DD MMM YYYY')}
          </Typography>
          <Typography>
            মেয়াদঃ {dayjs(details.willExpire).format('DD MMM YYYY')}
          </Typography>
        </Box>

        <TableContainer>
          <Table size='small' stickyHeader>
            <TableHeader columns={columns} />
            <TableBody>
              {details.members?.length > 0 &&
                details.members.map((member) => (
                  <DetailsCommitteeRow
                    key={member._id}
                    member={member}
                    columns={columns}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DetailsCommittee;
