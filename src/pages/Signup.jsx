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

const Signup = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = () => {
    alert('This part is in progress. Try again later!');
    // setNotFound(true);
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
      <CardContent sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
        <TextField
          InputLabelProps={{ color: 'info' }}
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='abc@email.co'
          label='Find you email in database'
          variant='standard'
          error={notFound}
          helperText={notFound ? 'Email not found!' : ''}
        />

        <CardActions sx={{ flexDirection: 'column', rowGap: 1 }}>
          <Button onClick={handleSubmit} variant='contained'>
            Search
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
