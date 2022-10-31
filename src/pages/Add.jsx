import { Button, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import { axiosInstance } from '../config';

import DatePickerComp from '../components/DatePickerComp';
import PostingGroup from '../components/PostingGroup';

import SnackbarComp from '../components/Snackbar';
import { addDeputationFields } from '../constants/addDeputationFields';
import { addFormFields } from '../constants/addFormFields';
import { addPostingFields } from '../constants/addPostingFields';
import { districts } from '../constants/districts';
import { upazilas } from '../constants/upazilas';
import { voterAreaFields } from '../constants/voterAreaFields';
import { pharmacistFromState } from '../helpers/utilities';

const Add = () => {
  const [formFields, setFormFields] = useState({ ...addFormFields });
  const [postingFields, setPostingFields] = useState({ ...addPostingFields });
  const [voterArea, setVoterArea] = useState({ ...voterAreaFields });
  const [onDeputation, setOnDeputation] = useState(false);
  const [deputationFields, setDeputationFields] = useState({
    ...addDeputationFields,
  });
  const [error, setError] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formFieldsArray = Object.keys(formFields).reduce((acc, cur) => {
    acc.push(formFields[cur]);
    return acc;
  }, []);
  const postingFieldsArray = Object.keys(postingFields).reduce((acc, cur) => {
    acc.push(postingFields[cur]);
    return acc;
  }, []);
  const voterAreaArray = Object.keys(voterArea).reduce((acc, cur) => {
    acc.push(voterArea[cur]);
    return acc;
  }, []);
  const deputationFieldsArray = Object.keys(deputationFields).reduce(
    (acc, cur) => {
      acc.push(deputationFields[cur]);
      return acc;
    },
    []
  );

  const handleChange = (e, name) => {
    if (name === 'dateOfBirth' || name === 'dateOfJoin') {
      setFormFields((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          value: e,
        },
      }));
    } else if (e.target.name === 'passingYear' || e.target.name === 'mobile') {
      setFormFields({
        ...formFields,
        [e.target.name]: {
          ...formFields[e.target.name],
          value: e.target.value.replace(/[^0-9]/g, ''),
        },
      });
    } else {
      setFormFields({
        ...formFields,
        [e.target.name]: {
          ...formFields[e.target.name],
          value: e.target.value,
        },
      });
    }
  };

  const handlePostingChange = (e) => {
    setPostingFields((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: e.target.value,
      },
    }));
  };

  const handleVoterAreaChange = (e) => {
    setVoterArea((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: e.target.value,
      },
    }));
  };

  const handleDeputationChange = (e) => {
    setDeputationFields((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: e.target.value,
      },
    }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setPostingFields((prevState) => ({
      ...prevState,
      postingDistrict: {
        ...addPostingFields.postingDistrict,
        options: [
          ...addPostingFields.postingDistrict.options,
          ...districts.filter(
            (item) => item.division_id === prevState.postingDivision.value
          ),
        ],
        value: '0',
      },
      postingUpazila: {
        ...addPostingFields.postingUpazila,
      },
    }));
  }, [postingFields.postingDivision.value]);

  useEffect(() => {
    setPostingFields((prevState) => ({
      ...prevState,
      postingUpazila: {
        ...addPostingFields.postingUpazila,
        options: [
          ...addPostingFields.postingUpazila.options,
          ...upazilas.filter(
            (item) => item.district_id === prevState.postingDistrict.value
          ),
        ],
        value: '0',
      },
    }));
  }, [postingFields.postingDistrict.value]);

  useEffect(() => {
    setVoterArea((prevState) => ({
      ...prevState,
      voterDistrict: {
        ...prevState.voterDistrict,
        options: [
          ...voterAreaFields.voterDistrict.options,
          ...districts.filter(
            (item) => item.division_id === voterArea.voterDivision.value
          ),
        ],
        value: '0',
      },
    }));
  }, [voterArea.voterDivision.value]);

  useEffect(() => {
    setDeputationFields({ ...addDeputationFields });
  }, [onDeputation]);

  useEffect(() => {
    setDeputationFields((prevState) => ({
      ...prevState,
      deputationDistrict: {
        ...addDeputationFields.deputationDistrict,
        options: [
          ...addDeputationFields.deputationDistrict.options,
          ...districts.filter(
            (item) => item.division_id === prevState.deputationDivision.value
          ),
        ],
        value: '0',
      },
      deputationUpazila: {
        ...addDeputationFields.deputationUpazila,
      },
    }));
  }, [deputationFields.deputationDivision.value]);

  useEffect(() => {
    setDeputationFields((prevState) => ({
      ...prevState,
      deputationUpazila: {
        ...addDeputationFields.deputationUpazila,
        options: [
          ...addDeputationFields.deputationUpazila.options,
          ...upazilas.filter(
            (item) => item.district_id === prevState.deputationDistrict.value
          ),
        ],
        value: '0',
      },
    }));
  }, [deputationFields.deputationDistrict.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});

    const newPharmacist = pharmacistFromState(
      formFields,
      postingFields,
      voterArea,
      onDeputation,
      deputationFields
    );

    axiosInstance
      .post('/list', newPharmacist)
      .then(() => {
        setOpenSnackbar(true);
        setFormFields({ ...addFormFields });
        setPostingFields({ ...addPostingFields });
        setVoterArea({ ...voterAreaFields });
        setOnDeputation(false);
        setDeputationFields({ ...addDeputationFields });
      })
      .catch((e) => {
        console.log('add pharmacist faild!');
        if (typeof e.response.data === 'object') {
          setError(e.response.data);
        }
      });
  };

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '33.33333ch' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div>
        {formFieldsArray.map((field) => {
          if (field.type === 'select') {
            return (
              <TextField
                InputLabelProps={{ color: 'info' }}
                key={field.name}
                select
                name={field.name}
                label={field.label}
                value={field.value}
                onChange={handleChange}
                variant='standard'
                style={{ textAlign: 'left' }}
              >
                {field.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else if (field.type === 'date') {
            return (
              <DatePickerComp
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                onChange={handleChange}
              />
            );
          } else
            return (
              <TextField
                InputLabelProps={{ color: 'info' }}
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                onChange={handleChange}
                error={error[field.name] ? true : false}
                helperText={error[field.name] ? error[field.name] : ''}
                placeholder={field.placeholder}
                variant='standard'
              />
            );
        })}
        <PostingGroup
          label='Main Posting'
          postingInfo={postingFieldsArray}
          onChange={handlePostingChange}
          error={error}
        />
        <PostingGroup
          label='Voter Area'
          postingInfo={voterAreaArray}
          onChange={handleVoterAreaChange}
          error={error}
        />
        <Box
          sx={{
            display: 'inline-flex',
            m: 1,
            width: '33.33333ch',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={onDeputation}
                onChange={() => setOnDeputation(!onDeputation)}
              />
            }
            label='On Deputation'
          />
        </Box>
        {onDeputation && (
          <PostingGroup
            label='Deputation Posting'
            postingInfo={deputationFieldsArray}
            onChange={handleDeputationChange}
            error={error}
          />
        )}
      </div>
      <SnackbarComp open={openSnackbar} handleClose={handleSnackbarClose} />
      <Button
        disabled={!formFields.name.value || !formFields.regNumber.value}
        variant='contained'
        type='submit'
        sx={{ mb: 2 }}
      >
        Save to Database
      </Button>
    </Box>
  );
};
export default Add;
