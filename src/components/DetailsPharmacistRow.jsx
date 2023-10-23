import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';

import { genderOptionsWithEmpty } from '../constants/gender';
import { onDeputationOptions } from '../constants/onDeputationFields';
import useDetailsPharmacistRow from '../hooks/useDetailsPharmacistRow';
import DatePickerComp from './DatePickerComp';
import PostingGroup from './PostingGroup';
import SelectComponent from './SelectComponent';

const DetailsPharmacistRow = ({
  row,
  pharmacist,
  showDeputationRow,
  handleShowDeputation,
  setSnackbar,
}) => {
  const {
    isBn,
    isEditOpen,
    inputValue,
    handleChange,
    error,
    handleIsEditOpen,
    jobDepertment,
    setJobDepertment,
    postingFieldsArray,
    handlePostingChange,
    permanentFieldsArray,
    handlePermanentChange,
    voterAreaArray,
    handleVoterAreaChange,
    onDeputation,
    setOnDeputation,
    deputationFieldsArray,
    handleDeputationChange,
    tableData,
    handleSubmit,
  } = useDetailsPharmacistRow({
    row,
    pharmacist,
    handleShowDeputation,
    setSnackbar,
  });

  return (
    <TableRow
      key={row.th}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: row.isEdit ? '1fr 2fr 85px' : '1fr 2fr',
          sm: row.isEdit ? '1fr 2fr 93px' : '1fr 2fr',
        },
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell
        sx={{
          padding: { xs: '8px 8px', sm: '8px 16px' },
          alignContent: 'center',
        }}
        component='th'
        scope='row'
      >
        {row.th}
      </TableCell>
      <TableCell
        sx={{
          padding: { xs: '8px 8px', sm: '8px 16px' },
          fontWeight:
            row.name === 'regNumber' || row.name === 'name' ? 'bold' : '',
        }}
      >
        {isEditOpen ? (
          row.type === 'text' ? (
            <TextField
              value={inputValue}
              onChange={handleChange}
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
              value={jobDepertment.value}
              options={jobDepertment.options}
              onChange={(e) =>
                setJobDepertment((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
              style={{ width: '100%' }}
            />
          ) : row.name === 'mainPosting' ? (
            <PostingGroup
              postingInfo={postingFieldsArray}
              onChange={handlePostingChange}
              error={error}
              style={{ width: '100%' }}
            />
          ) : row.name === 'permanentAddress' ? (
            <PostingGroup
              postingInfo={permanentFieldsArray}
              onChange={handlePermanentChange}
              error={error}
              style={{ width: '100%' }}
            />
          ) : row.name === 'voterArea' ? (
            <PostingGroup
              postingInfo={voterAreaArray}
              onChange={handleVoterAreaChange}
              error={error}
              style={{ width: '100%' }}
            />
          ) : row.name === 'onDeputation' ? (
            <SelectComponent
              name='onDeputation'
              value={onDeputation}
              options={[...onDeputationOptions]}
              onChange={(e) => setOnDeputation(e.target.value)}
              style={{ width: '100%' }}
            />
          ) : row.name === 'deputationPosting' ? (
            <PostingGroup
              postingInfo={deputationFieldsArray}
              onChange={handleDeputationChange}
              error={error}
              style={{ width: '100%' }}
            />
          ) : (
            ''
          )
        ) : row.type === 'deputationPosting' ? (
          showDeputationRow ? (
            tableData
          ) : (
            ''
          )
        ) : (
          tableData
        )}
      </TableCell>
      {row.isEdit && (
        <TableCell
          sx={{ padding: { xs: '1px 13px 1px 3px', sm: '3px 15px 3px 5px' } }}
        >
          {row.isEdit &&
            (isEditOpen ? (
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
            ))}
        </TableCell>
      )}
    </TableRow>
  );
};

export default DetailsPharmacistRow;
