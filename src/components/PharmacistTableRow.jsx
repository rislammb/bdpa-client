import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import Link from './ui/Link';

const PharmacistTableRow = ({ pharmacist, columns }) => (
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
            `${
              pharmacist['postingPlace']
                ? `${pharmacist['postingPlace']}, `
                : ''
            }${
              pharmacist['postingUpazila'].name
                ? `${pharmacist['postingUpazila'].name}, `
                : ''
            }${
              pharmacist['postingDistrict'].name
                ? pharmacist['postingDistrict'].name
                : ''
            }`
          ) : column.id === 'regNumber' || column.id === 'name' ? (
            <Link
              to={`/members/${pharmacist['regNumber']}`}
              target='_blank'
              text={value}
            />
          ) : column.id === 'voterDistrict' ? (
            value.name
          ) : (
            value
          )}
        </TableCell>
      );
    })}
  </TableRow>
);

export default PharmacistTableRow;
