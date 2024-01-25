import { useDebouncedCallback } from 'use-debounce';

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getPharmacists } from '../api/pharmacist';
import SnackbarComp from '../components/Snackbar';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    ui: { language },
    auth: { submitting, error },
  } = useStoreState((state) => state);
  const {
    auth: { resetPasswordData },
  } = useStoreActions((actions) => actions);

  const [state, setState] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [successAlert, setSuccessAlert] = useState(null);

  const isBn = language === 'BN' ? true : false;

  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
    debounced(value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await resetPasswordData({
      email: state.email,
      clientUrl: import.meta.resolve('/') + 'auth/verify-email/',
    });

    if (res) {
      setSuccessAlert(res);
      setState(null);
    } else {
      if (!submitting && error) {
        if (typeof error === 'object') {
          setSnackbar({
            open: true,
            severity: 'error',
            text: isBn ? error.bn_text : error.text,
          });
        } else if (typeof error === 'string') {
          setSnackbar({
            open: true,
            severity: 'error',
            text: error,
          });
        }
      }
    }
  };

  const handleSetPassword = async () => {
    return navigate('/auth/set-password', {
      state: { email: state.email },
    });
  };

  useEffect(() => {
    setOptions([]);

    (async () => {
      const {
        data: { pharmacists },
      } = await getPharmacists(searchParams);

      if (pharmacists?.length > 0) {
        setOptions(pharmacists);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    document.title = isBn
      ? 'বিডিপিএ | পাসওয়ার্ড রিসেট'
      : 'BDPA | Reset Password';
  }, [isBn]);

  return (
    <Card sx={{ maxWidth: 370, margin: '20px auto' }}>
      <CardHeader
        sx={{
          mb: 3,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        }}
        title={isBn ? 'সাইন আপ' : 'পাসওয়ার্ড রিসেট'}
      />
      <CardContent
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Autocomplete
          options={options}
          filterOptions={(options) => options.filter((option) => option.email)}
          getOptionLabel={(option) =>
            `${option.email} | ${isBn ? option.bn_name : option.name} | ${
              option.regNumber
            } | ${
              isBn
                ? getBnAreaInfo(option, 'posting')
                : getAreaInfo(option, 'posting')
            }`
          }
          value={state}
          onChange={(_event, newValue) => {
            setState(newValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.regNumber === value?.regNumber
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={isBn ? 'ফার্মাসিস্ট ইমেইল' : 'Pharmacist Email'}
              placeholder={
                isBn
                  ? 'ইমেইল, নাম, নিবন্ধন বা সদস্য পরিচিতি'
                  : 'Email, Name, Registration or Member ID'
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: params.InputProps.endAdornment,
              }}
              variant='standard'
              value={searchTerm}
              onChange={handleChange}
              color='info'
              error={error && error['email'] ? true : false}
              helperText={
                error &&
                error['email'] &&
                (isBn
                  ? error['email'].bn_text ?? ''
                  : error['email'].text ?? '')
              }
            />
          )}
        />

        {successAlert && (
          <Alert onClose={() => setSuccessAlert(null)} severity='success'>
            {isBn ? successAlert.bn_text : successAlert.text}
          </Alert>
        )}

        {error?.passwordNotSet && (
          <Box textAlign={'right'}>
            <Button onClick={handleSetPassword} color='info' size='small'>
              Set Password
            </Button>
          </Box>
        )}

        <CardActions sx={{ flexDirection: 'column', rowGap: 1 }}>
          <Button
            disabled={!state || submitting}
            type='submit'
            variant='contained'
          >
            {isBn ? 'পাসওয়ার্ড রিসেট' : 'Reset Password'}
          </Button>
          <Typography variant='body2'>
            {isBn
              ? 'ইতোমধ্যে আপনার একাউন্ট আছে? '
              : 'Already have an account? Please '}
            <Link
              to='/auth/login'
              style={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
            >
              {isBn ? 'লগইন করুন' : 'login'}
            </Link>
          </Typography>
        </CardActions>
      </CardContent>

      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </Card>
  );
};

export default ResetPassword;
