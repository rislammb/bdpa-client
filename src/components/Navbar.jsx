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
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import About from '../pages/About';
import Add from '../pages/Add';
import AddCommittee from '../pages/AddCommittee';
import CommitteeDetails from '../pages/CommitteeDetails';
import CommitteeList from '../pages/CommitteeList';
import DetailsTable from '../pages/DetailsTable';
import Home from '../pages/Home';
import ListTable from '../pages/ListTable';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const drawerWidth = 240;
const navItems = [
  { path: '/members/page/1', text: 'Members' },
  { path: '/committee', text: 'Committee' },
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

  const linkStyle = {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    width: '100%',
    textAlign: 'center',
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant='h6' sx={{ my: 1.5, textAlign: 'center' }}>
        BDPA
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <NavLink style={linkStyle} to='/'>
              Home
            </NavLink>
          </ListItemButton>
        </ListItem>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton>
              <NavLink
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, fontWeight: 'bold' } : linkStyle
                }
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
            <NavLink to='/'>
              <img
                src={`${process.env.PUBLIC_URL}/bdpa_logo.png`}
                alt='logo'
                width='50px'
                height='50px'
              />
            </NavLink>
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
                  style={({ isActive }) => {
                    return {
                      color: '#f1f1f1',
                      fontWeight: isActive ? 'bold' : '',
                    };
                  }}
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
          <Route index element={<Home />} />
          <Route path='/members/add' element={<Add />} />
          <Route path='/members/:regNumber' element={<DetailsTable />} />
          <Route path='/members/page/:pageNumber' element={<ListTable />} />
          <Route path='/committee' element={<CommitteeList />} />
          <Route
            path='/committee/:committeePath'
            element={<CommitteeDetails />}
          />
          <Route path='/committee/add' element={<AddCommittee />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
