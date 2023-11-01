import {
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
import { Link, useNavigate } from 'react-router-dom';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

const initialState = { email: null, password: '', confirmPassword: '' };

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    ui: { language },
    auth: { submitting, error },
    pharmacist: { list },
  } = useStoreState((state) => state);
  const {
    auth: { getRegistrationData },
    pharmacist: { getPharmacistsData },
  } = useStoreActions((actions) => actions);
  const [state, setState] = useState({ ...initialState });

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getRegistrationData({
      ...state,
      email: state.email.email,
    });

    if (res) navigate(`/login`);
  };

  const defaultProps = {
    options: list,
    getOptionLabel: (option) =>
      list?.length > 0
        ? isBn
          ? `${option.email} - ${option.bn_name} - ${
              option.regNumber
            } - ${getBnAreaInfo(option, 'posting')}`
          : `${option.email} - ${option.name} - ${
              option.regNumber
            } - ${getAreaInfo(option, 'posting')}`
        : '',
  };

  useEffect(() => {
    if (list.length < 1) getPharmacistsData();
  }, []);

  return (
    <Card sx={{ maxWidth: 330, margin: '20px auto' }}>
      <CardHeader
        sx={{
          mb: 3,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        }}
        title={isBn ? 'সাইন আপ' : 'Signup'}
      />
      <CardContent
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Autocomplete
          {...defaultProps}
          value={state.email}
          onChange={(_event, newValue) => {
            handleChange({ target: { name: 'email', value: newValue } });
          }}
          isOptionEqualToValue={(option, value) =>
            option?.email === value?.email
          }
          renderInput={(params) => (
            <TextField
              color='info'
              {...params}
              label={isBn ? 'ফার্মাসিস্ট ইমেইল' : 'Pharmacist Email'}
              variant='standard'
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
        <TextField
          color='info'
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          placeholder='********'
          label={isBn ? 'পাসওয়ার্ড' : 'Password'}
          variant='standard'
          error={error && error['password'] ? true : false}
          helperText={
            error &&
            error['password'] &&
            (isBn
              ? error['password'].bn_text ?? ''
              : error['password'].text ?? '')
          }
        />
        <TextField
          color='info'
          type='password'
          name='confirmPassword'
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder='********'
          label={isBn ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}
          variant='standard'
          error={error && error['confirmPassword'] ? true : false}
          helperText={
            error &&
            error['confirmPassword'] &&
            (isBn
              ? error['confirmPassword'].bn_text ?? ''
              : error['confirmPassword'].text ?? '')
          }
        />

        <CardActions sx={{ flexDirection: 'column', rowGap: 1 }}>
          <Button
            disabled={
              !state.email ||
              !state.password ||
              state.password !== state.confirmPassword ||
              submitting
            }
            type='submit'
            variant='contained'
          >
            {isBn ? 'সাইন আপ' : 'Signup'}
          </Button>
          <Typography variant='body2' component='span'>
            {isBn
              ? 'ইতোমধ্যে আপনার একাউন্ট আছে? '
              : 'Already have an account? Please '}
            <Link
              to='/login'
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
    </Card>
  );
};

export default Signup;
