import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CustomPagination = ({ totalCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get('page_size')) || 15
  );

  const handlePageSizeChange = (e) => {
    const value = e.target.value;
    params.set('page', 1);

    if (value) {
      params.set('page_size', value);
      setPageSize(value);
    }

    setSearchParams(params);
  };

  const handleChange = (_event, value) => {
    if (value) {
      params.set('page', value);
      setPage(value);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    params.set('page', page);
    params.set('page_size', pageSize);

    setSearchParams(params);
  }, []);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams.get('page')]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <FormControl>
        <InputLabel color='info' id='pageSize'>
          Rows per page
        </InputLabel>
        <Select
          labelId='pageSize'
          value={pageSize}
          label='Rows per page'
          onChange={handlePageSizeChange}
          variant='standard'
          sx={{ width: 115 }}
        >
          <MenuItem value={15}>15 - Fifteen</MenuItem>
          <MenuItem value={30}>30 - Thirty</MenuItem>
          <MenuItem value={50}>50 - Fifty</MenuItem>
        </Select>
      </FormControl>

      <Pagination
        count={totalCount && Math.ceil(totalCount / pageSize)}
        page={page}
        color='primary'
        onChange={handleChange}
        sx={{
          '.MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;

CustomPagination.propTypes = {
  totalCount: PropTypes.number,
};
