import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const DatePickerComp = ({ name, label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture
        label={label}
        openTo='day'
        inputFormat='DD/MM/YYYY'
        views={['day', 'month', 'year']}
        value={dayjs(value)}
        onChange={(newValue) => onChange(newValue, name)}
        renderInput={(params) => (
          <TextField
            InputLabelProps={{ color: 'info' }}
            variant='standard'
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComp;
