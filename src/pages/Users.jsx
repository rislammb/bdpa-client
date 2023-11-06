import { Delete } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import ColorTitle from '../components/ui/ColorTitle';
import Loading from '../components/ui/Loading';

function createData(id, regNumber, email, accountStatus, roles) {
  return {
    id,
    regNumber,
    email,
    accountStatus,
    roles,
  };
}

const Users = () => {
  const {
    ui: { language },
    user: { loading, submitting, error, list },
  } = useStoreState((state) => state);
  const { getUsersData, deleteUserData } = useStoreActions(
    (actions) => actions.user
  );
  const [rows, setRows] = useState([]);

  const isBn = language === 'BN' ? true : false;

  const handleDelete = (id) => {
    deleteUserData(id);
  };

  useEffect(() => {
    if (list.length > 0) {
      setRows(
        list.map((item) =>
          createData(
            item._id,
            item.regNumber,
            item.email,
            item.accountStatus,
            item.roles.join(', ')
          )
        )
      );
    }
  }, [list]);

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '850px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        py: 2,
      }}
    >
      <ColorTitle variant={'h4'} text={isBn ? 'ব্যবহারকারীগণ' : 'Users'} />

      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 630 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>{isBn ? 'নিবন্ধন সংখ্যা' : 'Reg Number'}</TableCell>
                <TableCell>{isBn ? 'ইমেইল' : 'Email'}</TableCell>
                <TableCell>
                  {isBn ? 'একাউন্টের অবস্থা' : 'Account Status'}
                </TableCell>
                <TableCell>{isBn ? 'রোলস' : 'Roles'}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.regNumber}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.accountStatus}</TableCell>
                  <TableCell>{row.roles}</TableCell>
                  <TableCell align='right'>
                    {!row.roles.includes('SUPER_ADMIN') && (
                      <IconButton
                        color='error'
                        disabled={submitting}
                        onClick={() => handleDelete(row.id)}
                      >
                        <Delete fontSize='small' />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Users;
