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

import { useSearchParams } from 'react-router-dom';
import StatusFilter from '../components/StatusFilter';
import CustomPagination from '../components/shared/CustomPagination';
import Search from '../components/shared/Search';
import UserListSkeleton from '../skeleton/UserListSkeleton';

const Users = () => {
  const [searchParams] = useSearchParams();
  const {
    ui: { language },
    user: { loading, list, usersCount, totalUsersCount },
  } = useStoreState((state) => state);
  const { getUsersData } = useStoreActions((actions) => actions.user);

  const isBn = language === 'BN' ? true : false;

  useEffect(() => {
    document.title = isBn ? 'বিডিপিএ | ব্যবহারকারীগণ' : 'BDPA | Users';
  }, [isBn]);

  useEffect(() => {
    getUsersData(searchParams);
  }, [searchParams]);

  return (
    <Box
      sx={{
        maxWidth: '850px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        pt: 2.5,
      }}
    >
      <ColorTitle variant={'h4'} text={isBn ? 'ব্যবহারকারীগণ' : 'Users'} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StatusFilter />
        <Search
          label={isBn ? 'ব্যবহারকারী অনুসন্ধান' : 'Search Users'}
          placeholder={
            isBn ? 'ইমেইল বা রেজিস্ট্রেশন ..' : 'Email  or Registration ..'
          }
          sx={{ alignSelf: 'end' }}
        />
      </Box>

      {loading ? (
        <UserListSkeleton isBn={isBn} />
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

      <CustomPagination
        count={usersCount}
        pageSize={30}
        totalCount={totalUsersCount}
      />
    </Box>
  );
};

export default Users;
