import { Box } from '@mui/material';

/**
 * Loading component
 * @param { string } type - spinner or bouncer
 * @returns JSX
 */
const Loading = ({ type }) => {
  const spinner = (
    <Box className='spinner'>
      <div></div>
      <div></div>
    </Box>
  );

  const bouncer = (
    <Box className='bouncer'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );

  return type === 'spinner' ? spinner : bouncer;
};

export default Loading;
