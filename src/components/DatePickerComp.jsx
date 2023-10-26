import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const DatePickerComp = ({
  name,
  label,
  value,
  onChange,
  disableFuture,
  referenceDate,
  maxDate,
  openTo = 'day',
  views = ['day', 'month', 'year'],
  error,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value && dayjs(value)}
        onChange={(newValue) => onChange(newValue, name)}
        openTo={openTo}
        views={views}
        disableFuture={disableFuture}
        referenceDate={referenceDate && dayjs(referenceDate)}
        maxDate={maxDate && dayjs(maxDate)}
        slotProps={{
          textField: {
            variant: 'standard',
            InputLabelProps: { color: 'info' },
            error,
            helperText,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComp;
