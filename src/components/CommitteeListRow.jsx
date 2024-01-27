import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { getBnDate } from '../helpers/date';
import Link from './ui/Link';

const CommitteeListRow = ({ committee, columns, isBn }) => {
  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      {columns.map((column) => {
        const value = committee[column.id];

        return (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              padding: { xs: '8px 6px', sm: '12px', md: '12px 16px' },
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
              isBn ? (
                getBnDate(value)
              ) : (
                dayjs(value).format('DD MMM YYYY')
              )
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

CommitteeListRow.propTypes = {
  committee: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  isBn: PropTypes.bool,
};
