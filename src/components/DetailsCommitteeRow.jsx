import Close from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Link from './ui/Link';

const DetailsCommitteeRow = ({ member, columns }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [memberForEdit, setMemberForEdit] = useState(null);

  const toggleIsEdit = () => {
    if (isEdit) {
      setIsEdit(false);
      setMemberForEdit(null);
    } else {
      setMemberForEdit(member);
      setIsEdit(true);
    }
  };

  const handleSubmit = (id) => {
    console.log('member id for edit', id);
  };

  const deleteMember = (id) => {
    console.log('member id for delete', id);
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {columns.map((column) => {
        const value = member[column.id];

        return (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              padding: { xs: '8px 6px', sm: '12px' },
            }}
          >
            {column.id === 'bn_name' ? (
              <Link to={`/members/${member.regNumber}`} text={value} />
            ) : column.id === 'delete' ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size='small'
                  onClick={
                    isEdit ? () => handleSubmit(member._id) : toggleIsEdit
                  }
                  color='primary'
                >
                  {isEdit ? (
                    <Done fontSize='small' />
                  ) : (
                    <EditOutlined fontSize='small' />
                  )}
                </IconButton>
                <IconButton
                  size='small'
                  onClick={
                    isEdit ? toggleIsEdit : () => deleteMember(member._id)
                  }
                  color='error'
                >
                  {isEdit ? (
                    <Close fontSize='small' />
                  ) : (
                    <DeleteIcon fontSize='small' />
                  )}
                </IconButton>
              </Box>
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DetailsCommitteeRow;
