import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ColorLink from '../components/ui/ColorLink';
import { objDeepClone } from '../helpers/utilities';

const initialState = {
  password: {
    name: 'password',
    type: 'password',
    label: {
      name: 'Password',
      bn_name: 'পাসওয়ার্ড',
    },
    value: '',
    error: null,
    tounched: false,
  },
  confirmPassword: {
    name: 'confirmPassword',
    type: 'password',
    label: {
      name: 'Confirm Password',
      bn_name: 'পাসওয়ার্ড নিশ্চিত করুন',
    },
    value: '',
    error: null,
    touched: false,
  },
};

const validatePassword = ({ password, confirmPassword }) => {
  const error = {};
  let response = '';

  if (typeof password !== 'string' || password.length < 7) {
    error.password = {
      text: 'Password type must be string and minimum 7 characters long!',
      bn_text: 'পাসওয়ার্ড টাইপ স্ট্রিং এবং ন্যূনতম ৭ অক্ষর দীর্ঘ হতে হবে!',
    };
  } else if (
    !password.match(/\d/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[a-z]/g)
  ) {
    error.password = {
      text: 'Password must contain at least 1 lowercase letter, uppercase letter, and number!',
      bn_text:
        'পাসওয়ার্ডে কমপক্ষে ১ টি করে ছোটহাতের অক্ষর, বড় হাতের অক্ষর ও সংখ্যা থাকতে হবে!',
    };
  } else {
    if (confirmPassword !== undefined && password !== confirmPassword) {
      error.confirmPassword = {
        text: 'Password and confirm password does not match!',
        bn_text: 'পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না!',
      };
    } else {
      response = password;
    }
  }

  return {
    valid: Object.keys(error).length < 1,
    data: Object.keys(error).length < 1 ? response : error,
  };
};

const SetPassword = () => {
  const {
    state: { email },
  } = useLocation();
  const theme = useTheme();

  const {
    ui: { language },
    auth: { submitting, error },
  } = useStoreState((state) => state);
  const { setPasswordData } = useStoreActions((actions) => actions.auth);

  const [state, setState] = useState({ ...initialState });

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const clonedState = objDeepClone(state);
    clonedState[name].value = value;

    const values = Object.keys(clonedState).reduce((acc, cur) => {
      acc[cur] = clonedState[cur].value;
      return acc;
    }, {});
    const { valid, data } = validatePassword(values);

    if (!valid) {
      Object.keys(clonedState).forEach((key) => {
        clonedState[key].error = data[key] ?? null;
      });
    } else clonedState[name].error = null;

    setState(clonedState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].value;
      return acc;
    }, {});

    setPasswordData({
      email,
      ...values,
    });
  };

  useEffect(() => {
    document.title = isBn
      ? 'বিডিপিএ | পাসওয়ার্ড সেট করুন'
      : 'BDPA | Set Password';
  }, [isBn]);

  const stateArray = Object.keys(state).reduce((acc, cur) => {
    acc.push(state[cur]);
    return acc;
  }, []);

  return (
    <Card sx={{ maxWidth: 330, margin: '20px auto' }}>
      <CardHeader
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        }}
        title={isBn ? 'পাসওয়ার্ড সেট করুন' : 'Set Password'}
      />
      <CardContent
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        {stateArray?.length > 0 &&
          stateArray.map((field) => {
            console.log('field =>', field.error?.text);
            return (
              <TextField
                key={field.name}
                InputLabelProps={{ color: 'info' }}
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                placeholder='********'
                label={isBn ? field.label.bn_name : field.label.name}
                variant='standard'
                error={error?.password}
                helperText={
                  field.error?.text ||
                  (error &&
                    error.password &&
                    (isBn ? error.password.bn_text : error.password.text))
                }
              />
            );
          })}
        {!submitting && error?.text && (
          <Typography
            textAlign={'left'}
            fontSize={'0.9rem'}
            width={'100%'}
            color={'error'}
          >
            {isBn ? error.bn_text : error.text}{' '}
            <ColorLink to={'/auth/login'} text={isBn ? 'লগইন করুন' : 'login'} />
          </Typography>
        )}
        <CardActions sx={{ flexDirection: 'column', p: 0, rowGap: 1 }}>
          <Button
            disabled={
              !email ||
              !state.password.value ||
              state.password.value !== state.confirmPassword.value ||
              submitting
            }
            type='submit'
            variant='contained'
          >
            {isBn ? 'পাসওয়ার্ড সেট' : 'Set Password'}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SetPassword;
