import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePickerComp from './DatePickerComp';

import dayjs from 'dayjs';
import { axiosInstance } from '../config';
import {
  changeHandlerForPostingGroup,
  postingFieldsFromPharmacist,
  postingValueFromState,
} from '../helpers/utilities';
import PostingGroup from './PostingGroup';

const DetailsTableRow = ({ row, pharmacist }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [postingFields, setPostingFields] = useState(
    postingFieldsFromPharmacist(pharmacist)
  );
  const postingFieldsArray = Object.keys(postingFields).reduce((acc, cur) => {
    acc.push(postingFields[cur]);
    return acc;
  }, []);
  const [error, setError] = useState({});

  const handleIsEditOpen = () => {
    setError({});
    if (isEditOpen) {
      setInputValue(row.td);
      postingFieldsFromPharmacist(pharmacist);
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

  const handlePostingChange = (e) => {
    setPostingFields((prevState) => {
      return changeHandlerForPostingGroup(
        prevState,
        e.target.name,
        e.target.value
      );
    });
  };

  const handleSubmit = () => {
    setError({});
    if (row.name === 'mainPosting') {
      const editedPostingData = postingValueFromState(postingFields);
      axiosInstance
        .put(`/list/${pharmacist.regNumber}`, editedPostingData)
        .then((res) => {
          setInputValue(
            `${
              editedPostingData.postingPlace
                ? `${editedPostingData.postingPlace}, `
                : ''
            }${
              editedPostingData.postingUpazila?.name
                ? `${editedPostingData.postingUpazila?.name}, `
                : ''
            }${
              editedPostingData.postingDistrict?.name
                ? editedPostingData.postingDistrict?.name
                : ''
            }`
          );
        })
        .then(() => setIsEditOpen(false))
        .catch((e) => {
          if (typeof e.response.data === 'object') {
            setError(e.response.data);
          }
          setIsEditOpen(false);
          setInputValue(row.td);
        });
    } else {
      axiosInstance
        .put(`/list/${pharmacist.regNumber}`, { [row.name]: inputValue })
        .then(() => {
          setIsEditOpen(false);
        })
        .catch((e) => {
          if (typeof e.response.data === 'object') {
            setError(e.response.data);
          }
          setIsEditOpen(false);
          setInputValue(row.td);
        });
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
              error={error[row.name] ? true : false}
              sx={{ width: '100%' }}
              helperText={error[row.name] || ''}
            />
          ) : row.type === 'date' ? (
            <DatePickerComp
              name={row.name}
              value={inputValue}
              onChange={handleChange}
            />
          ) : row.name === 'mainPosting' ? (
            <PostingGroup
              postingInfo={postingFieldsArray}
              onChange={handlePostingChange}
              error={{}}
            />
          ) : (
            <p>This part is in progress</p>
          )
        ) : row.type === 'date' ? (
          dayjs(inputValue).format('DD MMM YYYY')
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
                onClick={() => handleIsEditOpen(row.name)}
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
