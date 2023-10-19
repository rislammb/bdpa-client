import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DatePickerComp from '../components/DatePickerComp';
import PostingGroup from '../components/PostingGroup';

import SelectComponent from '../components/SelectComponent';
import SnackbarComp from '../components/Snackbar';
import { addDeputationFields } from '../constants/addDeputationFields';
import { addFormFields } from '../constants/addFormFields';
import { addPermanentFields } from '../constants/addPermanentFields';
import { addPostingFields } from '../constants/addPostingFields';
import { districts } from '../constants/districts';
import { onDeputationOptions } from '../constants/onDeputationFields';
import { upazilas } from '../constants/upazilas';
import { voterAreaFields } from '../constants/voterAreaFields';
import { pharmacistFromState } from '../helpers/utilities';

const AddPharmacist = () => {
  const {
    ui: { language },
    pharmacist: { submitting, error },
  } = useStoreState((state) => state);
  const { addPharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ ...addFormFields });
  const [postingFields, setPostingFields] = useState({ ...addPostingFields });
  const [permanentFields, setPermanentFields] = useState({
    ...addPermanentFields,
  });
  const [voterArea, setVoterArea] = useState({ ...voterAreaFields });
  const [onDeputation, setOnDeputation] = useState('1');
  const [deputationFields, setDeputationFields] = useState({
    ...addDeputationFields,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isBn = language === 'BN' ? true : false;

  const formFieldsArray = Object.keys(formFields).reduce((acc, cur) => {
    acc.push(formFields[cur]);
    return acc;
  }, []);
  const postingFieldsArray = Object.keys(postingFields).reduce((acc, cur) => {
    acc.push(postingFields[cur]);
    return acc;
  }, []);
  const permanentFieldsArray = Object.keys(permanentFields).reduce(
    (acc, cur) => {
      acc.push(permanentFields[cur]);
      return acc;
    },
    []
  );
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

  const handlePermanentChange = (e) => {
    setPermanentFields((prevState) => ({
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
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
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
        value: '',
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
        value: '',
      },
    }));
  }, [postingFields.postingDistrict.value]);

  useEffect(() => {
    setPermanentFields((prevState) => ({
      ...prevState,
      permanentDistrict: {
        ...addPermanentFields.permanentDistrict,
        options: [
          ...addPermanentFields.permanentDistrict.options,
          ...districts.filter(
            (item) => item.division_id === prevState.permanentDivision.value
          ),
        ],
        value: '',
      },
      permanentUpazila: {
        ...addPermanentFields.permanentUpazila,
      },
    }));
  }, [permanentFields.permanentDivision.value]);

  useEffect(() => {
    setPermanentFields((prevState) => ({
      ...prevState,
      permanentUpazila: {
        ...addPermanentFields.permanentUpazila,
        options: [
          ...addPermanentFields.permanentUpazila.options,
          ...upazilas.filter(
            (item) => item.district_id === prevState.permanentDistrict.value
          ),
        ],
        value: '',
      },
    }));
  }, [permanentFields.permanentDistrict.value]);

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
        value: '',
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
        value: '',
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
        value: '',
      },
    }));
  }, [deputationFields.deputationDistrict.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPharmacist = pharmacistFromState(
      formFields,
      postingFields,
      permanentFields,
      voterArea,
      onDeputation,
      deputationFields
    );

    const res = await addPharmacistData(newPharmacist);
    if (res) {
      navigate(`/members/${res.regNumber}`);
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        text: 'Committee add to databse faild!.',
      });
    }
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
                label={isBn ? field.bn_label : field.label}
                value={field.value}
                onChange={handleChange}
                variant='standard'
                style={{ textAlign: 'left' }}
              >
                {field.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {isBn ? option.bn_name : option.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else if (field.type === 'date') {
            return (
              <DatePickerComp
                key={field.name}
                name={field.name}
                label={isBn ? field.bn_label : field.label}
                value={field.value}
                onChange={handleChange}
                disableFuture
                referenceDate={new Date('1997-05-23')}
              />
            );
          } else
            return (
              <TextField
                InputLabelProps={{ color: 'info' }}
                key={field.name}
                name={field.name}
                label={isBn ? field.bn_label : field.label}
                value={field.value}
                onChange={handleChange}
                error={error && error[field.name] ? true : false}
                helperText={error && error[field.name] ? error[field.name] : ''}
                placeholder={field.placeholder}
                variant='standard'
              />
            );
        })}
        <PostingGroup
          label={isBn ? 'ভোটার এলাকা' : 'Voter Area'}
          postingInfo={voterAreaArray}
          onChange={handleVoterAreaChange}
          error={error}
        />
        <PostingGroup
          label={isBn ? 'মূল কর্মস্থল/ঠিকানা' : 'Main Posting/Address'}
          postingInfo={postingFieldsArray}
          onChange={handlePostingChange}
          error={error}
        />
        <PostingGroup
          label={isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address'}
          postingInfo={permanentFieldsArray}
          onChange={handlePermanentChange}
          error={error}
        />
        <Box
          sx={{
            display: 'inline-flex',
            m: 1,
            width: '33.33333ch',
          }}
        >
          <SelectComponent
            name='onDeputation'
            label={isBn ? 'পেষন/সংযুক্ত আছেন?' : 'On Deputation/Attachment'}
            value={onDeputation}
            options={[...onDeputationOptions]}
            onChange={(e) => setOnDeputation(e.target.value)}
          />
        </Box>
        {onDeputation === '2' && (
          <PostingGroup
            label={
              isBn ? 'প্রেষন/সংযুক্ত ঠিকানা' : 'Deputation/Attachment Address'
            }
            postingInfo={deputationFieldsArray}
            onChange={handleDeputationChange}
            error={error}
          />
        )}
      </div>
      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
      <Button
        disabled={
          !formFields.name.value || !formFields.regNumber.value || submitting
        }
        variant='contained'
        type='submit'
        sx={{ mb: 2 }}
      >
        Save to Database
      </Button>
    </Box>
  );
};
export default AddPharmacist;
