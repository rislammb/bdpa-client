import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CommitteeDetails = () => {
  const { committeePath } = useParams();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [committee, setCommittee] = useState(null);

  useEffect(() => {
    
    setLoading(false);
  }, [committeePath]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!committee) return <Typography>Committee not found!</Typography>;

  return (
    <Card sx={{ maxWidth: '900px', margin: 'auto' }}>
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main
          }
          variant='h5'
          gutterBottom
        >
          Committee Title: {committee.committeeTitle}
        </Typography>
        <Typography>Work has Started: {committee.workHasStarted}</Typography>
        <Typography gutterBottom>
          Will Expire: {committee.willExpire}
        </Typography>

        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Name (Bengali)</TableCell>
              <TableCell>Committee Post</TableCell>
              <TableCell>Committee Post (Benglai)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {committee.members?.length > 0 &&
              committee.members.map((mem) => (
                <TableRow
                  key={mem.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{mem.serialNumber}</TableCell>
                  <TableCell>{mem.name}</TableCell>
                  <TableCell>{mem.name_bn}</TableCell>
                  <TableCell>{mem.postName}</TableCell>
                  <TableCell>{mem.postName_bn}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CommitteeDetails;
