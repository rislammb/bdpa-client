import PropTypes from 'prop-types';

import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({
  label = 'Search',
  placeholder = 'Search..',
  sx = { width: '100%' },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const debounced = useDebouncedCallback((value) => handleChange(value), 300);

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
        label={label}
        InputProps={{
          style: { fontSize: 14, paddingLeft: '5px' },
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                disabled={!searchParams.get('query')}
                onClick={() => debounced('')}
                size='small'
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          ),
        }}
        name='query'
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => debounced(e.target.value)}
        placeholder={placeholder}
        variant='standard'
        sx={sx}
      />
    </Box>
  );
};

export default Search;

Search.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
};
