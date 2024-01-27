import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { getBnDate } from '../helpers/date';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';
import Link from './ui/Link';

const PharmacistListItem = ({ pharmacist, columns }) => {
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

  return (
    <TableRow hover tabIndex={-1}>
      {columns.map((column) => {
        const value = pharmacist[column.id];

        return (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              padding: { xs: '8px 6px', sm: '12px', md: '12px 16px' },
              whiteSpace: column.id === 'regNumber' && 'nowrap',
            }}
          >
            {column.id === 'dateOfBirth' ? (
              value &&
              (isBn ? getBnDate(value) : dayjs(value).format('DD MMM YYYY'))
            ) : column.id === 'mainPosting' ? (
              isBn ? (
                getBnAreaInfo(pharmacist, 'posting')
              ) : (
                getAreaInfo(pharmacist, 'posting')
              )
            ) : column.id === 'regNumber' || column.id === 'name' ? (
              <Link to={`/members/${pharmacist['regNumber']}`} text={value} />
            ) : column.id === 'voterDistrict' ? (
              isBn ? (
                value.bn_name
              ) : (
                value.name
              )
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default PharmacistListItem;

PharmacistListItem.propTypes = {
  pharmacist: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};
