import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const columns = [
  { id: 'committeeTitle', label: 'কমিটি', minWidth: 170 },
  { id: 'workHasStarted', label: 'কার্যক্রম শুরু', minWidth: 120 },
  { id: 'willExpire', label: 'মেয়াদ', minWidth: 90 },
];

const useCommitteeList = () => {
  const { loading, filteredList, searchTerm } = useStoreState(
    (state) => state.committee
  );
  const { getCommitteesData, setSearchTerm } = useStoreActions(
    (actions) => actions.committee
  );

  useEffect(() => {
    getCommitteesData();
  }, []);

  return { loading, filteredList, columns, searchTerm, setSearchTerm };
};

export default useCommitteeList;
