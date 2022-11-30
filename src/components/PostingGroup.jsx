import { MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';

const PostingGroup = ({ postingInfo, onChange, label, error, style }) => {
  return (
    <FormControl
      sx={{
        m: 1,
        width: '33.33333ch',
        ...style,
      }}
      component='fieldset'
      variant='standard'
    >
      <FormLabel component='legend'>{label || ''}</FormLabel>
      <FormGroup>
        {postingInfo?.length > 0 &&
          postingInfo.map((field) => {
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
                        width: '100%',
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
                      sx={{ width: '100%' }}
                    />
                  }
                />
              );
          })}
      </FormGroup>
    </FormControl>
  );
};

export default PostingGroup;
