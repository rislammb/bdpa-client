import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ColorLink = ({ to, text }) => {
  const theme = useTheme();

  return (
    <Link
      to={to}
      style={{
        color:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
      }}
    >
      {text}
    </Link>
  );
};

export default ColorLink;

ColorLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
