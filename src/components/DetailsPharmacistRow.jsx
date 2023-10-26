import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';

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
    isEditOpen,
    inputValue,
    handleChange,
    error,
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
      {row.name !== 'imageUrl' && (
        <TableCell
          sx={{
            flexGrow: 1,
            padding: { xs: '8px 8px', sm: '8px 16px' },
            alignContent: 'center',
          }}
          component='th'
          scope='row'
        >
          {row.th}
        </TableCell>
      )}
      <TableCell
        sx={{
          flexGrow: 2,
          padding: { xs: '8px 8px', sm: '8px 16px' },
          fontWeight:
            row.name === 'regNumber' || row.name === 'name' ? 'bold' : '',
          textAlign: row.name === 'imageUrl' && 'center',
        }}
      >
        {isEditOpen ? (
          row.type === 'text' ? (
            <TextField
              value={inputValue}
              onChange={handleChange}
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
            row['textGroupFields'].map((item) => (
              <TextField
                key={item.name}
                name={item.name}
                label={isBn ? item.bn_label : item.label}
                value={inputValue && inputValue[item.name]}
                onChange={handleChange}
                variant='standard'
                sx={{ width: '100%', fontSize: '7px' }}
              />
            ))
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
              style={{ width: '100%' }}
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

      {(row.isEdit || row.name !== 'imageUrl') && (
        <TableCell
          sx={{
            padding: { xs: '1px 13px 1px 3px', sm: '3px 15px 3px 5px' },
            width: { xs: '85px', sm: '93px' },
          }}
        >
          {row.isEdit ? (
            isEditOpen ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={handleIsEditOpen}
                  disabled={!row.isEdit}
                >
                  <Close />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={handleSubmit}
                  disabled={!row.isEdit}
                >
                  <Done />
                </IconButton>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <IconButton
                  sx={{ textAlign: 'center' }}
                  edge='end'
                  aria-label='edit'
                  onClick={() => handleIsEditOpen(row.name)}
                  disabled={!row.isEdit}
                >
                  <EditOutlined />
                </IconButton>
              </div>
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
