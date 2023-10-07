import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateId, objDeepClone } from '../helpers/utilities';
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

// add later

const initialMember = {
  serialNumber: {
    name: 'serialNumber',
    label: 'সিরিয়াল',
    value: '',
    placeholder: '০১',
  },
  postName: {
    name: 'postName',
    label: 'পদের নাম',
    value: '',
    placeholder: 'সভাপতি',
  },
  pharmacistId: {
    name: 'pharmacistId',
    label: 'ফার্মাসিস্ট',
    value: null,
    placeholder: 'আবদল্লাহ',
  },
};

const addMember = (initial = [], count = 1) => {
  for (let i = 0; i < count; i++) {
    initial.push({ id: generateId(), ...initialMember });
  }

  return initial;
};

// add later end

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
    const res = await addCommitteeData({
      ...value,
      members: mapMembersToValue(members),
    });

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

  // add later start
  const { list } = useStoreState((state) => state.pharmacist);
  const { getPharmacistsData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const [members, setMembers] = useState(addMember([], 7));

  const handleChange = (e, id) => {
    const { name, value } = e.target;

    const clonedState = objDeepClone(members);
    const index = clonedState.findIndex((item) => item.id === id);

    clonedState[index][name].value = value;

    setMembers(clonedState);
  };

  const addMemberRow = () => {
    const newMembers = addMember([...members], 1);

    setMembers(newMembers);
  };

  const deleteMemberRow = (id) => {
    const clonedState = objDeepClone(members);

    setMembers(clonedState.filter((item) => item.id !== id));
  };

  const defaultProps = {
    options: list,
    getOptionLabel: (option) => option.bn_name,
  };

  useEffect(() => {
    if (list.length < 1) getPharmacistsData();
  }, []);

  // add later end

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
    addMemberRow,
    members,
    handleChange,
    defaultProps,
    deleteMemberRow,
  };
};

export default useAddCommittee;

const mapMembersToValue = (members) => {
  return members.map((mem) => ({
    serialNumber: mem.serialNumber.value,
    postName: mem.postName.value,
    pharmacistId: mem.pharmacistId.value?._id,
  }));
};
