import { Clear, FilterAltOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import FilterByJobDepertment from './FilterByJobDepertment';
import FilterByLocation from './FilterByLocation';
import SearchByText from './SearchByText';

const FilterGroup = ({ dbPharmacists, setAfterFilter, window }) => {
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

  const filter = mobileOpen ? (
    <Box sx={{ flex: '1 250px', textAlign: 'right', mr: 2 }}>
      <IconButton onClick={handleFilterToggle}>
        <FilterAltOutlined />
      </IconButton>
    </Box>
  ) : (
    <>
      <Box
        sx={{
          flex: '1 250px',
          textAlign: 'right',
          mr: 2,
        }}
      >
        <IconButton onClick={handleFilterToggle}>
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
    </>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        my: 2,
        ml: 2,
        mr: -2,
        display: 'flex',
        gap: 1,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {filter}
      <SearchByText
        pharmacists={pharmacistsAfterLocationFilter}
        onChange={(value) => setAfterFilter(value)}
      />
    </Box>
  );
};

export default FilterGroup;
