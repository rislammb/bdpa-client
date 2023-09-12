import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useTheme } from '@mui/material/styles';

const EmptyTableRow = ({ colSpan }) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        sx={{
          textAlign: 'center',
          p: 2.5,
          color: theme.palette.warning.main,
        }}
      >
        There is nothing to show!
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
