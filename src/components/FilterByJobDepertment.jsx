import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';

const FilterByJobDepertment = () => {
  const { jobDepertmentInfo } = useStoreState((state) => state.pharmacist);
  const { setJobDepertmentInfo } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const handleJobDepertmentChange = (e) => {
    jobDepertmentInfo.value = e.target.value;
    setJobDepertmentInfo(jobDepertmentInfo);

    // if (e.target.value === 'all') {
    //   handleForDepertmentChange(pharmacists);
    // } else {
    //   const nameFromId = jobDepertmentOptions.find(
    //     (option) => option.id === e.target.value
    //   )?.name;
    //   handleForDepertmentChange(
    //     pharmacists.filter(
    //       (pharmacist) => pharmacist.jobDepertment === nameFromId
    //     )
    //   );
    // }
  };

  // useEffect(() => {
  //   handleForDepertmentChange(pharmacists);
  //   setJobDepertmentInfo({
  //     ...INITIAL_DEPERTMENT_INFO,
  //   });
  // }, [pharmacists]);

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      sx={{
        flex: '1 280px',
      }}
    >
      <FormLabel component='legend'>চাকুরীর বিভাগ অনুযায়ী বাছাই</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <TextField
              InputLabelProps={{ color: 'info' }}
              InputProps={{ style: { fontSize: 14, paddingLeft: '5px' } }}
              select
              name='jobDepertment'
              label='চাকুরীর বিভাগ'
              value={jobDepertmentInfo.value}
              onChange={handleJobDepertmentChange}
              variant='standard'
              sx={{
                textAlign: 'left',
                width: '100%',
              }}
            >
              {jobDepertmentInfo.options.length > 0 ? (
                jobDepertmentInfo.options.map((option) => (
                  <MenuItem
                    key={option.id}
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
      </FormGroup>
    </FormControl>
  );
};

export default FilterByJobDepertment;
