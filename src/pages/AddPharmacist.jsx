import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import DatePickerComp from '../components/DatePickerComp';
import PostingGroup from '../components/PostingGroup';
import SelectComponent from '../components/SelectComponent';
import SnackbarComp from '../components/Snackbar';
import { onDeputationOptions } from '../constants/onDeputationFields';

import useAddPharmacist from '../hooks/useAddPharmacist';

const AddPharmacist = () => {
  const {
    isBn,
    formFields,
    formFieldsArray,
    handleChange,
    voterAreaArray,
    handleVoterAreaChange,
    postingFieldsArray,
    handlePostingChange,
    permanentFieldsArray,
    handlePermanentChange,
    onDeputation,
    setOnDeputation,
    deputationFieldsArray,
    handleDeputationChange,
    snackbar,
    handleSnackbarClose,
    handleSubmit,
    submitting,
    error,
  } = useAddPharmacist();

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
                referenceDate={
                  field.name === 'dateOfBirth' ? '1999-12-31' : '2013-12-31'
                }
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
                helperText={
                  error &&
                  (isBn
                    ? error[field.name]?.bn_text ?? ''
                    : error[field.name]?.text ?? '')
                }
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
          label={isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Present Posting/Address'}
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
      <Button
        disabled={
          !formFields.name.value || !formFields.regNumber.value || submitting
        }
        variant='contained'
        type='submit'
        sx={{ mb: 2 }}
      >
        {isBn ? 'ডাটাবেজে সংরক্ষণ' : 'Save to Database'}
      </Button>

      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
};
export default AddPharmacist;
