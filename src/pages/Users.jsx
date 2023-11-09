import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

import EmptyTableRow from '../components/EmptyTableRow';
import UserRow from '../components/UserRow';
import ColorTitle from '../components/ui/ColorTitle';
import Loading from '../components/ui/Loading';

const Users = () => {
  const {
    ui: { language },
    user: { loading, list },
  } = useStoreState((state) => state);
  const { getUsersData } = useStoreActions((actions) => actions.user);

  const isBn = language === 'BN' ? true : false;

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
              {list?.length > 0 ? (
                list.map((user) => <UserRow key={user._id} user={user} />)
              ) : (
                <EmptyTableRow colSpan={5} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Users;
