import { Clear, FilterAltOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

const FilterDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFilterToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const permanentFilterMenu = <div>permanet</div>;

  const temporaryFilterMenu = mobileOpen ? (
    <div>
      <IconButton
        sx={{ background: 'rgba(127,127,127,0.13)' }}
        onClick={handleFilterToggle}
      >
        <Clear />
      </IconButton>

      <input type='text' />
      <input type='text' />
      <input type='text' />
    </div>
  ) : (
    <div>
      <IconButton
        sx={{ background: 'rgba(127,127,127,0.13)' }}
        onClick={handleFilterToggle}
      >
        <FilterAltOutlined />
      </IconButton>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        onClose={handleFilterToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {temporaryFilterMenu}
      </Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        open
      >
        {permanentFilterMenu}
      </Box>
    </Box>
  );
};

FilterDrawer.propTypes = {};

export default FilterDrawer;
