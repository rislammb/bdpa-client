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
import TableHeader from '../components/TableHeader';
import Loading from '../components/ui/Loading';
import useCommitteeList from '../hooks/useCommitteeList';

const CommitteeList = () => {
  const { loading, user, filteredList, searchTerm, setSearchTerm, columns } =
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
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setSearchTerm('')} size='small'>
                  <ClearIcon color='error' fontSize='small' />
                </IconButton>
              </InputAdornment>
            ),
          }}
          name='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label={'কমিটি অনুসন্ধান'}
          placeholder={'কেন্দ্রীয় কমিটি...'}
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
            কমিটি
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
