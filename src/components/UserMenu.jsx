import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    auth: { user },
    ui: { language },
  } = useStoreState((state) => state);
  const { logout } = useStoreActions((actions) => actions.auth);

  const isBn = language === 'BN' ? true : false;

  const [anchorElUser, setAnchorElUser] = useState(null);

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
    color: isActive ? theme.palette.primary.light : '#f1f1f1',
    width: '100%',
    textAlign: 'center',
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Tooltip title='Open Menu'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {user?.imageUrl ? (
            <Avatar alt={'profile'} src={user?.imageUrl} />
          ) : user?.email.includes('admin') ? (
            <Avatar>Ad</Avatar>
          ) : (
            <Avatar alt={'profile'} />
          )}
        </IconButton>
      </Tooltip>

      <Menu
        sx={{
          mt: '45px',
          display: { xs: 'none', md: 'block' },
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
        {user?.regNumber && (
          <MenuItem onClick={handleCloseUserMenu}>
            <NavLink
              style={({ isActive }) => linkStyle(isActive)}
              to={`/members/${user?.regNumber}`}
            >
              {isBn ? 'প্রোফাইল' : 'Profile'}
            </NavLink>
          </MenuItem>
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
