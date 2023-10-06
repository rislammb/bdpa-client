import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { districts } from '../constants/districts';
import { INITIAL_LOCATION_INFO } from '../constants/initialInputInfo';
import { upazilas } from '../constants/upazilas';

const FilterByLocation = () => {
  const { locationInfo } = useStoreState((state) => state.pharmacist);
  const { setLocationInfo } = useStoreActions((actions) => actions.pharmacist);

  const handleLocationChange = (e) => {
    if (e.target.name === 'locationType') {
      locationInfo.locationType.value = e.target.value;
      locationInfo.division = { ...INITIAL_LOCATION_INFO.division };
      locationInfo.district = { ...INITIAL_LOCATION_INFO.district };
      locationInfo.upazila = { ...INITIAL_LOCATION_INFO.upazila };

      setLocationInfo(locationInfo);
    } else if (e.target.name === 'division') {
      locationInfo.division.value = e.target.value;
      locationInfo.district.value = 'all';
      locationInfo.district.options = [
        { id: 'all', name: 'All' },
        ...districts.filter((dist) => dist.division_id === e.target.value),
      ];
      locationInfo.upazila = { ...INITIAL_LOCATION_INFO.upazila };
      setLocationInfo(locationInfo);
    } else if (e.target.name === 'district') {
      locationInfo.district.value = e.target.value;
      locationInfo.upazila.value = 'all';
      locationInfo.upazila.options = [
        { id: 'all', name: 'All' },
        ...upazilas.filter((upazila) => upazila.district_id === e.target.value),
      ];
      setLocationInfo(locationInfo);
    } else if (e.target.name === 'upazila') {
      locationInfo.upazila.value = e.target.value;
      setLocationInfo(locationInfo);
    }
  };

  // useEffect(() => {
  //   onChange(pharmacists);
  //   setLocationInfo({ ...INITIAL_LOCATION_INFO });
  // }, [pharmacists]);

  const locationInfoArray = Object.keys(locationInfo).reduce((acc, cur) => {
    acc.push(locationInfo[cur]);
    return acc;
  }, []);

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      sx={{ flex: '1 280px' }}
    >
      <FormLabel component='legend'>ঠিকানা অনুযায়ী বাছাই</FormLabel>
      <FormGroup>
        {locationInfoArray.length > 0 &&
          locationInfoArray.map((field) => {
            if (field.name === 'upazila') {
              if (locationInfo.locationType.value === '2') {
                return '';
              } else {
                return (
                  <FormControlLabel
                    key={field.name}
                    control={
                      <TextField
                        InputLabelProps={{ color: 'info' }}
                        InputProps={{
                          style: { fontSize: 14, paddingLeft: '5px' },
                        }}
                        select
                        name={field.name}
                        label={field.bn_label}
                        value={field.value}
                        onChange={handleLocationChange}
                        variant='standard'
                        sx={{
                          textAlign: 'left',
                          width: '100%',
                        }}
                      >
                        {field.options.length > 0 ? (
                          field.options.map((option) => (
                            <MenuItem
                              key={field.name + option.id}
                              value={option.id}
                              sx={{ fontSize: 14 }}
                            >
                              {option.bn_name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem />
                        )}
                      </TextField>
                    }
                  />
                );
              }
            } else
              return (
                <FormControlLabel
                  key={field.name}
                  control={
                    <TextField
                      InputLabelProps={{ color: 'info' }}
                      InputProps={{
                        style: { fontSize: 14, paddingLeft: '5px' },
                      }}
                      select
                      name={field.name}
                      label={field.bn_label}
                      value={field.value}
                      onChange={handleLocationChange}
                      variant='standard'
                      sx={{
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      {field.options.length > 0 ? (
                        field.options.map((option) => (
                          <MenuItem
                            key={field.name + option.id}
                            value={option.id}
                            sx={{ fontSize: 14 }}
                          >
                            {option.bn_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem />
                      )}
                    </TextField>
                  }
                />
              );
          })}
      </FormGroup>
    </FormControl>
  );
};

export default FilterByLocation;
