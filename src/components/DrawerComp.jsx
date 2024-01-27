import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const DrawerComp = ({ handleDrawerToggle, navItems }) => {
  const theme = useTheme();
  const {
    auth: { user },
    ui: { language },
  } = useStoreState((state) => state);
  const { logout } = useStoreActions((actions) => actions.auth);

  const isBn = language === 'BN' ? true : false;

  const linkStyle = (isActive = false) => ({
    color: isActive ? theme.palette.primary.light : '#f1f1f1',
    width: '100%',
    textAlign: 'center',
  });

  const handleLogout = () => logout();

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.primary.main : '',
        flex: 1,
      }}
      onClick={handleDrawerToggle}
    >
      <Typography
        variant='h5'
        sx={{
          mt: 2,
          textAlign: 'center',
          color:
            theme.palette.mode === 'light' ? theme.palette.primary.light : '',
        }}
      >
        {isBn ? 'বিডিপিএ' : 'BDPA'}
      </Typography>

      <Divider sx={{ my: { xs: 1, sm: 2 } }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink style={({ isActive }) => linkStyle(isActive)} end to='/'>
              {isBn ? 'হোম' : 'Home'}
            </NavLink>
          </ListItemButton>
        </ListItem>
        {navItems?.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton>
              <NavLink
                style={({ isActive }) => linkStyle(isActive)}
                to={item.path}
              >
                {isBn ? item.bn_text : item.text}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 2 }} />

        {user ? (
          <>
            {user?.regNumber ? (
              <ListItem disablePadding>
                <ListItemButton>
                  <NavLink
                    style={({ isActive }) => linkStyle(isActive)}
                    to={`/members/${user?.regNumber}`}
                  >
                    {isBn
                      ? user.bn_name ?? user.email?.split('@')[0]
                      : user.name ?? user.email?.split('@')[0]}
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ) : (
              <Typography textAlign='center'>
                {isBn
                  ? user.bn_name ?? user.email?.split('@')[0]
                  : user.name ?? user.email?.split('@')[0]}
              </Typography>
            )}

            <ListItem
              sx={{
                width: 'fit-content',
                mx: 'auto',
              }}
              disablePadding
            >
              <ListItemButton
                sx={{
                  textAlign: 'center',
                  color: theme.palette.warning.light,
                }}
              >
                <ListItemText
                  onClick={handleLogout}
                  primary={isBn ? 'লগ আউট' : 'Logout'}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton>
              <NavLink
                style={({ isActive }) => linkStyle(isActive)}
                to={'/auth/login'}
              >
                {isBn ? 'লগ ইন' : 'Login'}
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default DrawerComp;

DrawerComp.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  navItems: PropTypes.array.isRequired,
};
