import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import CommitteeListRow from '../components/CommitteeListRow';
import EmptyTableRow from '../components/EmptyTableRow';
import SnackbarComp from '../components/Snackbar';
import TableHeader from '../components/TableHeader';
import CustomPagination from '../components/shared/CustomPagination';
import Search from '../components/shared/Search';
import useCommitteeList from '../hooks/useCommitteeList';
import CommitteeListSkeleton from '../skeleton/CommitteeListSkeleton';

const CommitteeList = () => {
  const {
    loading,
    isBn,
    isAdmin,
    list,
    columns,
    snackbar,
    handleSnackbarClose,
    committeesCount,
  } = useCommitteeList();

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
        <Search
          label={isBn ? 'কমিটি অনুসন্ধান' : 'Search Committee'}
          placeholder={isBn ? 'কমিটির নাম..' : 'Committee Name..'}
          sx={{ maxWidth: '215px' }}
        />
        {isAdmin && (
          <Button
            startIcon={<AddIcon />}
            component={RouterLink}
            to='/committees/add'
            variant='contained'
          >
            {isBn ? 'কমিটি' : 'Committee'}
          </Button>
        )}
      </Box>

      <Paper>
        <TableContainer>
          <Table stickyHeader size='' aria-label='sticky table'>
            <TableHeader columns={columns} />
            <TableBody>
              {loading ? (
                <CommitteeListSkeleton columns={columns} />
              ) : list?.length > 0 ? (
                list.map((committee) => (
                  <CommitteeListRow
                    key={committee._id}
                    committee={committee}
                    columns={columns}
                    isBn={isBn}
                  />
                ))
              ) : (
                <EmptyTableRow colSpan={3} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <CustomPagination totalCount={committeesCount} />
      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default CommitteeList;
