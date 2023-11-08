import { Close, Delete, Done, Edit } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { objDeepClone } from '../helpers/utilities';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserRow = ({ row, user }) => {
  const {
    ui: { language },
    user: { submitting },
  } = useStoreState((state) => state);
  const { updateUserData, deleteUserData } = useStoreActions(
    (actions) => actions.user
  );
  const [isRowEdit, setIsRowEdit] = useState(false);
  const [dataForEdit, setDataForEdit] = useState(null);

  const isBn = language === 'BN' ? true : false;

  const handleToggleEdit = () => {
    if (isRowEdit) {
      setIsRowEdit(false);
      setDataForEdit(null);
    } else {
      setIsRowEdit(true);
      setDataForEdit(user);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const clonedData = objDeepClone(dataForEdit);

    if (name === 'roles') {
      clonedData[name] = typeof value === 'string' ? value.split(',') : value;
    } else {
      clonedData[name] = value;
    }
    setDataForEdit(clonedData);
  };

  const handleUserSubmit = async () => {
    const res = await updateUserData({
      id: user._id,
      data: {
        accountStatus: dataForEdit.accountStatus,
        roles: dataForEdit.roles,
      },
    });
    if (res) {
      setIsRowEdit(false);
      setDataForEdit(null);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        isBn
          ? `আপনি কি সত্যিই মুছে ফেলতে চান '${row.email} : ${row.regNumber}'?`
          : `Are you sure you want to delete '${row.email} : ${row.regNumber}'?`
      )
    ) {
      deleteUserData(row.id);
    }
  };

  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='th' scope='row'>
        {row.regNumber}
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        {isRowEdit && dataForEdit ? (
          <FormControl sx={{ minWidth: 110 }}>
            <InputLabel color='info'>Account Status</InputLabel>
            <Select
              name={'accountStatus'}
              value={dataForEdit.accountStatus}
              onChange={handleChange}
              variant='standard'
            >
              <MenuItem value={'PEDNING'}>PEDNING</MenuItem>
              <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
              <MenuItem value={'SUSPEND'}>SUSPEND</MenuItem>
            </Select>
          </FormControl>
        ) : (
          row.accountStatus
        )}
      </TableCell>
      <TableCell>
        {isRowEdit && dataForEdit ? (
          <FormControl sx={{ minWidth: 170 }}>
            <InputLabel color='info'>Roles</InputLabel>
            <Select
              name={'roles'}
              multiple
              value={dataForEdit.roles}
              onChange={handleChange}
              input={<OutlinedInput label='Roles' />}
              MenuProps={MenuProps}
              variant='standard'
            >
              <MenuItem disabled value={'USER'}>
                USER
              </MenuItem>
              <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
              <MenuItem value={'DISTRICT_ADMIN'}>DISTRICT_ADMIN</MenuItem>
            </Select>
          </FormControl>
        ) : (
          row.roles
        )}
      </TableCell>
      <TableCell align='right'>
        {!row.roles.includes('SUPER_ADMIN') &&
          (isRowEdit ? (
            <>
              <IconButton
                color='info'
                disabled={submitting}
                onClick={handleUserSubmit}
              >
                <Done fontSize='small' />
              </IconButton>
              <IconButton
                color='error'
                disabled={submitting}
                onClick={handleToggleEdit}
              >
                <Close fontSize='small' />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                color='info'
                disabled={submitting}
                onClick={handleToggleEdit}
              >
                <Edit fontSize='small' />
              </IconButton>
              <IconButton
                color='error'
                disabled={submitting}
                onClick={handleDelete}
              >
                <Delete fontSize='small' />
              </IconButton>
            </>
          ))}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
