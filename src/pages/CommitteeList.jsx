import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CommitteeListRow from '../components/CommitteeListRow';
import EmptyTableRow from '../components/EmptyTableRow';
import SnackbarComp from '../components/Snackbar';
import TableHeader from '../components/TableHeader';
import Loading from '../components/ui/Loading';
import useCommitteeList from '../hooks/useCommitteeList';

const CommitteeList = () => {
  const {
    loading,
    isBn,
    user,
    filteredList,
    searchTerm,
    setSearchTerm,
    columns,
    snackbar,
    handleSnackbarClose,
  } = useCommitteeList();

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
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setSearchTerm('')} size='small'>
                  <ClearIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ),
          }}
          name='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label={isBn ? 'কমিটি অনুসন্ধান' : 'Search Committee'}
          placeholder={isBn ? 'কেন্দ্রীয় কমিটি...' : 'Central Committee'}
          variant='standard'
          sx={{ width: '210px' }}
        />
        {user && (
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
              {filteredList?.length > 0 ? (
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
