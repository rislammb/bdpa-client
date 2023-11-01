import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialCommitteeInfo } from '../constants/InitialCommitteeInfo';
import { committeeMemberFields } from '../constants/committeeMemberFields';
import { changeHandlerForCommitteeInfo } from '../helpers/committee';
import { getAreaInfo, getBnAreaInfo, objDeepClone } from '../helpers/utilities';

const getColumns = (isBn) => [
  { id: 'serialNumber', label: isBn ? 'ক্রমিক' : 'Serial', minWidth: 35 },
  {
    id: isBn ? 'bn_name' : 'name',
    label: isBn ? 'নাম (বাংলা)' : 'Name (Enslish)',
    minWidth: 150,
  },
  {
    id: 'postName',
    label: isBn ? 'কমিটি পদবী' : 'Committee post',
    minWidth: 150,
  },
  { id: 'mobile', label: isBn ? 'মোবাইল' : 'Mobile', minWidth: 90 },
  {
    id: isBn ? 'bn_posting' : 'posting',
    label: isBn ? 'মূল কর্মস্থল/ঠিকানা' : 'Main posting/address',
    minWidth: 280,
  },
];

const useDetailsCommittee = () => {
  const { committeePath } = useParams();
  const navigate = useNavigate();

  const {
    ui: { language },
    auth: { user },
    committee: { loading, details: committee },
    pharmacist: { list },
    member: { error },
  } = useStoreState((state) => state);
  const {
    committee: {
      getDetailsCommitteeData,
      updateCommitteeData,
      deleteCommitteeData,
    },
    pharmacist: { getPharmacistsData },
    member: { setError, addMemberData },
  } = useStoreActions((actions) => actions);

  const [isEditCommittee, setIsEditCommittee] = useState(false);
  const [committeeInfo, setCommitteeInfo] = useState(null);
  const [isAddMember, setIsAddMember] = useState(false);
  const [member, setMember] = useState({ ...committeeMemberFields });
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isBn = language === 'BN' ? true : false;
  const isPermittedForEdit =
    user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN');

  const columns = getColumns(isBn);
  if (isPermittedForEdit) columns.push({ id: 'delete', minWidth: '65px' });

  const toggleIsEditCommitttee = () => {
    if (isEditCommittee) {
      setIsEditCommittee(false);
      setCommitteeInfo(null);
    } else {
      setIsEditCommittee(true);
      Object.keys(initialCommitteeInfo).forEach((key) => {
        if (key === 'indexNumber') {
          initialCommitteeInfo[key].value = committee[key]?.name;
        } else {
          initialCommitteeInfo[key].value = committee[key];
        }
      });

      setCommitteeInfo(initialCommitteeInfo);
    }
  };

  const handleCommitteeInfoChange = (e, name) => {
    setCommitteeInfo(changeHandlerForCommitteeInfo(committeeInfo, e, name));
  };

  const handleCommitteeSubmit = async () => {
    const res = await updateCommitteeData({
      committeePath: committee.committeePath,
      data: mapStateToValue(committeeInfo),
    });

    if (res) {
      setIsEditCommittee(false);
      navigate(`/committees/${res.committeePath}`);
      if (res.committeePath === committeePath) {
        getDetailsCommitteeData(res.committeePath);
      }
    }
  };

  const toggleIsAddMember = () => {
    setIsAddMember(!isAddMember);
    setError(null);
  };

  const handleMemberChange = (e) => {
    const { name, value } = e.target;

    const clonedState = objDeepClone(member);
    if (name === 'serialNumber') {
      clonedState[name].value = value.replace(/[^0-9]/g, '');
    } else {
      clonedState[name].value = value;
    }
    setMember(clonedState);
  };

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  const handleMemberSubmit = async () => {
    const data = await addMemberData({
      committeeId: committee._id,
      serialNumber: member.serialNumber.value,
      postName: {
        name: member.postName.value,
        bn_name: member.bn_postName.value,
      },
      pharmacistId: member.pharmacistId.value?._id,
    });

    if (data) {
      toggleIsAddMember();
      setMember({ ...committeeMemberFields });
      getDetailsCommitteeData(committeePath);

      setSnackbar({
        open: true,
        severity: 'success',
        text: isBn ? 'সদস্য সফলভাবে যোগ হয়েছে।' : 'Member added successfully.',
      });
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        text: isBn ? 'সদস্য যোগ করতে ব্যর্থ!' : 'Add member failed!',
      });
    }
  };

  const handleCommitteeDelete = async () => {
    if (
      window.confirm(
        isBn
          ? `আপনি কি সত্যিই কমিটিঃ '${committee.bn_committeeTitle}' মুছতে চান?`
          : `Are you sure you want to delete committee: '${committee.committeeTitle}'?`
      )
    ) {
      const res = await deleteCommitteeData(committeePath);
      if (res) navigate('/committees');
    }
  };

  const defaultProps = {
    options: list,
    getOptionLabel: (option) =>
      isBn
        ? `${option.bn_name} - ${option.name} - ${
            option.regNumber
          } - ${getAreaInfo(option, 'posting')}`
        : `${option.name} - ${option.bn_name} - ${
            option.regNumber
          } - ${getBnAreaInfo(option, 'posting')}`,
  };

  useEffect(() => {
    if (list.length < 1) getPharmacistsData();
  }, []);

  useEffect(() => {
    if (committeePath) getDetailsCommitteeData(committeePath);
  }, [committeePath]);

  return {
    loading,
    isBn,
    user,
    isPermittedForEdit,
    committee,
    columns,
    isEditCommittee,
    toggleIsEditCommitttee,
    committeeInfo,
    handleCommitteeInfoChange,
    handleCommitteeSubmit,
    handleCommitteeDelete,
    isAddMember,
    toggleIsAddMember,
    member,
    defaultProps,
    handleMemberChange,
    handleMemberSubmit,
    error,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  };
};

export default useDetailsCommittee;

const mapStateToValue = (state) =>
  Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur].value;

    return acc;
  }, {});
