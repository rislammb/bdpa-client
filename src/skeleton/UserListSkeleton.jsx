import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const UserListSkeleton = ({ isBn }) => {
  return (
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
          <UserRowSkeleton />
          <UserRowSkeleton />
          <UserRowSkeleton />
          <UserRowSkeleton />
          <UserRowSkeleton />
          <UserRowSkeleton />
          <UserRowSkeleton />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListSkeleton;

UserListSkeleton.propTypes = {
  isBn: PropTypes.bool,
};

const UserRowSkeleton = () => {
  const theme = useTheme();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Skeleton
          width={90}
          sx={{
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
          }}
        />
      </TableCell>
      <TableCell>
        <Skeleton width={190} />
      </TableCell>
      <TableCell>
        <Skeleton width={90} />
      </TableCell>
      <TableCell>
        <Skeleton width={130} />
      </TableCell>

      <TableCell sx={{ minWidth: 105, display: 'flex', gap: 1 }} align='right'>
        <Skeleton
          width={28}
          height={28}
          variant='circular'
          sx={{ bgcolor: '#d32f2f' }}
        />
        <Skeleton
          width={28}
          height={28}
          variant='circular'
          sx={{ bgcolor: '#0288d1' }}
        />
      </TableCell>
    </TableRow>
  );
};
