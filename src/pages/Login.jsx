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
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state, user, handleChange, handleSubmit } = useLogin();

  if (user?.regNumber) return navigate(`/members/${user.regNumber}`);

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
        sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}
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
        <CardActions sx={{ flexDirection: 'column', rowGap: 1 }}>
          <Button type='submit' variant='contained'>
            Login
          </Button>
          <Typography variant='body2' component='span'>
            Don&apost have an account? Please{' '}
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
