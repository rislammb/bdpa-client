import { Clear, FilterAltOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import FilterByJobDepertment from './FilterByJobDepertment';
import FilterByLocation from './FilterByLocation';
import SearchByText from './SearchByText';

const FilterGroup = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFilterToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const temporaryJSX = (
    <Box
      sx={{
        my: 1.5,
        ml: 2,
        mr: -2,
      }}
    >
      <Box
        sx={{
          textAlign: 'right',
          mr: 2,
        }}
      >
        <IconButton
          sx={{ background: 'rgba(127,127,127,0.13)' }}
          onClick={handleFilterToggle}
        >
          {mobileOpen ? <Clear /> : <FilterAltOutlined />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          height: mobileOpen ? '290px' : 0,
          transition: 'all 0.35s ease-in-out',
          overflow: mobileOpen ? 'inherit' : 'hidden',
          mb: 1.5,
        }}
      >
        <FilterByLocation />
        <FilterByJobDepertment />
      </Box>
      <SearchByText />
    </Box>
  );

  const permanentJSX = (
    <Box
      sx={{
        display: 'flex',
        my: 2,
        ml: 2,
        mr: -2,
        gap: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <FilterByLocation />
      <FilterByJobDepertment />
      <SearchByText />
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {temporaryJSX}
      </Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {permanentJSX}
      </Box>
    </Box>
  );
};

export default FilterGroup;
