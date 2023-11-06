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
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ColorLink from '../components/ui/ColorLink';

const initialState = { password: '', confirmPassword: '' };

const SetPassword = () => {
  const {
    state: { email },
  } = useLocation();
  const theme = useTheme();

  const {
    ui: { language },
    auth: { submitting, error },
  } = useStoreState((state) => state);
  const { setPasswordData, setToken } = useStoreActions(
    (actions) => actions.auth
  );

  const [state, setState] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const isBn = language === 'BN' ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordData({
      email,
      ...state,
    });
  };

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
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          placeholder='********'
          label={isBn ? 'পাসওয়ার্ড' : 'Password'}
          variant='standard'
          error={error?.password}
          helperText={
            error &&
            error.password &&
            (isBn ? error.password.bn_text : error.password.text)
          }
        />
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='confirmPassword'
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder='********'
          label={isBn ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}
          variant='standard'
          error={error?.confirmPassword}
          helperText={
            error &&
            error.confirmPassword &&
            (isBn ? error.confirmPassword.bn_text : error.confirmPassword.text)
          }
        />
        {!submitting && error && (
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
              !state.password ||
              state.password !== state.confirmPassword ||
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
