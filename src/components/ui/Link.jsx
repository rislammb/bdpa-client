import { useTheme } from '@mui/material/styles';
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
