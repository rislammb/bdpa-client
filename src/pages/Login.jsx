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

import React from 'react';

const Login = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    alert('This part is in progress. Try again later!');
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
        title='Login Page'
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='abc@email.co'
          label='Email'
          variant='standard'
        />
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='**********'
          label='Password'
          variant='standard'
        />
        <CardActions sx={{ flexDirection: 'column', rowGap: 1 }}>
          <Button onClick={handleSubmit} variant='contained'>
            Login
          </Button>
          <Typography variant='body2' component='span'>
            Don't have an account? Please{' '}
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
