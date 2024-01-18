import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import classes from './index.module.css';

/**
 * Loading component
 * @param { string } type - launch, spinner or bouncer
 * @returns JSX
 */
const Loading = ({ type = 'bouncer' }) => {
  const launch = (
    <Box className={classes.launch}>
      <Box className={classes.bouncer}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Box>

      <img
        src={`/bdpa_logo-color.svg`}
        alt='logo'
        width='150px'
        height='150px'
      />
    </Box>
  );

  const spinner = (
    <Box className={classes.spinner}>
      <div></div>
      <div></div>
    </Box>
  );

  const bouncer = (
    <Box className={classes.bouncer}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );

  return type === 'launch' ? launch : type === 'spinner' ? spinner : bouncer;
};

export default Loading;

Loading.propTypes = {
  type: PropTypes.oneOf(['launch', 'spinner', 'bouncer']),
};
