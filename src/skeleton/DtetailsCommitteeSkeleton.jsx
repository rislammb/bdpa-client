import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import TableHeader from '../components/TableHeader';

const DtetailsCommitteeSkeleton = ({ columns, isPermittedForEdit }) => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: '950px', margin: 'auto' }}>
      <Box
        sx={{
          my: 1.5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {isPermittedForEdit && (
          <Skeleton
            sx={{ alignSelf: 'end', bgcolor: '#0288d1', mr: 1 }}
            width={32}
            height={32}
            variant='circular'
          />
        )}
        <Skeleton
          width={230}
          height={42}
          sx={{
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
          }}
        />
        <Skeleton width={190} height={28} />
        <Skeleton width={160} height={28} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton width={24} height={24} variant='circular' />
          <Skeleton width={24} height={24} variant='circular' />
          <Skeleton width={24} height={24} variant='circular' />
          <Skeleton width={24} height={24} variant='circular' />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size='small' stickyHeader>
          <TableHeader columns={columns} />
          <TableBody>
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
            <DetailsCommitteeRowSkeleton columns={columns} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DtetailsCommitteeSkeleton;

DtetailsCommitteeSkeleton.propTypes = {
  columns: PropTypes.array.isRequired,
  isPermittedForEdit: PropTypes.bool,
};

const DetailsCommitteeRowSkeleton = ({ columns }) => {
  const theme = useTheme();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          sx={{
            padding: { xs: '8px 6px', sm: '12px' },
          }}
        >
          {column.id === 'delete' ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
              }}
            >
              <Skeleton
                width={24}
                height={24}
                sx={{ bgcolor: '#d32f2f' }}
                variant='circular'
              />
              <Skeleton
                width={24}
                height={24}
                sx={{ bgcolor: '#0288d1' }}
                variant='circular'
              />
            </Box>
          ) : (
            <Skeleton
              sx={{
                bgcolor:
                  (column.id === 'name' || column.id === 'bn_name') &&
                  (theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main),
              }}
            />
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

DetailsCommitteeRowSkeleton.propTypes = {
  columns: PropTypes.array.isRequired,
};
