import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  const theme = useTheme();

  const {
    auth: { user },
    ui: { language },
  } = useStoreState((state) => state);
  const { logout } = useStoreActions((actions) => actions.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isBn = language === 'BN' ? true : false;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
  };

  const linkStyle = (isActive = false) => ({
    color: isActive
      ? theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.main
      : theme.palette.mode === 'dark'
      ? '#f1f1f1'
      : '#2a2a2a',
    width: '100%',
    textAlign: 'center',
  });

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Tooltip onClick={handleOpenUserMenu} title='Open Menu'>
        {user?.imageUrl ? (
          <Avatar alt={'profile'} src={user?.imageUrl} />
        ) : user?.email.includes('admin') ? (
          <Avatar>Ad</Avatar>
        ) : (
          <Avatar alt={'profile'} />
        )}
      </Tooltip>

      <Menu
        sx={{
          mt: '45px',
          display: { xs: 'none', sm: 'block' },
        }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user?.regNumber ? (
          <MenuItem onClick={handleCloseUserMenu}>
            <NavLink
              style={({ isActive }) => linkStyle(isActive)}
              to={`/members/${user?.regNumber}`}
            >
              {isBn
                ? user.bn_name ?? user.email?.split('@')[0]
                : user.name ?? user.email?.split('@')[0]}
            </NavLink>
          </MenuItem>
        ) : (
          <Typography textAlign='center'>
            {isBn
              ? user.bn_name ?? user.email?.split('@')[0]
              : user.name ?? user.email?.split('@')[0]}
          </Typography>
        )}
        <MenuItem onClick={handleLogout}>
          <Typography textAlign='center' color={theme.palette.warning.light}>
            {isBn ? 'লগ আউট' : 'Logout'}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
