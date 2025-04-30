import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { enToBnNumber } from '../../helpers/number';

const CustomPagination = ({ count, totalCount, pageSize }) => {
  const { language } = useStoreState((state) => state.ui);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [size, setSize] = useState(
    Number(searchParams.get('page_size')) || pageSize
  );

  const isBn = language === 'BN' ? true : false;

  const handlePageSizeChange = (e) => {
    const value = e.target.value;
    params.set('page', 1);

    if (value) {
      params.set('page_size', value);
      setSize(value);
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
    params.set('page_size', size);

    setSearchParams(params);
  }, []);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams.get('page')]);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 3, sm: 6 },
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <FormControl>
        <InputLabel color='info' id='pageSize'>
          {isBn ? 'প্রতি পৃষ্ঠায় সারি' : 'Rows per page'}
        </InputLabel>
        <Select
          labelId='pageSize'
          value={size}
          label={isBn ? 'প্রতি পৃষ্ঠায় সারি' : 'Rows per page'}
          onChange={handlePageSizeChange}
          variant='standard'
          sx={{ width: 125 }}
        >
          <MenuItem value={15}>{isBn ? '১৫ - পনের' : '15 - Fifteen'}</MenuItem>
          <MenuItem value={30}>{isBn ? '৩০ - ত্রিশ' : '30 - Thirty'}</MenuItem>
          <MenuItem value={50}>{isBn ? '৫০ - পঞ্চাশ' : '50 - Fifty'}</MenuItem>
          <MenuItem value={100}>
            {isBn ? '১০০ - একশো' : '100 - Hundred'}
          </MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {count > 0 && totalCount && (
          <Typography>
            {isBn
              ? `${enToBnNumber(count)} টির মধ্যে ${enToBnNumber(
                  count > 0 ? (page - 1) * size + 1 : 0
                )} থেকে ${enToBnNumber(
                  page * size < count ? page * size : count
                )} টি দেখাচ্ছে `
              : `Showing ${count > 0 ? (page - 1) * size + 1 : 0} to ${
                  page * size < count ? page * size : count
                } of ${count} entries `}
            {count < totalCount && (
              <Typography component={'span'}>
                {isBn
                  ? `( বাছাই করা হয়েছে মোট ${enToBnNumber(
                      totalCount
                    )} টি থেকে )`
                  : `( filtered from ${totalCount} total entries )`}
              </Typography>
            )}
          </Typography>
        )}

        <Pagination
          count={Math.ceil(count / size)}
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
    </Box>
  );
};

export default CustomPagination;

CustomPagination.propTypes = {
  count: PropTypes.number.isRequired,
  totalCount: PropTypes.number,
  pageSize: PropTypes.oneOf([15, 30, 50, 100]).isRequired,
};
