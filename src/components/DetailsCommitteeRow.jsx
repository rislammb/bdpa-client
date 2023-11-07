import Close from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { committeeMemberFields } from '../constants/committeeMemberFields';
import { getAreaInfo, getBnAreaInfo, objDeepClone } from '../helpers/utilities';
import AddOrEditMemberRow from './AddOrEditMemberRow';
import Link from './ui/Link';

const DetailsCommitteeRow = ({
  member,
  columns,
  disableDeleteMember,
  setSnackbar,
}) => {
  const {
    ui: { language },
    pharmacist: { list },
    member: { error },
  } = useStoreState((state) => state);
  const {
    member: { deleteCommitteeMember, updateMemberData },
    committee: { getDetailsCommitteeDataById },
    pharmacist: { getPharmacistsData },
  } = useStoreActions((actions) => actions);

  const [isEdit, setIsEdit] = useState(false);
  const [memberFields, setMemberFields] = useState(null);

  const isBn = language === 'BN' ? true : false;

  const toggleIsEdit = () => {
    if (isEdit) {
      setIsEdit(false);
      setMemberFields(null);
    } else {
      const fields = objDeepClone(committeeMemberFields);
      if (member) {
        Object.keys(fields).forEach((key) => {
          if (key === 'postName' || key === 'serialNumber') {
            fields[key].value = member[key]?.name;
          } else if (key === 'bn_postName') {
            fields[key].value = member.postName?.bn_name;
          } else if (key === 'pharmacistId') {
            fields[key].value = defaultProps.options.find(
              (item) => item.regNumber === member.regNumber
            );
          }
        });
      }
      setMemberFields(fields);
      setIsEdit(true);
    }
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;

    const clonedState = objDeepClone(memberFields);
    if (name === 'serialNumber') {
      clonedState[name].value = value.replace(/[^0-9]/g, '');
    } else {
      clonedState[name].value = value;
    }
    setMemberFields(clonedState);
  };

  const handleMemberSubmit = async () => {
    const data = await updateMemberData({
      memberId: member._id,
      data: {
        serialNumber: memberFields.serialNumber.value,
        postName: {
          name: memberFields.postName.value,
          bn_name: memberFields.bn_postName.value,
        },
        pharmacistId: memberFields.pharmacistId.value?._id ?? null,
      },
    });

    if (data) {
      getDetailsCommitteeDataById(data.committeeId);
      setMemberFields(null);
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        text:
          typeof error === 'object'
            ? isBn
              ? error.bn_text
              : error.text
            : isBn
            ? 'সদস্য আপডেট ব্যর্থ!'
            : 'Member update failed!',
      });
    }
  };

  const deleteMember = async () => {
    if (
      window.confirm(
        isBn
          ? `আপনি কি সত্যিই সদস্যঃ '${member.postName?.bn_name} : ${member.bn_name}' মুছতে চান?`
          : `Are you sure you want to delete member: '${member.postName?.name} : ${member.name}'?`
      )
    ) {
      const res = await deleteCommitteeMember(member._id);
      if (res) {
        getDetailsCommitteeDataById(member.committeeId);
      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          text: isBn ? 'সদস্য মুছে ফেলতে ব্যর্থ!' : 'Member delete failed!',
        });
      }
    }
  };

  const defaultProps = {
    options: list,
    getOptionLabel: (option) =>
      list.length > 0
        ? isBn
          ? `${option.bn_name} - ${option.name} - ${
              option.regNumber
            } - ${getBnAreaInfo(option, 'posting')}`
          : `${option.name} - ${option.bn_name} - ${
              option.regNumber
            } - ${getAreaInfo(option, 'posting')}`
        : '',
  };

  useEffect(() => {
    if (list.length < 1) getPharmacistsData();
  }, []);

  return isEdit ? (
    <AddOrEditMemberRow
      member={memberFields}
      defaultProps={defaultProps}
      onChange={handleMemberChange}
      type={'EDIT'}
      cancelEdit={toggleIsEdit}
      onSubmit={handleMemberSubmit}
      error={error}
    />
  ) : (
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
            {column.id === 'name' || column.id === 'bn_name' ? (
              <Link to={`/members/${member.regNumber}`} text={value} />
            ) : column.id === 'serialNumber' ||
              column.id === 'postName' ||
              column.id === 'mobile' ? (
              isBn ? (
                value.bn_name
              ) : (
                value.name
              )
            ) : column.id === 'delete' ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <IconButton
                  size='small'
                  onClick={isEdit ? toggleIsEdit : deleteMember}
                  color='error'
                  disabled={!isEdit && disableDeleteMember}
                >
                  {isEdit ? (
                    <Close fontSize='small' />
                  ) : (
                    <DeleteIcon fontSize='small' />
                  )}
                </IconButton>
                <IconButton
                  size='small'
                  onClick={
                    isEdit ? () => handleSubmit(member._id) : toggleIsEdit
                  }
                  color='info'
                >
                  {isEdit ? (
                    <Done fontSize='small' />
                  ) : (
                    <EditOutlined fontSize='small' />
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
