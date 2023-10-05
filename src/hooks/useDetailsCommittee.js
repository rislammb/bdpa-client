import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { loading, details: committee } = useStoreState(
    (state) => state.committee
  );
  const { getDetailsCommitteeData, deleteCommitteeData } = useStoreActions(
    (actions) => actions.committee
  );

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete '${committee.committeeTitle}'?`
      )
    ) {
      deleteCommitteeData(committeePath);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (committeePath && committeePath !== committee?.committeePath)
      getDetailsCommitteeData(committeePath);
  }, [committeePath, committee?.committeePath]);

  return { loading, committee, columns, handleDelete };
};

export default useDetailsCommittee;
