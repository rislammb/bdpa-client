import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePickerComp from './DatePickerComp';

import { axiosInstance } from '../config';

const DetailsTableRow = ({ row, pharmacist }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  const handleIsEditOpen = () => {
    if (isEditOpen) {
      setInputValue(row.td);
      setIsEditOpen(false);
    } else {
      setIsEditOpen(true);
    }
  };

  const handleChange = (e, name) => {
    if (name === 'dateOfBirth' || name === 'dateOfJoin') {
      setInputValue(e);
    } else {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (inputValue !== row.td) {
      axiosInstance
        .put(`/list/${pharmacist.regNumber}`, { [row.name]: inputValue })
        .then(() => {
          setIsEditOpen(false);
        })
        .catch((e) => {
          setIsEditOpen(false);
          setInputValue(row.td);
          alert("Data doesn't update!");
          console.log('Error', e);
        });
    } else {
      setIsEditOpen(false);
    }
  };

  useEffect(() => {
    setInputValue(row.td);
  }, [row.td]);

  return (
    <TableRow
      key={row.th}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr 2fr 85px',
          sm: '1fr 2fr 93px',
        },
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell
        sx={{
          padding: { xs: '5px 8px', sm: '6px 16px' },
          alignContent: 'center',
        }}
        component='th'
        scope='row'
      >
        {row.th}
      </TableCell>
      <TableCell sx={{ padding: { xs: '5px 8px', sm: '6px 16px' } }}>
        {isEditOpen ? (
          row.type === 'text' ? (
            <TextField
              value={inputValue}
              onChange={handleChange}
              variant='standard'
              sx={{ width: '100%' }}
            />
          ) : row.type === 'date' ? (
            <DatePickerComp
              name={row.name}
              value={inputValue}
              onChange={handleChange}
            />
          ) : (
            <p>This part is in progress</p>
          )
        ) : (
          inputValue
        )}
      </TableCell>
      <TableCell
        sx={{ padding: { xs: '1px 13px 1px 3px', sm: '3px 15px 3px 5px' } }}
      >
        {row.edit &&
          (isEditOpen ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton
                edge='end'
                aria-label='edit'
                onClick={handleIsEditOpen}
                disabled={!row.edit}
              >
                <Close />
              </IconButton>
              <IconButton
                edge='end'
                aria-label='edit'
                onClick={handleSubmit}
                disabled={!row.edit}
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
                onClick={handleIsEditOpen}
                disabled={!row.edit}
              >
                <EditOutlined />
              </IconButton>
            </div>
          ))}
      </TableCell>
    </TableRow>
  );
};

export default DetailsTableRow;
