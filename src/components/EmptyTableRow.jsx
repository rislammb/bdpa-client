import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useTheme } from '@mui/material/styles';
import { useStoreState } from 'easy-peasy';

const EmptyTableRow = ({ colSpan }) => {
  const theme = useTheme();

  const { language } = useStoreState((state) => state.ui);

  const isBn = language === 'BN' ? true : false;

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
        {isBn ? 'এখানে দেখানোর কিছু নেই!' : 'Nothing to show here!'}
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
