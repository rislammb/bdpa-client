import { useTheme } from '@mui/material';
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
