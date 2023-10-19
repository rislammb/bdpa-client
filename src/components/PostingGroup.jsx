import { MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { useStoreState } from 'easy-peasy';

const PostingGroup = ({ postingInfo, onChange, label, error, style }) => {
  const { language } = useStoreState((state) => state.ui);
  const isBn = language === 'BN' ? true : false;

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
                      label={isBn ? field.bn_label : field.label}
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
                            {isBn ? option.bn_name : option.name}
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
                      label={isBn ? field.bn_label : field.label}
                      value={field.value}
                      error={error && error[field.name] ? true : false}
                      helperText={
                        error && error[field.name] ? error[field.name] : ''
                      }
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
