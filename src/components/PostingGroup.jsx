import { MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';

const PostingGroup = ({ postingInfo, onChange, label, error }) => {
  return (
    <FormControl
      sx={{ m: 1, width: '33.33333ch' }}
      component='fieldset'
      variant='standard'
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {postingInfo.map((field) => {
          if (field.type === 'select') {
            return (
              <FormControlLabel
                key={field.name}
                sx={{ mr: 0 }}
                control={
                  <TextField
                    InputLabelProps={{ color: 'info' }}
                    select
                    name={field.name}
                    label={field.label}
                    value={field.value}
                    onChange={onChange}
                    variant='standard'
                    sx={{
                      textAlign: 'left',
                    }}
                  >
                    {field.options.length > 0 ? (
                      field.options.map((option) => (
                        <MenuItem
                          key={field.name + option.id}
                          value={option.id}
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
          } else
            return (
              <FormControlLabel
                key={field.name}
                sx={{ mr: 0 }}
                control={
                  <TextField
                    InputLabelProps={{ color: 'info' }}
                    name={field.name}
                    label={field.label}
                    value={field.value}
                    error={error[field.name] ? true : false}
                    helperText={error[field.name] ? error[field.name] : ''}
                    placeholder={field.placeholder}
                    onChange={onChange}
                    variant='standard'
                  />
                }
              />
            );
        })}
      </FormGroup>
    </FormControl>
  );

  // return (
  //   <FormControl
  //     name={name}
  //     sx={{ m: 1, width: '33.33333ch' }}
  //     // error={error}
  //     component='fieldset'
  //     variant='standard'
  //   >
  //     <FormLabel component='legend'>Main Posting</FormLabel>
  //     <FormGroup>
  //       <FormControlLabel
  //         sx={{ mr: 0 }}
  //         control={
  //           <TextField
  //             select
  //             name={division.name}
  //             label={division.label}
  //             value={division.value}
  //             onChange={onChange}
  //             variant='standard'
  //             sx={{
  //               textAlign: 'left',
  //             }}
  //           >
  //             {division.options.length > 0 ? (
  //               division.options.map((option) => (
  //                 <MenuItem key={option.id} value={option}>
  //                   {option.name}
  //                 </MenuItem>
  //               ))
  //             ) : (
  //               <MenuItem />
  //             )}
  //           </TextField>
  //         }
  //       />
  //       <FormControlLabel
  //         sx={{ mr: 0 }}
  //         control={
  //           <TextField
  //             select
  //             name={district.name}
  //             label={district.label}
  //             value={district.value}
  //             onChange={onChange}
  //             variant='standard'
  //             style={{ textAlign: 'left' }}
  //           >
  //             {district.options.length > 0 ? (
  //               district.options.map((option) => (
  //                 <MenuItem key={option.id} value={option}>
  //                   {option.name}
  //                 </MenuItem>
  //               ))
  //             ) : (
  //               <MenuItem />
  //             )}
  //           </TextField>
  //         }
  //       />
  //       <FormControlLabel
  //         sx={{ mr: 0 }}
  //         control={
  //           <TextField
  //             select
  //             name={upazila.name}
  //             label={upazila.label}
  //             value={upazila.value}
  //             onChange={onChange}
  //             variant='standard'
  //             style={{ textAlign: 'left' }}
  //           >
  //             {upazila.options.length > 0 ? (
  //               upazila.options.map((option) => (
  //                 <MenuItem key={option.id} value={option}>
  //                   {option.name}
  //                 </MenuItem>
  //               ))
  //             ) : (
  //               <MenuItem />
  //             )}
  //           </TextField>
  //         }
  //       />
  //       <FormControlLabel
  //         sx={{ mr: 0 }}
  //         control={
  //           <TextField
  //             name={postingPlace.name}
  //             label={postingPlace.label}
  //             value={postingPlace.value}
  //             placeholder={postingPlace.placeholder}
  //             onChange={onChange}
  //             variant='standard'
  //           />
  //         }
  //       />
  //     </FormGroup>
  //     {/* <FormHelperText>You can display an error</FormHelperText> */}
  //   </FormControl>
  // );
};

export default PostingGroup;
