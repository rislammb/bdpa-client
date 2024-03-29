import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
import ResetPassword from '../pages/ResetPassword';
import SetPassword from '../pages/SetPassword';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
import VerifyEmail from '../pages/VerifyEmail';
import DrawerComp from './DrawerComp';
import UserMenu from './UserMenu';

const drawerWidth = 240;

const Navbar = ({ window, children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    auth: { user },
    ui: { language },
  } = useStoreState((state) => state);

  const isBn = language === 'BN' ? true : false;

  const navItems = [
    { path: '/members', text: 'Members', bn_text: 'সদস্য' },
    { path: '/committees', text: 'Committees', bn_text: 'কমিটি' },
    { path: '/about', text: 'About BDPA', bn_text: 'বিডিপিএ সম্পর্কে' },
  ];

  const isAdmin =
    user?.accountStatus === 'ACTIVE' &&
    (user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN'));

  if (isAdmin) {
    navItems.push({
      path: '/users',
      text: 'Users',
      bn_text: 'ব্যবহারকারীগণ',
    });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }, [mobileOpen]);

  const linkStyle = (isActive = false) => ({
    color: isActive ? theme.palette.primary.light : '#f1f1f1',
    width: '100%',
    textAlign: 'center',
  });

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
          <div>{children}</div>

          <Box
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerToggle}
            sx={{
              ml: 1,
              display: { xs: 'block', sm: 'none' },
            }}
          >
            {user ? (
              <UserMenu />
            ) : (
              <IconButton color='inherit'>
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Button key={item.text} sx={{ color: '#f1f1f1' }}>
                <NavLink
                  style={({ isActive }) => linkStyle(isActive)}
                  to={item.path}
                >
                  {isBn ? item.bn_text : item.text}
                </NavLink>
              </Button>
            ))}

            {user ? (
              <UserMenu />
            ) : (
              <Button sx={{ color: '#f1f1f1' }}>
                <NavLink
                  style={({ isActive }) => linkStyle(isActive)}
                  to={'/auth/login'}
                >
                  {isBn ? 'লগ ইন' : 'Login'}
                </NavLink>
              </Button>
            )}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerComp
            handleDrawerToggle={handleDrawerToggle}
            navItems={navItems}
          />
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          px: { xs: 1, md: 2 },
          pb: 4,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Toolbar />
        <Routes>
          <Route
            path='/members/add'
            element={
              isAdmin ? <AddPharmacist /> : <Navigate to={`/auth/login`} />
            }
          />
          <Route path='/members' element={<PharmacistList />} />
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
              user ? (
                user?.regNumber ? (
                  <Navigate to={`/members/${user.regNumber}`} />
                ) : (
                  <Navigate to={'/'} />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path='/auth/signup'
            element={
              user ? (
                user?.regNumber ? (
                  <Navigate to={`/members/${user.regNumber}`} />
                ) : (
                  <Navigate to={'/'} />
                )
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path='/auth/reset-password'
            element={
              user ? (
                user?.regNumber ? (
                  <Navigate to={`/members/${user.regNumber}`} />
                ) : (
                  <Navigate to={'/'} />
                )
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route
            path='/auth/verify-email/:emailToken'
            element={
              user ? (
                user?.regNumber ? (
                  <Navigate to={`/members/${user.regNumber}`} />
                ) : (
                  <Navigate to={'/'} />
                )
              ) : (
                <VerifyEmail />
              )
            }
          />
          <Route
            path='/auth/set-password'
            element={
              user ? (
                user?.regNumber ? (
                  <Navigate to={`/members/${user.regNumber}`} />
                ) : (
                  <Navigate to={'/'} />
                )
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

Navbar.propTypes = {
  window: PropTypes.object,
  children: PropTypes.node,
};
