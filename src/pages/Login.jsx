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
  const { state, error, handleChange, submitting, handleSubmit } = useLogin();

  return (
    <Card sx={{ maxWidth: 330, margin: '20px auto' }}>
      <CardHeader
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        }}
        title='Login Page'
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
          label='Email'
          variant='standard'
        />
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          placeholder='**********'
          label='Password'
          variant='standard'
        />
        {!submitting && error?.message && (
          <Typography
            textAlign={'left'}
            fontSize={'0.9rem'}
            width={'100%'}
            color={'error'}
          >
            {error.message}
          </Typography>
        )}
        <CardActions sx={{ flexDirection: 'column', p: 0, rowGap: 1 }}>
          <Button disabled={submitting} type='submit' variant='contained'>
            Login
          </Button>
          <Typography variant='body2' component='span'>
            Don&apos;t have an account? Please{' '}
            <Link
              to='/signup'
              style={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
            >
              signup
            </Link>
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Login;
