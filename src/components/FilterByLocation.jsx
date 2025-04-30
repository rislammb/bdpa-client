import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { districts } from '../constants/districts';
import {
  DIVISION_OPTIONS,
  INITIAL_OPTIONS,
  LOCATION_TYPE_OPTIONS,
} from '../constants/initialInputInfo';
import { upazilas } from '../constants/upazilas';

const FilterByLocation = () => {
  const {
    ui: { language },
  } = useStoreState((state) => state);

  const isBn = language === 'BN' ? true : false;

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      sx={{ flex: '1 280px' }}
    >
      <FormLabel component='legend'>
        {isBn ? 'ঠিকানা বা এলাকা অনুযায়ী বাছাই' : 'Filter by address/area'}
      </FormLabel>
      <FormGroup>
        <FilterLocationType />
        <FilterDivision />
        <FilterDistrict />
        <FilterUpazila />
      </FormGroup>
    </FormControl>
  );
};

export default FilterByLocation;

const FilterLocationType = () => {
  const {
    ui: { language },
    auth: { user },
  } = useStoreState((state) => state);

  const [searchParams, setSearchParams] = useSearchParams();
  const [locationType, setLocationType] = useState(
    searchParams.get('location_type') || 'all'
  );

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setLocationType(value);
    params.set('division', 'all');
    params.set('district', 'all');
    params.set('upazila', 'all');

    if (value) {
      params.set('location_type', value);
    } else {
      params.delete('location_type');
    }

    setSearchParams(params);
  };

  return (
    <FormControlLabel
      control={
        <TextField
          InputLabelProps={{ color: 'info' }}
          InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
          select
          name='locationType'
          label={isBn ? 'ঠিকানা বা এলাকার ধরন' : 'Location Type'}
          value={locationType}
          onChange={handleChange}
          variant='standard'
          sx={{
            textAlign: 'left',
            width: '100%',
            mt: 1,
          }}
        >
          {LOCATION_TYPE_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{ fontSize: 14 }}
              disabled={
                !user &&
                (option.id === 'permanentAddress' ||
                  option.id === 'deputationPosting')
              }
            >
              {isBn ? option.bn_name : option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    />
  );
};

const FilterDivision = () => {
  const {
    ui: { language },
  } = useStoreState((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [division, setDivision] = useState(
    searchParams.get('division') || 'all'
  );

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setDivision(value);
    params.set('district', 'all');
    params.set('upazila', 'all');
    params.set('page', 1);

    if (value) {
      params.set('division', value);
    } else {
      params.delete('division');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setDivision(searchParams.get('division') || 'all');
  }, [searchParams.get('location_type')]);

  return (
    <FormControlLabel
      control={
        <TextField
          InputLabelProps={{ color: 'info' }}
          InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
          select
          name='division'
          label={isBn ? 'বিভাগ' : 'Division'}
          value={division}
          onChange={handleChange}
          variant='standard'
          sx={{
            textAlign: 'left',
            width: '100%',
            mt: 1,
          }}
        >
          {DIVISION_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id} sx={{ fontSize: 14 }}>
              {isBn ? option.bn_name : option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    />
  );
};

const FilterDistrict = () => {
  const {
    ui: { language },
  } = useStoreState((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [district, setDistrict] = useState(
    searchParams.get('district') || 'all'
  );
  const [options, setOptions] = useState([
    ...INITIAL_OPTIONS,
    ...districts.filter(
      (dist) => dist.division_id === searchParams.get('division')
    ),
  ]);

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setDistrict(value);
    params.set('upazila', 'all');
    params.set('page', 1);

    if (value) {
      params.set('district', value);
    } else {
      params.delete('district');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setDistrict(searchParams.get('district') || 'all');
    setOptions([
      ...INITIAL_OPTIONS,
      ...districts.filter(
        (dist) => dist.division_id === searchParams.get('division')
      ),
    ]);
  }, [searchParams.get('division')]);

  return (
    <FormControlLabel
      control={
        <TextField
          InputLabelProps={{ color: 'info' }}
          InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
          select
          name='district'
          label={isBn ? 'জেলা' : 'District'}
          value={district}
          onChange={handleChange}
          variant='standard'
          sx={{
            textAlign: 'left',
            width: '100%',
            mt: 1,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id} sx={{ fontSize: 14 }}>
              {isBn ? option.bn_name : option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    />
  );
};

const FilterUpazila = () => {
  const {
    ui: { language },
    auth: { user },
  } = useStoreState((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const [upazila, setUpazila] = useState(searchParams.get('upazila') || 'all');
  const [options, setOptions] = useState([
    ...INITIAL_OPTIONS,
    ...upazilas.filter((up) => up.district_id === searchParams.get('district')),
  ]);

  const isBn = language === 'BN' ? true : false;

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setUpazila(value);
    params.set('page', 1);

    if (value) {
      params.set('upazila', value);
    } else {
      params.delete('upazila');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setUpazila(searchParams.get('upazila') || 'all');
    setOptions([
      ...INITIAL_OPTIONS,
      ...upazilas.filter(
        (up) => up.district_id === searchParams.get('district')
      ),
    ]);
  }, [searchParams.get('district')]);

  return (
    <FormControlLabel
      control={
        <TextField
          InputLabelProps={{ color: 'info' }}
          InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
          select
          name='upazila'
          label={isBn ? 'উপজেলা' : 'Upazila'}
          value={upazila}
          onChange={handleChange}
          variant='standard'
          sx={{
            textAlign: 'left',
            width: '100%',
            mt: 1,
          }}
        >
          {options.map((option) => (
            <MenuItem
              disabled={
                option.id !== "all" && (!user || searchParams.get('location_type') === 'voterArea')
              }
              key={option.id}
              value={option.id}
              sx={{ fontSize: 14 }}
            >
              {isBn ? option.bn_name : option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    />
  );
};
