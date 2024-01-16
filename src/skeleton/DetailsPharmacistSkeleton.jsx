import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const TableRowSkeleton = ({ row }) => {
  return (
    <TableRow
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell
        sx={{
          flex: 1,
          padding: { xs: '12px 8px', sm: '16px 16px' },
        }}
        component='th'
        scope='row'
      >
        {row.name === 'imageUrl' ? (
          <Skeleton
            sx={{
              height: 45,
              width: 40,
              transform: 'scale(1)',
            }}
          />
        ) : (
          row.th
        )}
      </TableCell>
      <TableCell
        sx={{
          flex: 2,
          padding: { xs: '12px 8px', sm: '16px 16px' },
        }}
      >
        <Skeleton
          sx={{
            height: row.name === 'imageUrl' ? 120 : 16,
            width: row.name === 'imageUrl' ? 115 : '100%',
            transform: 'scale(1)',
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const DetailsPharmacistSkeleton = ({ rows }) => {
  return (
    <Table size='small'>
      <TableBody>
        {rows.map((row) => (
          <TableRowSkeleton key={row.th} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default DetailsPharmacistSkeleton;
