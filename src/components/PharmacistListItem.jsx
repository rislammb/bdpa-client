import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { getAreaInfo } from '../helpers/utilities';
import Link from './ui/Link';

const PharmacistListItem = ({ pharmacist, columns, isTargetBlank }) => (
  <TableRow hover tabIndex={-1}>
    {columns.map((column) => {
      const value = pharmacist[column.id];

      return (
        <TableCell
          key={column.id}
          align={column.align}
          sx={{
            minWidth: column.minWidth,
            padding: { xs: '8px 6px', sm: '12px' },
          }}
        >
          {column.id === 'dateOfBirth' ? (
            dayjs(value).format('DD MMM YYYY')
          ) : column.id === 'mainPosting' ? (
            getAreaInfo(pharmacist, 'posting')
          ) : column.id === 'regNumber' || column.id === 'name' ? (
            <Link
              to={`/members/${pharmacist['regNumber']}`}
              target={isTargetBlank ? '_blank' : ''}
              text={value}
            />
          ) : column.id === 'voterDistrict' ? (
            value.bn_name
          ) : (
            value
          )}
        </TableCell>
      );
    })}
  </TableRow>
);

export default PharmacistListItem;
