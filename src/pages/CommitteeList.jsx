import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmptyTableRow from '../components/EmptyTableRow';
import TableHeader from '../components/TableHeader';
import useCommitteeList from '../hooks/useCommitteeList';

import CommitteeListRow from '../components/CommitteeListRow';
import Loading from '../components/ui/Loading';

const CommitteeList = () => {
  const { loading, filteredList, searchTerm, setSearchTerm, columns } =
    useCommitteeList();

  if (loading)
    return (
      <Box sx={{ p: 3 }}>
        <Loading />
      </Box>
    );

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
              {filteredList?.length > 0 ? (
                filteredList.map((committee) => (
                  <CommitteeListRow
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

export default CommitteeList;
