import { Clear, FilterAltOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterByJobDepertment from './FilterByJobDepertment';
import FilterByLocation from './FilterByLocation';
import SearchByText from './SearchByText';

const FilterGroup = ({ dbPharmacists, setAfterFilter }) => {
  const [mobileOpen, setMobileOpen] = useState(true);
  const [
    phramacistsAfterDepertmentFilter,
    setPhramacistsAfterDepertmentFilter,
  ] = useState(dbPharmacists);
  const [pharmacistsAfterLocationFilter, setPharmacistsAfterLocationFilter] =
    useState([]);

  const handleFilterToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const permanentJSX = (
    <>
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
    </>
  );

  const temporaryJSX = mobileOpen ? (
    <>
      <Box
        sx={{
          flex: '1 275px',
          textAlign: 'right',
          mr: 2,
        }}
      >
        <IconButton
          sx={{ background: 'rgba(127,127,127,0.13)' }}
          onClick={handleFilterToggle}
        >
          <FilterAltOutlined />
        </IconButton>
        <SearchByText
          pharmacists={pharmacistsAfterLocationFilter}
          onChange={(value) => setAfterFilter(value)}
        />
      </Box>
    </>
  ) : (
    <>
      <Box
        sx={{
          flex: '1 275px',
          textAlign: 'right',
          mr: 2,
        }}
      >
        <IconButton
          sx={{ background: 'rgba(127,127,127,0.13)' }}
          onClick={handleFilterToggle}
        >
          <Clear />
        </IconButton>
      </Box>
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
    </>
  );

  useEffect(() => {
    setPhramacistsAfterDepertmentFilter(dbPharmacists);
    setPharmacistsAfterLocationFilter(dbPharmacists);
  }, [dbPharmacists]);

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 2,
          ml: 2,
          mr: -2,
          gap: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {temporaryJSX}
      </Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          my: 2,
          ml: 2,
          mr: -2,
          gap: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {permanentJSX}
      </Box>
    </Box>
  );
};

export default FilterGroup;
