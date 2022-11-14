import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton, TableCell, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePickerComp from './DatePickerComp';

import dayjs from 'dayjs';
import { axiosInstance } from '../config';
import { genderField, genderOptions } from '../constants/gender';
import {
  jobDepertmentField,
  jobDepertmentOptions,
} from '../constants/jobDepertment';
import {
  changeHandlerForPostingGroup,
  postingFieldsFromPharmacist,
  postingValueFromState,
} from '../helpers/utilities';
import PostingGroup from './PostingGroup';
import SelectComponent from './SelectComponent';

const DetailsTableRow = ({ row, pharmacist }) => {
  const [tableData, setTableData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [gender, setGender] = useState(null);
  const [jobDepertment, setJobDepertment] = useState(null);
  const [postingFields, setPostingFields] = useState(null);
  const postingFieldsArray =
    postingFields &&
    Object.keys(postingFields).reduce((acc, cur) => {
      acc.push(postingFields[cur]);
      return acc;
    }, []);
  const [error, setError] = useState({});

  const handleIsEditOpen = () => {
    setError({});
    if (isEditOpen) {
      setIsEditOpen(false);
    } else {
      // postingFieldsFromPharmacist(pharmacist);
      setInputValue(tableData);
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
    let dataForSubmit = null;
    let dataForTd = '';
    if (row.name === 'gender') {
      const strGender =
        genderOptions.find((option) => option.id === gender.value)?.name || '';
      dataForSubmit = { gender: strGender };
      dataForTd = strGender;
    } else if (row.name === 'jobDepertment') {
      const strJobDepertment =
        jobDepertmentOptions.find((option) => option.id === jobDepertment.value)
          ?.name || '';
      dataForSubmit = { jobDepertment: strJobDepertment };
      dataForTd = strJobDepertment;
    } else if (row.name === 'mainPosting') {
      dataForSubmit = postingValueFromState(postingFields);
      dataForTd = `${
        dataForSubmit.postingPlace ? `${dataForSubmit.postingPlace}, ` : ''
      }${
        dataForSubmit.postingUpazila?.name
          ? `${dataForSubmit.postingUpazila?.name}, `
          : ''
      }${
        dataForSubmit.postingDistrict?.name
          ? dataForSubmit.postingDistrict?.name
          : ''
      }`;
    } else {
      dataForSubmit = { [row.name]: inputValue };
      dataForTd = inputValue;
    }
    axiosInstance
      .put(`/list/${pharmacist.regNumber}`, dataForSubmit)
      .then(() => {
        setTableData(dataForTd);
        setIsEditOpen(false);
      })
      .catch((e) => {
        if (typeof e.response.data === 'object') {
          setError(e.response.data);
        }
        setTableData(row.td);
      });
  };

  useEffect(() => {
    setTableData(row.td);
    if (row.name === 'gender') {
      const tempGender = { ...genderField };
      if (pharmacist.gender) {
        tempGender.value =
          genderOptions.find((option) => option.name === pharmacist.gender)
            ?.id || '0';
        setGender(tempGender);
      } else setGender(tempGender);
    } else if (row.name === 'jobDepertment') {
      const tempJobDepertment = { ...jobDepertmentField };
      if (pharmacist.jobDepertment) {
        tempJobDepertment.value =
          jobDepertmentOptions.find(
            (option) => option.name === pharmacist.jobDepertment
          )?.id || '0';
        setJobDepertment(tempJobDepertment);
      } else {
        setJobDepertment(tempJobDepertment);
      }
    } else if (row.name === 'mainPosting') {
      setPostingFields(postingFieldsFromPharmacist(pharmacist));
    }
  }, []);

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
              error={error}
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
            />
          ) : row.name === 'gender' ? (
            <SelectComponent
              name='gender'
              value={gender.value}
              options={gender.options}
              onChange={(e) =>
                setGender((prev) => {
                  return { ...prev, value: e.target.value };
                })
              }
            />
          ) : (
            <p>This part is in progress</p>
          )
        ) : row.type === 'date' ? (
          dayjs(tableData).format('DD MMM YYYY')
        ) : (
          tableData
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
