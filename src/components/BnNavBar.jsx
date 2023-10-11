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
import BnDetailsPharmacist from '../pages/BnDetailsPharmacist';
import BnHome from '../pages/BnHome';
import BnPharmacistList from '../pages/BnPharmacistList';
import CommitteeList from '../pages/CommitteeList';
import DetailsCommittee from '../pages/DetailsCommittee';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const drawerWidth = 240;

const BnNavbar = (props) => {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useStoreState((state) => state.auth);
  const { logout } = useStoreActions((actions) => actions.auth);

  const navItems = [
    { path: '/members/page/1', text: 'সদস্য' },
    { path: '/committees', text: 'কমিটি' },
    { path: '/about', text: 'সম্পর্কে' },
    { path: '/login', text: user ? 'লগ আউট' : 'লগ ইন' },
  ];

  if (user) navItems.unshift({ path: '/members/add', text: 'সদস্য যোগ' });

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
        বিডিপিএ
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink style={linkStyle()} to='/'>
              হোম
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
                  if (item.text === 'লগ আউট') handleLogout();
                }}
              >
                {item.text}
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
              display: { sm: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} sx={{ color: '#f1f1f1' }}>
                <NavLink
                  style={({ isActive }) => linkStyle(isActive)}
                  to={item.path}
                  onClick={() => {
                    if (item.text === 'লগ আউট') handleLogout();
                  }}
                >
                  {item.text}
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
            display: { xs: 'block', sm: 'none' },
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
            element={user ? <AddPharmacist /> : <Navigate to={`/login`} />}
          />
          <Route
            path='/members/page/:pageNumber'
            element={<BnPharmacistList />}
          />
          <Route path='/members/:regNumber' element={<BnDetailsPharmacist />} />
          <Route path='/committees' element={<CommitteeList />} />
          <Route
            path='/committees/:committeePath'
            element={<DetailsCommittee />}
          />
          <Route
            path='/committees/add'
            element={user ? <AddCommittee /> : <Navigate to={`/login`} />}
          />
          <Route path='/about' element={<About />} />
          <Route
            path='/login'
            element={
              user ? <Navigate to={`/members/${user.regNumber}`} /> : <Login />
            }
          />
          <Route
            path='/signup'
            element={
              user?.regNumber ? (
                <Navigate to={`/members/${user.regNumber}`} />
              ) : (
                <Signup />
              )
            }
          />

          <Route index element={<BnHome />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default BnNavbar;
