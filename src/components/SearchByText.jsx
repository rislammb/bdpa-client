import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';

const SearchByText = () => {
  const {
    pharmacist: { searchTerm },
    ui: { language },
  } = useStoreState((state) => state);
  const { setSearchTerm } = useStoreActions((actions) => actions.pharmacist);
  const isBn = language === 'BN' ? true : false;

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
              <IconButton
                disabled={!searchTerm}
                onClick={() => setSearchTerm('')}
                size='small'
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label={isBn ? 'অনুসন্ধান' : 'Search'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={
          isBn
            ? 'নাম, নিবন্ধন, সদস্য পরিচিতি বা ইমেইল'
            : 'Name, Registration, Member ID or Email'
        }
        variant='standard'
        sx={{
          width: '100%',
        }}
      />
    </Box>
  );
};

export default SearchByText;
