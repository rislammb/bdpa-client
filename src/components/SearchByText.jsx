import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
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
        InputProps={{
          style: { fontSize: 14, paddingLeft: '5px' },
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setSearchTerm('')} size='small'>
                <ClearIcon color='error' fontSize='small' />
              </IconButton>
            </InputAdornment>
          ),
        }}
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
