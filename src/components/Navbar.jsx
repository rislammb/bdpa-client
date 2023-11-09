import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom';

import About from '../pages/About';
import AddCommittee from '../pages/AddCommittee';
import AddPharmacist from '../pages/AddPharmacist';
import CommitteeList from '../pages/CommitteeList';
import DetailsCommittee from '../pages/DetailsCommittee';
import DetailsPharmacist from '../pages/DetailsPharmacist';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PharmacistList from '../pages/PharmacistList';
import SetPassword from '../pages/SetPassword';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
import VerifyEmail from '../pages/VerifyEmail';

const drawerWidth = 240;

const Navbar = (props) => {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    auth: { user },
    ui: { language },
  } = useStoreState((state) => state);
  const { logout } = useStoreActions((actions) => actions.auth);
  const isBn = language === 'BN' ? true : false;

  const navItems = [
    { path: '/members/page/1', text: 'Members', bn_text: 'সদস্য' },
    { path: '/committees', text: 'Committees', bn_text: 'কমিটি' },
    { path: '/about', text: 'About BDPA', bn_text: 'বিডিপিএ সম্পর্কে' },
    {
      path: '/auth/login',
      text: user ? 'Logout' : 'Login',
      bn_text: user ? 'লগ আউট' : 'লগ ইন',
    },
  ];

  const isAdmin =
    user?.accountStatus === 'ACTIVE' &&
    (user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN'));

  if (isAdmin) {
    navItems.unshift({
      path: '/members/add',
      text: 'Add Member',
      bn_text: 'সদস্য যোগ',
    });
    navItems.push({
      path: '/users',
      text: 'Users',
      bn_text: 'ব্যবহারকারীগণ',
    });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => logout();

  const linkStyle = (isActive = false) => ({
    color: isActive ? theme.palette.primary.light : '#f1f1f1',
    width: '100%',
    textAlign: 'center',
  });

  const drawer = (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.primary.main : '',
        flex: 1,
      }}
      onClick={handleDrawerToggle}
    >
      <Typography variant='h5' sx={{ my: 1.5, textAlign: 'center' }}>
        {isBn ? 'বিডিপিএ' : 'BDPA'}
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink style={linkStyle()} to='/'>
              {isBn ? 'হোম' : 'Home'}
            </NavLink>
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton>
              <NavLink
                style={({ isActive }) => linkStyle(isActive)}
                to={item.path}
                onClick={() => {
                  if (item.text === 'Logout') handleLogout();
                }}
              >
                {isBn ? item.bn_text : item.text}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav'>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'block',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to='/'>
              <img
                src={`/bdpa_logo.png`}
                alt='logo'
                width='50px'
                height='50px'
              />
            </Link>
          </Box>
          <div>{props.children}</div>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerToggle}
            sx={{
              mr: 0,
              display: { md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} sx={{ color: '#f1f1f1' }}>
                <NavLink
                  style={({ isActive }) => linkStyle(isActive)}
                  to={item.path}
                  onClick={() => {
                    if (item.text === 'Logout') handleLogout();
                  }}
                >
                  {isBn ? item.bn_text : item.text}
                </NavLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          anchor='right'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component='main' sx={{ p: 1, textAlign: 'center', width: '100%' }}>
        <Toolbar />
        <Routes>
          <Route
            path='/members/add'
            element={
              isAdmin ? <AddPharmacist /> : <Navigate to={`/auth/login`} />
            }
          />
          <Route
            path='/members/page/:pageNumber'
            element={<PharmacistList />}
          />
          <Route path='/members/:regNumber' element={<DetailsPharmacist />} />
          <Route path='/committees' element={<CommitteeList />} />
          <Route
            path='/committees/:committeePath'
            element={<DetailsCommittee />}
          />
          <Route
            path='/committees/add'
            element={
              isAdmin ? <AddCommittee /> : <Navigate to={`/auth/login`} />
            }
          />
          <Route path='/about' element={<About />} />
          <Route
            path='/auth/login'
            element={
              user ? <Navigate to={`/members/${user.regNumber}`} /> : <Login />
            }
          />
          <Route
            path='/auth/signup'
            element={
              user?.regNumber ? (
                <Navigate to={`/members/${user.regNumber}`} />
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path='/auth/verify-email/:emailToken'
            element={
              user?.regNumber ? (
                <Navigate to={`/members/${user.regNumber}`} />
              ) : (
                <VerifyEmail />
              )
            }
          />
          <Route
            path='/auth/set-password'
            element={
              user?.regNumber ? (
                <Navigate to={`/members/${user.regNumber}`} />
              ) : (
                <SetPassword />
              )
            }
          />
          <Route
            path='/users'
            element={isAdmin ? <Users /> : <Navigate to={`/auth/login`} />}
          />
          <Route index element={<Home />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Navbar;
