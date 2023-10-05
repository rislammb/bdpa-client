import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';

const initial = {
  committeeTitle: {
    value: '',
    label: 'কমিটির নাম',
    placeholder: 'রাজশাহী জেলা কমিটি',
  },
  workHasStarted: { value: null, type: 'date', label: 'কার্যক্রম শুরু' },
  willExpire: { value: null, type: 'date', label: 'মেয়াদ' },
  indexNumber: {
    value: '',
    label: 'ক্রমিক ইনডেক্স',
    placeholder: '07',
  },
};

const validate = (obj) => {
  const err = {};

  Object.keys(obj).forEach((key) => {
    if (key === 'committeeTitle') {
      if (obj[key].length < 5) {
        err[key] = 'Committee Title must be at least 5 characters long!';
      }
    }
  });

  return {
    valid: Object.keys(err).length < 1,
    data: Object.keys(err).length < 1 ? obj : err,
  };
};

const useAddCommittee = () => {
  const navigate = useNavigate();
  const { state, onFocus, onChange, onBlur, onSubmit } = useForm(
    initial,
    validate
  );
  const { submitting, error } = useStoreState((state) => state.committee);
  const { addCommitteeData } = useStoreActions((action) => action.committee);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  const handleSubmit = async (value) => {
    const res = await addCommitteeData(value);

    if (res) {
      navigate(`/committees/${res.committeePath}`);
    } else if (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        text: 'Committee add to databse faild!.',
      });
    }
  };

  return {
    state,
    onFocus,
    onChange,
    onBlur,
    onSubmit,
    submitting,
    error,
    handleSubmit,
    snackbar,
    handleSnackbarClose,
  };
};

export default useAddCommittee;
