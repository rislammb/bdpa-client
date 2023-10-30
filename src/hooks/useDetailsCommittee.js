import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { committeeMemberFields } from '../constants/committeeMemberFields';
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
  const isBn = language === 'BN' ? true : false;
  const isPermittedForEdit =
    user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN');

  const columns = getColumns(isBn);
  if (isPermittedForEdit) columns.push({ id: 'delete', minWidth: '65px' });

  const {
    committee: { getDetailsCommitteeData, deleteCommitteeData },
    pharmacist: { getPharmacistsData },
    member: { setError, addMemberData },
  } = useStoreActions((actions) => actions);

  const [isAddMember, setIsAddMember] = useState(false);
  const [member, setMember] = useState({ ...committeeMemberFields });

  const toggleAddMember = () => {
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
      toggleAddMember();
      setMember({ ...committeeMemberFields });
      getDetailsCommitteeData(committeePath);
    }
  };

  const handleCommitteeDelete = () => {
    if (
      window.confirm(
        isBn
          ? `আপনি কি সত্যিই '${committee.bn_committeeTitle}' মুছতে চান?`
          : `Are you sure you want to delete '${committee.committeeTitle}'?`
      )
    ) {
      deleteCommitteeData(committeePath);
      navigate(-1);
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
    handleCommitteeDelete,
    member,
    defaultProps,
    isAddMember,
    toggleAddMember,
    handleMemberChange,
    handleMemberSubmit,
    error,
  };
};

export default useDetailsCommittee;
