import { Box, TextField } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';

const SearchByText = () => {
  const { searchTerm } = useStoreState((state) => state.pharmacist);
  const { setSearchTerm } = useStoreActions((actions) => actions.pharmacist);

  return (
    <Box
      sx={{
        ml: -1.3,
        mr: 2,
        flex: '1 275px',
      }}
    >
      <TextField
        InputLabelProps={{ color: 'info' }}
        InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
        label='অনুসন্ধান'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='নাম, নিবন্ধন বা সদস্য পরিচিতি'
        variant='standard'
        sx={{
          width: '100%',
        }}
      />
    </Box>
  );
};

export default SearchByText;
