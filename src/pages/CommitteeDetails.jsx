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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommitteeDetailsRow from '../components/CommitteeDetailsRow';
import TableHeader from '../components/TableHeader';
import ColorTitle from '../components/ui/ColorTitle';
import { axiosInstance } from '../config';

const columns = [
  { id: 'serialNumber', label: 'ক্রমিক', minWidth: 35 },
  { id: 'name', label: 'নাম', minWidth: 190 },
  { id: 'postName', label: 'কমিটি পদবী', minWidth: 210 },
  { id: 'mobile', label: 'মোবাইল', minWidth: 90 },
  { id: 'posting', label: 'কর্মস্থল/ঠিকানা', minWidth: 130 },
];

const CommitteeDetails = () => {
  const { committeePath } = useParams();

  const [loading, setLoading] = useState(true);
  const [committee, setCommittee] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/committee/${committeePath}`)
      .then((res) => {
        setCommittee(res.data);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        setCommittee(null);
      });
  }, [committeePath]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!committee) return <Typography>Committee not found!</Typography>;

  return (
    <Card sx={{ maxWidth: '900px', margin: 'auto' }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant='h5'>
            কমিটিঃ <ColorTitle variant='span' text={committee.committeeTitle} />
          </Typography>
          <Typography>
            কার্যক্রম শুরুঃ{' '}
            {dayjs(committee.workHasStarted).format('DD MMM YYYY')}
          </Typography>
          <Typography>
            মেয়াদ শেষঃ {dayjs(committee.willExpire).format('DD MMM YYYY')}
          </Typography>
        </Box>

        <TableContainer>
          <Table size='small' stickyHeader>
            <TableHeader columns={columns} />
            <TableBody>
              {committee.members?.length > 0 &&
                committee.members.map((member) => (
                  <CommitteeDetailsRow
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

export default CommitteeDetails;
