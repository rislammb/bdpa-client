import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const TableRowSkeleton = ({ row, isPermittedForEdit }) => {
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
      {isPermittedForEdit && (
        <TableCell
          sx={{
            flexBasis: { xs: '45px', sm: '55px' },
            padding: { xs: '8px', sm: '12px 16px' },
          }}
        >
          {row.isEditable && (
            <Box sx={{ textAlign: 'right' }}>
              <Skeleton
                variant='circular'
                width={24}
                height={24}
                sx={{
                  bgcolor: '#29b6f6',
                }}
              />
            </Box>
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

const DetailsPharmacistSkeleton = ({ rows, isPermittedForEdit }) => {
  return (
    <Table size='small'>
      <TableBody>
        {rows.map((row) => (
          <TableRowSkeleton
            key={row.th}
            row={row}
            isPermittedForEdit={isPermittedForEdit}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default DetailsPharmacistSkeleton;
