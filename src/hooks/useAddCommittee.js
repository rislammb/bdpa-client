import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { committeeMemberFields } from '../constants/committeeMemberFields';
import { generateId, getAreaInfo, objDeepClone } from '../helpers/utilities';

const initialCommitteeInfo = {
  committeeTitle: {
    label: 'Committee Name (English)',
    bn_label: 'কমিটির নাম (English)',
    name: 'committeeTitle',
    placeholder: 'Rajshahi District Committee',
    type: 'text',
    value: '',
  },
  bn_committeeTitle: {
    label: 'Committee Name (বাংলা)',
    bn_label: 'কমিটির নাম (বাংলা)',
    name: 'bn_committeeTitle',
    placeholder: 'রাজশাহী জেলা কমিটি',
    type: 'text',
    value: '',
  },
  workHasStarted: {
    label: 'Work has Started',
    bn_label: 'কার্যক্রম শুরু',
    name: 'workHasStarted',
    type: 'date',
    value: null,
  },
  willExpire: {
    label: 'Will Expire',
    bn_label: 'মেয়াদ',
    name: 'willExpire',
    type: 'date',
    value: null,
  },
  indexNumber: {
    label: 'Serial Index',
    bn_label: 'ক্রমিক ইনডেক্স',
    name: 'indexNumber',
    placeholder: '07',
    type: 'text',
    value: '',
  },
};

const addMember = (initial = [], count = 1) => {
  for (let i = 0; i < count; i++) {
    initial.push({ id: generateId(), ...committeeMemberFields });
  }

  return initial;
};

// start use committee hook
const useAddCommittee = () => {
  const navigate = useNavigate();

  const {
    ui: { language },
    committee: { submitting, error },
    pharmacist: { list },
  } = useStoreState((state) => state);
  const {
    pharmacist: { getPharmacistsData },
    committee: { addCommitteeData },
  } = useStoreActions((actions) => actions);

  const [committeeInfo, setCommitteeInfo] = useState(initialCommitteeInfo);
  const [members, setMembers] = useState(addMember([], 7));
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isBn = language === 'BN' ? true : false;

  const handleInfoChange = (e, name) => {
    const clonedState = objDeepClone(committeeInfo);

    if (name === 'workHasStarted' || name === 'willExpire') {
      clonedState[name].value = e;
    } else if (e.target.name === 'indexNumber') {
      clonedState[e.target.name].value = e.target.value.replace(/[^0-9]/g, '');
    } else {
      clonedState[e.target.name].value = e.target.value;
    }

    setCommitteeInfo(clonedState);
  };

  const handleMemberChange = (e, id) => {
    const { name, value } = e.target;

    const clonedState = objDeepClone(members);
    const index = clonedState.findIndex((item) => item.id === id);

    if (e.target.name === 'serialNumber') {
      clonedState[index][name].value = e.target.value.replace(/[^0-9]/g, '');
    } else {
      clonedState[index][name].value = value;
    }

    setMembers(clonedState);
  };

  const addMemberRow = () => {
    const newMembers = addMember([...members], 1);

    setMembers(newMembers);
  };

  const deleteMemberRow = (id) => {
    const clonedState = objDeepClone(members);

    if (clonedState.length > 2) {
      setMembers(clonedState.filter((item) => item.id !== id));
    }
  };

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addCommitteeData({
      ...mapStateToValue(committeeInfo),
      members: mapMembersToValue(members),
    });

    if (res) {
      navigate(`/committees/${res.committeePath}`);
    }
  };

  const defaultProps = {
    options: list,
    getOptionLabel: (option) =>
      `${option.bn_name} - ${option.name} - ${option.regNumber} - ${getAreaInfo(
        option,
        'posting'
      )}`,
  };

  useEffect(() => {
    if (typeof error?.message === 'string')
      setSnackbar({
        open: true,
        severity: 'error',
        text: error.message,
      });
  }, [submitting, error?.message]);

  useEffect(() => {
    if (list.length < 1) getPharmacistsData();
  }, []);

  return {
    isBn,
    committeeInfo,
    members,
    defaultProps,
    handleInfoChange,
    handleMemberChange,
    addMemberRow,
    deleteMemberRow,
    submitting,
    error,
    handleSubmit,
    snackbar,
    handleSnackbarClose,
  };
};

export default useAddCommittee;

const mapStateToValue = (state) =>
  Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur].value;

    return acc;
  }, {});

const mapMembersToValue = (members) => {
  return members.map((mem) => ({
    serialNumber: mem.serialNumber.value,
    postName: { name: mem.postName.value, bn_name: mem.bn_postName.value },
    pharmacistId: mem.pharmacistId.value?._id,
  }));
};
