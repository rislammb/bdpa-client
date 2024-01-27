import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, text, target = '', sx }) => {
  const theme = useTheme();

  return (
    <RouterLink
      style={{
        fontWeight: '500',
        color:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        ...sx,
      }}
      to={to}
      target={target}
    >
      {text}
    </RouterLink>
  );
};

export default Link;

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string,
  sx: PropTypes.object,
};
