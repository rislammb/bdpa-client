import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const CommitteeDetailsRow = ({ member, columns }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {columns.map((column) => {
        const value = member[column.id];

        return <TableCell key={column.id}>{value}</TableCell>;
      })}
    </TableRow>
  );
};

export default CommitteeDetailsRow;
