import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const columns = [
  { id: 'committeeTitle', label: 'কমিটি', minWidth: 170 },
  { id: 'workHasStarted', label: 'কার্যক্রম শুরু', minWidth: 120 },
  { id: 'willExpire', label: 'মেয়াদ', minWidth: 90 },
];

const useCommitteeList = () => {
  const {
    committee: { loading, filteredList, searchTerm },
    auth: { user },
  } = useStoreState((state) => state);
  const { getCommitteesData, setSearchTerm } = useStoreActions(
    (actions) => actions.committee
  );

  useEffect(() => {
    getCommitteesData();
  }, []);

  return { loading, user, filteredList, columns, searchTerm, setSearchTerm };
};

export default useCommitteeList;
