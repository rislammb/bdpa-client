import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const Search = ({
  label = 'Search',
  placeholder = 'Search..',
  sx = { width: '100%' },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', 1);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    debounced(value);
  };

  const handleClear = () => {
    setQuery('');
    debounced('');
  };

  return (
    <TextField
      InputLabelProps={{ color: 'info' }}
      label={label}
      InputProps={{
        style: { fontSize: 14, paddingLeft: '5px', paddingBottom: 2 },
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              disabled={!searchParams.get('query')}
              onClick={handleClear}
              size='small'
            >
              <ClearIcon fontSize='small' />
            </IconButton>
          </InputAdornment>
        ),
      }}
      name='query'
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      variant='standard'
      sx={sx}
    />
  );
};

export default Search;

Search.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
};
