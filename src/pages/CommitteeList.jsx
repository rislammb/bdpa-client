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
import Search from '../components/shared/Search';
import useCommitteeList from '../hooks/useCommitteeList';
import CommitteeListSkeleton from '../skeleton/CommitteeListSkeleton';

const CommitteeList = () => {
  const {
    loading,
    isBn,
    isAdmin,
    filteredList,
    searchTerm,
    setSearchTerm,
    debounced,
    columns,
    snackbar,
    handleSnackbarClose,
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
          placeholder={isBn ? 'কেন্দ্রীয় কমিটি..' : 'Central Committee..'}
          sx={{ width: '215px' }}
        />
        {/* <TextField
          InputLabelProps={{ color: 'info' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  disabled={!searchTerm}
                  onClick={() => setSearchTerm('')}
                  size='small'
                >
                  <ClearIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ),
          }}
          name='search'
          defaultValue={searchTerm}
          onChange={(e) => debounced(e.target.value)}
          label={isBn ? 'কমিটি অনুসন্ধান' : 'Search Committee'}
          placeholder={isBn ? 'কেন্দ্রীয় কমিটি...' : 'Central Committee'}
          variant='standard'
          sx={{ width: '215px' }}
        /> */}
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
              ) : filteredList?.length > 0 ? (
                filteredList.map((committee) => (
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
