import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TableHeader = ({ columns }) => (
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          sx={{
            minWidth: column.minWidth,
            padding: { xs: '8px 6px', sm: '12px', md: '12px 16px' },
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeader;
