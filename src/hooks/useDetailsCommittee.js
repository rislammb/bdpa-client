import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const columns = [
  { id: 'serialNumber', label: 'ক্রমিক', minWidth: 35 },
  { id: 'bn_name', label: 'নাম (বাংলায়)', minWidth: 190 },
  { id: 'postName', label: 'কমিটি পদবী', minWidth: 210 },
  { id: 'mobile', label: 'মোবাইল', minWidth: 90 },
  { id: 'posting', label: 'কর্মস্থল/ঠিকানা', minWidth: 330 },
];

const useDetailsCommittee = () => {
  const { committeePath } = useParams();
  const { loading, details } = useStoreState((state) => state.committee);
  const { getDetailsCommitteeData } = useStoreActions(
    (actions) => actions.committee
  );

  useEffect(() => {
    if (committeePath) getDetailsCommitteeData(committeePath);
  }, [committeePath]);

  return { loading, details, columns };
};

export default useDetailsCommittee;
