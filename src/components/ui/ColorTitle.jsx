import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const ColorTitle = ({ text, variant, textAlign = 'inherit', children }) => {
  const theme = useTheme();

  return (
    <Typography
      color={
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.main
      }
      variant={variant}
      textAlign={textAlign}
    >
      {text}
      {children}
    </Typography>
  );
};

export default ColorTitle;

ColorTitle.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  textAlign: PropTypes.string,
  children: PropTypes.element,
};
