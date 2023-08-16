import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { districts } from '../constants/districts';
import { divisions } from '../constants/divisions';
import { upazilas } from '../constants/upazilas';

const INITIAL_LOCATION_INFO = {
  locationType: {
    name: 'locationType',
    label: 'Location Type',
    value: 'all',
    options: [
      {
        id: 'all',
        name: 'All',
      },
      {
        id: '1',
        name: 'Main Posting',
      },
      {
        id: '2',
        name: 'Voter Area',
      },
      {
        id: '3',
        name: 'Deputation Posting',
      },
      {
        id: '4',
        name: 'Permanent Address',
      },
    ],
  },
  division: {
    name: 'division',
    label: 'Division',
    value: 'all',
    options: [{ id: 'all', name: 'All' }, ...divisions],
  },
  district: {
    name: 'district',
    label: 'District',
    value: 'all',
    options: [{ id: 'all', name: 'All' }],
  },
  upazila: {
    name: 'upazila',
    label: 'Upazila',
    value: 'all',
    options: [{ id: 'all', name: 'All' }],
  },
};

const FilterByLocation = ({ pharmacists, onChange }) => {
  const [locationInfo, setLocationInfo] = useState({
    ...INITIAL_LOCATION_INFO,
  });

  const locationInfoArray = Object.keys(locationInfo).reduce((acc, cur) => {
    acc.push(locationInfo[cur]);
    return acc;
  }, []);

  const handleLocationChange = (e) => {
    if (e.target.name === 'locationType') {
      setLocationInfo((prevState) => ({
        ...prevState,
        locationType: {
          ...prevState['locationType'],
          value: e.target.value,
        },
        division: { ...INITIAL_LOCATION_INFO.division },
        district: { ...INITIAL_LOCATION_INFO.district },
        upazila: { ...INITIAL_LOCATION_INFO.upazila },
      }));
      onChange(pharmacists);
    } else if (e.target.name === 'division') {
      setLocationInfo((prevState) => ({
        ...prevState,
        division: {
          ...prevState['division'],
          value: e.target.value,
        },
        district: {
          ...prevState['district'],
          value: 'all',
          options: [
            { id: 'all', name: 'All' },
            ...districts.filter((dist) => dist.division_id === e.target.value),
          ],
        },
        upazila: {
          ...INITIAL_LOCATION_INFO.upazila,
        },
      }));

      if (e.target.value === 'all') {
        onChange(pharmacists);
      } else {
        let valueForChange = [];
        if (locationInfo.locationType.value === '1') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.postingDivision.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '2') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.voterDivision.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '3') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.deputationDivision.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '4') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.permanentDivision.id === e.target.value
          );
        } else {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingDivision.id === e.target.value ||
              pharmacist.voterDivision.id === e.target.value ||
              pharmacist.deputationDivision.id === e.target.value ||
              pharmacist.permanentDivision.id === e.target.value
          );
        }
        onChange(valueForChange);
      }
    } else if (e.target.name === 'district') {
      setLocationInfo((prevState) => ({
        ...prevState,
        district: {
          ...prevState['district'],
          value: e.target.value,
        },
        upazila: {
          ...prevState['upazila'],
          value: 'all',
          options: [
            { id: 'all', name: 'All' },
            ...upazilas.filter(
              (upazila) => upazila.district_id === e.target.value
            ),
          ],
        },
      }));

      if (e.target.value === 'all') {
        let valueForChange = [];
        if (locationInfo.locationType.value === '1') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingDivision.id === locationInfo.division.value
          );
        } else if (locationInfo.locationType.value === '2') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.voterDivision.id === locationInfo.division.value
          );
        } else if (locationInfo.locationType.value === '3') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.deputationDivision.id === locationInfo.division.value
          );
        } else if (locationInfo.locationType.value === '4') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.permanentDivision.id === locationInfo.division.value
          );
        } else {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingDivision.id === locationInfo.division.value ||
              pharmacist.voterDivision.id === locationInfo.division.value ||
              pharmacist.deputationDivision.id ===
                locationInfo.division.value ||
              pharmacist.permanentDivision.id === locationInfo.division.value
          );
        }

        onChange(valueForChange);
      } else {
        let valueForChange = [];
        if (locationInfo.locationType.value === '1') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.postingDistrict.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '2') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.voterDistrict.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '3') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.deputationDistrict.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '4') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.permanentDistrict.id === e.target.value
          );
        } else {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingDistrict.id === e.target.value ||
              pharmacist.voterDistrict.id === e.target.value ||
              pharmacist.deputationDistrict.id === e.target.value ||
              pharmacist.permanentDistrict.id === e.target.value
          );
        }

        onChange(valueForChange);
      }
    } else if (e.target.name === 'upazila') {
      setLocationInfo((prevState) => ({
        ...prevState,
        upazila: {
          ...prevState['upazila'],
          value: e.target.value,
        },
      }));

      if (e.target.value === 'all') {
        let valueForChange = [];
        if (locationInfo.locationType.value === '1') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingDistrict.id === locationInfo.district.value
          );
        } else if (locationInfo.locationType.value === '2') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.voterDistrict.id === locationInfo.district.value
          );
        } else if (locationInfo.locationType.value === '3') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.deputationDistrict.id === locationInfo.district.value
          );
        } else if (locationInfo.locationType.value === '4') {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.permanentDistrict.id === locationInfo.district.value
          );
        } else {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingDistrict.id === locationInfo.district.value ||
              pharmacist.voterDistrict.id === locationInfo.district.value ||
              pharmacist.deputationDistrict.id ===
                locationInfo.district.value ||
              pharmacist.permanentDistrict.id === locationInfo.district.value
          );
        }
        onChange(valueForChange);
      } else {
        let valueForChange = [];
        if (locationInfo.locationType.value === '1') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.postingUpazila.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '3') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.deputationUpazila.id === e.target.value
          );
        } else if (locationInfo.locationType.value === '4') {
          valueForChange = pharmacists.filter(
            (pharmacist) => pharmacist.permanentUpazila.id === e.target.value
          );
        } else {
          valueForChange = pharmacists.filter(
            (pharmacist) =>
              pharmacist.postingUpazila.id === e.target.value ||
              pharmacist.deputationUpazila.id === e.target.value ||
              pharmacist.permanentUpazila.id === e.target.value
          );
        }

        onChange(valueForChange);
      }
    }
  };

  useEffect(() => {
    onChange(pharmacists);
    setLocationInfo({ ...INITIAL_LOCATION_INFO });
  }, [pharmacists]);

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      sx={{ flex: '1 280px' }}
    >
      <FormLabel component='legend'>Filter by location</FormLabel>
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
                        label={field.label}
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
                              {option.name}
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
                      label={field.label}
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
                            {option.name}
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
