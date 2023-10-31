import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import Link from './ui/Link';

const CommitteeListRow = ({ committee, columns, isBn }) => {
  return (
    <TableRow>
      {columns.map((column) => {
        const value = committee[column.id];

        return (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              padding: { xs: '8px 6px', sm: '12px' },
            }}
          >
            {column.id === 'committeeTitle' ? (
              <Link
                to={`/committees/${committee.committeePath}`}
                text={
                  isBn ? committee.bn_committeeTitle : committee.committeeTitle
                }
                sx={{ fontSize: '1rem' }}
              />
            ) : value ? (
              dayjs(value).format('DD MMM YYYY')
            ) : (
              ''
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CommitteeListRow;
