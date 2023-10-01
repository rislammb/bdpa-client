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
import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';

import About from '../pages/About';
import Add from '../pages/Add';
import AddCommittee from '../pages/AddCommittee';
import CommitteeDetails from '../pages/CommitteeDetails';
import CommitteeTable from '../pages/CommitteeTable';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PharmacistDetails from '../pages/PharmacistDetails';
import PharmacistTable from '../pages/PharmacistTable';
import Signup from '../pages/Signup';

const drawerWidth = 240;
const navItems = [
  { path: '/members/page/1', text: 'Members' },
  { path: '/committees', text: 'Committees' },
  { path: '/members/add', text: 'Add Member' },
  { path: '/about', text: 'About' },
  { path: '/login', text: 'Login' },
];

const Navbar = (props) => {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      <Typography variant='h6' sx={{ my: 1.5, textAlign: 'center' }}>
        BDPA
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink style={linkStyle()} to='/'>
              Home
            </NavLink>
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton>
              <NavLink
                style={({ isActive }) => linkStyle(isActive)}
                to={item.path}
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
                src={`${process.env.PUBLIC_URL}/bdpa_logo.png`}
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
          <Route path='/members/add' element={<Add />} />
          <Route
            path='/members/page/:pageNumber'
            element={<PharmacistTable />}
          />
          <Route path='/members/:regNumber' element={<PharmacistDetails />} />
          <Route path='/committees' element={<CommitteeTable />} />
          <Route
            path='/committees/:committeeId'
            element={<CommitteeDetails />}
          />
          <Route path='/committees/add' element={<AddCommittee />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route index element={<Home />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Navbar;
