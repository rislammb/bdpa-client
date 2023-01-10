import { Clear, FilterAltOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterByJobDepertment from './FilterByJobDepertment';
import FilterByLocation from './FilterByLocation';
import SearchByText from './SearchByText';

const FilterGroup = ({ dbPharmacists, setAfterFilter }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [
    phramacistsAfterDepertmentFilter,
    setPhramacistsAfterDepertmentFilter,
  ] = useState(dbPharmacists);
  const [pharmacistsAfterLocationFilter, setPharmacistsAfterLocationFilter] =
    useState([]);

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
          {mobileOpen ? <FilterAltOutlined /> : <Clear />}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          height: mobileOpen ? '290px' : 0,
          transition: 'all 0.35s ease-in-out',
          overflow: mobileOpen ? 'inherit' : 'hidden',
        }}
      >
        <FilterByJobDepertment
          pharmacists={dbPharmacists}
          onChange={(value) => setPhramacistsAfterDepertmentFilter(value)}
        />
        <FilterByLocation
          pharmacists={phramacistsAfterDepertmentFilter}
          onChange={(value) => setPharmacistsAfterLocationFilter(value)}
        />
      </Box>
      <SearchByText
        pharmacists={pharmacistsAfterLocationFilter}
        onChange={(value) => setAfterFilter(value)}
      />
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
        flexWrap: 'wrap',
      }}
    >
      <FilterByJobDepertment
        pharmacists={dbPharmacists}
        onChange={(value) => setPhramacistsAfterDepertmentFilter(value)}
      />
      <FilterByLocation
        pharmacists={phramacistsAfterDepertmentFilter}
        onChange={(value) => setPharmacistsAfterLocationFilter(value)}
      />
      <SearchByText
        pharmacists={pharmacistsAfterLocationFilter}
        onChange={(value) => setAfterFilter(value)}
      />
    </Box>
  );

  useEffect(() => {
    setPhramacistsAfterDepertmentFilter(dbPharmacists);
    setPharmacistsAfterLocationFilter(dbPharmacists);
  }, [dbPharmacists]);

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
