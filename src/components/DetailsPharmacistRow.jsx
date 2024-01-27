import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton, TableCell, TableRow, TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { genderOptionsWithEmpty } from '../constants/gender';
import { jobDepertmentOptionsWithEmpty } from '../constants/jobDepertment';
import { onDeputationOptions } from '../constants/onDeputationFields';
import useDetailsPharmacistRow from '../hooks/useDetailsPharmacistRow';
import DatePickerComp from './DatePickerComp';
import PostingGroup from './PostingGroup';
import SelectComponent from './SelectComponent';

const DetailsPharmacistRow = ({ row, pharmacist, setSnackbar }) => {
  const {
    isBn,
    user,
    isPermittedForEdit,
    isEditOpen,
    inputValue,
    handleChange,
    error,
    submitting,
    handleIsEditOpen,
    addressFieldsArray,
    tableData,
    handleSubmit,
  } = useDetailsPharmacistRow({
    row,
    pharmacist,
    setSnackbar,
  });

  return (
    <TableRow
      key={row.th}
      sx={{
        display: 'flex',
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell
        sx={{
          flex: 1,
          padding: user ? { xs: '8px 8px', sm: '8px 16px' } : '16px',
          alignContent: 'center',
        }}
        component='th'
        scope='row'
      >
        {row.name === 'imageUrl' ? (
          <img
            src={pharmacist.mainImageUrl}
            alt={pharmacist.name}
            height={'45'}
            style={{ border: '1px solid #ccc' }}
          />
        ) : (
          row.th
        )}
      </TableCell>

      <TableCell
        sx={{
          flex: 2,
          padding: user ? { xs: '8px 8px', sm: '8px 16px' } : '16px',
          fontWeight:
            row.name === 'regNumber' || row.name === 'name' ? 'bold' : '',
        }}
      >
        {isEditOpen ? (
          row.type === 'text' ? (
            <TextField
              value={inputValue}
              onChange={handleChange}
              color='info'
              label={row.name === 'imageUrl' && 'Image URL'}
              variant='standard'
              sx={{ width: '100%', fontSize: '7px' }}
              error={error && error[row.name] ? true : false}
              helperText={
                error &&
                error[row.name] &&
                (isBn
                  ? error[row.name]?.bn_text ?? ''
                  : error[row.name]?.text ?? '')
              }
            />
          ) : row.type === 'textGroup' && row['textGroupFields'] ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {row['textGroupFields'].map((item) => (
                <TextField
                  key={item.name}
                  name={item.name}
                  color='info'
                  label={isBn ? item.bn_label : item.label}
                  value={inputValue && inputValue[item.name]}
                  onChange={handleChange}
                  variant='standard'
                  sx={{ width: '100%', fontSize: '7px' }}
                  error={
                    error && error[row.name] && error[row.name][item.name]
                      ? true
                      : false
                  }
                  helperText={
                    error &&
                    error[row.name] &&
                    (isBn
                      ? error[row.name][item.name]?.bn_text ?? ''
                      : error[row.name][item.name]?.text ?? '')
                  }
                />
              ))}
            </Box>
          ) : row.type === 'date' ? (
            <DatePickerComp
              name={row.name}
              value={inputValue}
              onChange={handleChange}
              disableFuture
              referenceDate={
                row.name === 'dateOfBirth' ? '1999-12-31' : '2013-12-31'
              }
            />
          ) : row.name === 'gender' ? (
            <SelectComponent
              name='gender'
              value={inputValue.id}
              options={genderOptionsWithEmpty}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          ) : row.name === 'jobDepertment' ? (
            <SelectComponent
              name='jobDepertment'
              value={inputValue.id}
              options={jobDepertmentOptionsWithEmpty}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          ) : row.type === 'area' ? (
            <PostingGroup
              postingInfo={addressFieldsArray}
              onChange={handleChange}
              error={error}
              style={{
                width: '100%',
                '& .MuiTextField-root': { m: 1, width: '33.33333ch' },
              }}
            />
          ) : row.name === 'onDeputation' ? (
            <SelectComponent
              name='onDeputation'
              value={inputValue.id}
              options={onDeputationOptions}
              onChange={handleChange}
              style={{ width: '100%' }}
              error={
                error &&
                (isBn
                  ? error[row.name]?.bn_text ?? ''
                  : error[row.name]?.text ?? '')
              }
            />
          ) : (
            ''
          )
        ) : row.name === 'imageUrl' ? (
          <img
            src={tableData}
            alt={pharmacist.name}
            height={'130'}
            style={{ border: '1px solid #ccc' }}
          />
        ) : (
          tableData
        )}
      </TableCell>

      {isPermittedForEdit && (
        <TableCell
          sx={{
            flexBasis: { xs: '85px', sm: '93px' },
            padding: { xs: '2px 15px 2px 3px', sm: '4px 18px 4px 5px' },
          }}
        >
          {row.isEditable ? (
            isEditOpen ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={handleIsEditOpen}
                  disabled={!row.isEditable || submitting}
                  color='error'
                >
                  <Close />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={handleSubmit}
                  disabled={!row.isEditable || submitting}
                  color='info'
                >
                  <Done />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'right' }}>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={() => handleIsEditOpen(row.name)}
                  disabled={!row.isEditable}
                  color='info'
                >
                  <EditOutlined />
                </IconButton>
              </Box>
            )
          ) : (
            ''
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

export default DetailsPharmacistRow;

DetailsPharmacistRow.propTypes = {
  row: PropTypes.object.isRequired,
  pharmacist: PropTypes.object.isRequired,
  setSnackbar: PropTypes.func,
};
