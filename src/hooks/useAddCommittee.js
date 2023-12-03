import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialCommitteeInfo } from '../constants/InitialCommitteeInfo';
import { committeeMemberFields } from '../constants/committeeMemberFields';
import { changeHandlerForCommitteeInfo } from '../helpers/committee';
import { generateId, objDeepClone } from '../helpers/utilities';

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
  } = useStoreState((state) => state);
  const {
    committee: { addCommitteeData },
  } = useStoreActions((actions) => actions);

  const [committeeInfo, setCommitteeInfo] = useState(
    objDeepClone(initialCommitteeInfo)
  );
  const [members, setMembers] = useState(addMember([], 7));

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isBn = language === 'BN' ? true : false;

  const handleCommitteeInfoChange = (e, name) => {
    setCommitteeInfo(changeHandlerForCommitteeInfo(committeeInfo, e, name));
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

  useEffect(() => {
    if (!submitting && typeof error?.message === 'string')
      setSnackbar({
        open: true,
        severity: 'error',
        text: error.message,
      });
  }, [submitting, error?.message]);

  useEffect(() => {
    document.title = isBn ? 'বিডিপিএ | কমিটি যোগ' : 'BDPA | Add Committee';
  }, [isBn]);

  return {
    isBn,
    committeeInfo,
    members,
    handleCommitteeInfoChange,
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
