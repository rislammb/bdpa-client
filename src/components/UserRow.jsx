import { Close, Delete, Done, Edit } from '@mui/icons-material';
import {
  FormControlLabel,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { objDeepClone } from '../helpers/utilities';
import ColorLink from './ui/ColorLink';

const UserRow = ({ user }) => {
  const {
    ui: { language },
    user: { submitting },
    auth: { user: authUser },
  } = useStoreState((state) => state);
  const { updateUserData, deleteUserData } = useStoreActions(
    (actions) => actions.user
  );
  const [dataForEdit, setDataForEdit] = useState(user);
  const [isRowEdit, setIsRowEdit] = useState(false);

  const isBn = language === 'BN' ? true : false;

  const handleToggleEdit = () => {
    if (isRowEdit) {
      setIsRowEdit(false);
    } else {
      setIsRowEdit(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const clonedData = objDeepClone(dataForEdit);

    clonedData[name] = value;

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
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        isBn
          ? `আপনি কি সত্যিই মুছে ফেলতে চান '${user.email} : ${user.regNumber}'?`
          : `Are you sure you want to delete '${user.email} : ${user.regNumber}'?`
      )
    ) {
      deleteUserData(user._id);
    }
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        <ColorLink
          text={user?.regNumber ?? user.email?.split('@')[0]}
          to={user?.regNumber ? `/members/${user?.regNumber}` : ''}
        />
      </TableCell>
      <TableCell>{user?.email}</TableCell>
      <TableCell>
        {isRowEdit ? (
          <FormControlLabel
            sx={{ minWidth: 105, ml: 0 }}
            control={
              <TextField
                InputLabelProps={{ color: 'info' }}
                select
                name={'accountStatus'}
                label={'Account Status'}
                value={dataForEdit.accountStatus}
                onChange={handleChange}
                variant='standard'
                sx={{
                  width: '100%',
                }}
              >
                <MenuItem value={'PEDNING'}>PEDNING</MenuItem>
                <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
                <MenuItem value={'SUSPEND'}>SUSPEND</MenuItem>
              </TextField>
            }
          />
        ) : (
          dataForEdit?.accountStatus
        )}
      </TableCell>
      <TableCell>
        {isRowEdit ? (
          <FormControlLabel
            sx={{ minWidth: 125, ml: 0 }}
            control={
              <TextField
                InputLabelProps={{ color: 'info' }}
                select
                name='roles'
                variant='standard'
                label='Roles'
                SelectProps={{
                  multiple: true,
                  value: dataForEdit?.roles,
                  onChange: handleChange,
                }}
                sx={{
                  width: '100%',
                }}
              >
                <MenuItem disabled value={'USER'}>
                  USER
                </MenuItem>
                <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                <MenuItem value={'DISTRICT_ADMIN'}>DISTRICT_ADMIN</MenuItem>
              </TextField>
            }
          />
        ) : (
          dataForEdit?.roles?.join(', ')
        )}
      </TableCell>

      <TableCell sx={{ minWidth: 105 }} align='right'>
        {!user.roles.includes('SUPER_ADMIN') &&
          authUser.regNumber !== user.regNumber &&
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

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};
