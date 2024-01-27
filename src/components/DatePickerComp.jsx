import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

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
}) => (
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

export default DatePickerComp;

DatePickerComp.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disableFuture: PropTypes.bool,
  referenceDate: PropTypes.string,
  maxDate: PropTypes.string,
  openTo: PropTypes.string,
  views: PropTypes.array,
  error: PropTypes.object,
  helperText: PropTypes.string,
};
