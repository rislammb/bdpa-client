import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';

const CommitteeListSkeleton = ({ columns }) => {
  return (
    <>
      <TableRowSkeleton columns={columns} />
      <TableRowSkeleton columns={columns} />
      <TableRowSkeleton columns={columns} />
      <TableRowSkeleton columns={columns} />
      <TableRowSkeleton columns={columns} />
    </>
  );
};

export default CommitteeListSkeleton;

const TableRowSkeleton = ({ columns }) => {
  const theme = useTheme();

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          sx={{
            minWidth: column.minWidth,
            padding: { xs: '8px 6px', sm: '12px' },
          }}
        >
          <Skeleton
            height={24}
            width={column.id !== 'committeeTitle' ? 100 : ''}
            sx={{
              bgcolor:
                column.id === 'committeeTitle' &&
                (theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main),
            }}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
