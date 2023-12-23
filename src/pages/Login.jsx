import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const theme = useTheme();
  const { isBn, state, error, handleChange, submitting, handleSubmit } =
    useLogin();

  return (
    <Card sx={{ maxWidth: 330, margin: '20px auto' }}>
      <CardHeader
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        }}
        title={isBn ? 'লগ ইন' : 'Login'}
      />
      <CardContent
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='email'
          name='email'
          value={state.email}
          onChange={handleChange}
          placeholder='abc@email.co'
          label={isBn ? 'ইমেইল' : 'Email'}
          variant='standard'
        />
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          placeholder='**********'
          label={isBn ? 'পাসওয়ার্ড' : 'Password'}
          variant='standard'
        />
        {!submitting && error && typeof error === 'object' ? (
          <Typography
            textAlign={'left'}
            fontSize={'0.9rem'}
            width={'100%'}
            color={'error'}
          >
            {isBn ? error.bn_text : error.text}
          </Typography>
        ) : (
          typeof error === 'string' && (
            <Typography
              textAlign={'left'}
              fontSize={'0.9rem'}
              width={'100%'}
              color={'error'}
            >
              {error}
            </Typography>
          )
        )}
        <CardActions sx={{ flexDirection: 'column', p: 0, rowGap: 1 }}>
          <Button disabled={submitting} type='submit' variant='contained'>
            {isBn ? 'লগ ইন' : 'Login'}
          </Button>
          <Typography align='left' width={'100%'} variant='body2'>
            <Link
              to='/auth/reset-password'
              style={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
            >
              {isBn ? 'পাসওয়ার্ড ভুলে গেছেন? ' : 'Forgot password?'}
            </Link>
          </Typography>
          <Typography
            sx={{ mt: 2, width: '100%' }}
            align='right'
            variant='body2'
          >
            {isBn ? 'আপনার কি একাউন্ট নেই? ' : "Don't have an account? Please "}
            <Link
              to='/auth/signup'
              style={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
            >
              {isBn ? 'একাউন্ট খুলুন' : 'signup'}
            </Link>
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Login;
