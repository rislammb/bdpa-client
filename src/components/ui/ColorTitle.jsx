import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

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
