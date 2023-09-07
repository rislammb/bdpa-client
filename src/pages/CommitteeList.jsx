import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Link from '../components/ui/Link';

const columns = [
  { id: 'committeeTitle', label: 'Committee Title', minWidth: 170 },
  { id: 'workHasStarted', label: 'Work Has Started', minWidth: 120 },
  { id: 'willExpire', label: 'Will Expire', minWidth: 90 },
];

const CommitteeList = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    // setCommittees(committee);
  }, []);

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
          label={'Search Committe'}
          placeholder={'Central Committee'}
          variant='standard'
          sx={{ width: '190px' }}
        />
        <Button
          startIcon={<Add />}
          component={RouterLink}
          to='/committee/add'
          variant='contained'
        >
          Committee
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table stickyHeader size='' aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      padding: { xs: '8px 6px', sm: '8px 12px' },
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {committees?.length > 0 ? (
                committees.map((com) => (
                  <TableRow key={com.id}>
                    {columns.map((column) => {
                      const value = com[column.id];

                      return (
                        <TableCell
                          sx={{
                            minWidth: column.minWidth,
                            padding: { xs: '8px 6px', sm: '12px' },
                          }}
                        >
                          {column.id === 'committeeTitle' ? (
                            <Link
                              to={`/committee/${com.path}`}
                              text={com.committeeTitle}
                              sx={{ fontSize: '1rem' }}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    sx={{
                      textAlign: 'center',
                      p: 2.5,
                      color: theme.palette.warning.main,
                    }}
                  >
                    There is nothing to show!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CommitteeList;
