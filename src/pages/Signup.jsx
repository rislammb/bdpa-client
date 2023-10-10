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
import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialState = { email: '', password: '', confirmPassword: '' };

const Signup = () => {
  const theme = useTheme();
  const [state, setState] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('submitting data', state);
  };

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
        title='Signup Page'
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='email'
          name='email'
          value={state.email}
          onChange={handleChange}
          placeholder='abc@email.com'
          label='Enter your email'
          variant='standard'
          // error={notFound}
          // helperText={notFound ? 'Email not found!' : ''}
        />
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          placeholder='********'
          label='Password'
          variant='standard'
        />
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='confirmPassword'
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder='********'
          label='Confirm Password'
          variant='standard'
        />

        <CardActions sx={{ flexDirection: 'column', rowGap: 1 }}>
          <Button onClick={handleSubmit} variant='contained'>
            Signup
          </Button>
          <Typography variant='body2' component='span'>
            Already have an account? Please{' '}
            <Link
              to='/login'
              style={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
            >
              login
            </Link>
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Signup;
