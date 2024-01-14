import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const DetailsPharmacistSkeleton = ({ rows }) => {
  return (
    <>
      {rows.map((row) => (
        <TableRowSkeleton key={row.th} row={row} />
      ))}
    </>
  );
};

export default DetailsPharmacistSkeleton;

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
        <Skeleton
          sx={{
            height: row.name === 'imageUrl' ? 45 : 16,
            width: row.name === 'imageUrl' ? 40 : '100%',
            transform: 'scale(1)',
          }}
        />
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
