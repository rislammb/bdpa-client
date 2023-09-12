import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CommitteeTableRow from '../components/CommitteeTableRow';
import EmptyTableRow from '../components/EmptyTableRow';
import TableHeader from '../components/TableHeader';
import { axiosInstance } from '../config';

const columns = [
  { id: 'committeeTitle', label: 'কমিটি', minWidth: 170 },
  { id: 'workHasStarted', label: 'কার্যক্রম শুরু', minWidth: 120 },
  { id: 'willExpire', label: 'মেয়াদ শেষ', minWidth: 90 },
];

const CommitteeTable = () => {
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/committee')
      .then((res) => {
        setCommittees(res.data);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (!committees) return <Typography>Committee not found!</Typography>;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '900px',
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          InputLabelProps={{ color: 'info' }}
          name='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label={'কমিটি অনুসন্ধান'}
          placeholder={'কেন্দ্রীয় কমিটি...'}
          variant='standard'
          sx={{ width: '190px' }}
        />
        <Button
          startIcon={<Add />}
          component={RouterLink}
          to='/committees/add'
          variant='contained'
        >
          কমিটি
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table stickyHeader size='' aria-label='sticky table'>
            <TableHeader columns={columns} />
            <TableBody>
              {committees?.length > 0 ? (
                committees.map((committee) => (
                  <CommitteeTableRow
                    key={committee._id}
                    committee={committee}
                    columns={columns}
                  />
                ))
              ) : (
                <EmptyTableRow colSpan={3} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CommitteeTable;
