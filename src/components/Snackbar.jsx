import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackbarComp = ({ open, severity, text, handleClose }) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default SnackbarComp;

SnackbarComp.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
