import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

const getColumns = (isBn) => [
  { id: 'committeeTitle', label: isBn ? 'কমিটি' : 'Committee', minWidth: 170 },
  {
    id: 'workHasStarted',
    label: isBn ? 'কার্যক্রম শুরু' : 'Work has started',
    minWidth: 120,
  },
  { id: 'willExpire', label: isBn ? 'মেয়াদ' : 'Will expire', minWidth: 90 },
];

const useCommitteeList = () => {
  const {
    ui: { language },
    auth: { user },
    committee: { loading, filteredList, searchTerm },
  } = useStoreState((state) => state);
  const { getCommitteesData, setSearchTerm } = useStoreActions(
    (actions) => actions.committee
  );
  const isBn = language === 'BN' ? true : false;

  useEffect(() => {
    getCommitteesData();
  }, []);

  return {
    loading,
    isBn,
    user,
    filteredList,
    columns: getColumns(isBn),
    searchTerm,
    setSearchTerm,
  };
};

export default useCommitteeList;
