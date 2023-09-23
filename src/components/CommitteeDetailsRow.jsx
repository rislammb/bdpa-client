import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from './ui/Link';

const CommitteeDetailsRow = ({ member, columns }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {columns.map((column) => {
        const value = member[column.id];

        return (
          <TableCell
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              padding: { xs: '8px 6px', sm: '12px' },
            }}
          >
            {column.id === 'name' ? (
              <Link to={`/members/${member.regNumber}`} text={value} />
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CommitteeDetailsRow;
