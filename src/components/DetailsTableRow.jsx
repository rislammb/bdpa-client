import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import { useState } from 'react';

const DetailsTableRow = ({ row }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleIsEditOpen = () => {
    if (isEditOpen) {
      setIsEditOpen(false);
      setInputValue('');
    } else {
      setIsEditOpen(true);
      setInputValue(row.td);
    }
  };

  const handleSubmit = () => {
    console.log(inputValue);
    setIsEditOpen(false);
    alert('This part is in progress. Try again later!');
  };

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
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            variant='standard'
            sx={{ width: '100%' }}
          />
        ) : (
          row.td
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
