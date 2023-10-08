import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialMember } from '../helpers/member';
import { getAreaInfo, objDeepClone } from '../helpers/utilities';

const columns = [
  { id: 'serialNumber', label: 'ক্রমিক', minWidth: 35 },
  { id: 'bn_name', label: 'নাম (বাংলায়)', minWidth: 190 },
  { id: 'postName', label: 'কমিটি পদবী', minWidth: 210 },
  { id: 'mobile', label: 'মোবাইল', minWidth: 90 },
  { id: 'posting', label: 'কর্মস্থল/ঠিকানা', minWidth: 330 },
];

const useDetailsCommittee = () => {
  const { committeePath } = useParams();
  const navigate = useNavigate();

  const {
    committee: { loading, details: committee },
    pharmacist: { list },
    member: { error },
  } = useStoreState((state) => state);
  const {
    committee: { getDetailsCommitteeData, deleteCommitteeData },
    pharmacist: { getPharmacistsData },
    member: { addMemberData },
  } = useStoreActions((actions) => actions);

  const [isAddMember, setIsAddMember] = useState(false);
  const [member, setMember] = useState({ ...initialMember });

  const toggleAddMember = () => setIsAddMember(!isAddMember);

  const handleMemberChange = (e) => {
    const { name, value } = e.target;

    const clonedState = objDeepClone(member);

    clonedState[name].value = value;

    setMember(clonedState);
  };

  const handleMemberSubmit = async () => {
    const data = await addMemberData({
      committeeId: committee._id,
      serialNumber: member.serialNumber.value,
      postName: member.postName.value,
      pharmacistId: member.pharmacistId.value?._id,
    });

    if (data) {
      toggleAddMember();
      setMember({ ...initialMember });
      getDetailsCommitteeData(committeePath);
    }
  };

  const handleCommitteeDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete '${committee.committeeTitle}'?`
      )
    ) {
      deleteCommitteeData(committeePath);
      navigate(-1);
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
    if (list.length < 1) getPharmacistsData();
  }, []);

  useEffect(() => {
    if (committeePath && committeePath !== committee?.committeePath)
      getDetailsCommitteeData(committeePath);
  }, [committeePath, committee?.committeePath]);

  return {
    loading,
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
