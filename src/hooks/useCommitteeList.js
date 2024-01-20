import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const getColumns = (isBn) => [
  { id: 'committeeTitle', label: isBn ? 'কমিটি' : 'Committee', minWidth: 170 },
  {
    id: 'workHasStarted',
    label: isBn ? 'কার্যক্রম শুরু' : 'Work has started',
    minWidth: 120,
  },
  { id: 'willExpire', label: isBn ? 'মেয়াদ' : 'Will expire', minWidth: 120 },
];

const useCommitteeList = () => {
  const [searchParams] = useSearchParams();
  const {
    ui: { language },
    auth: { user },
    committee: { loading, error, list, committeesCount, totalCommitteesCount },
  } = useStoreState((state) => state);
  const { getCommitteesData } = useStoreActions((actions) => actions.committee);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isAdmin =
    user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN');
  const isBn = language === 'BN' ? true : false;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  useEffect(() => {
    document.title = isBn ? 'বিডিপিএ | কমিটি' : 'BDPA | Committees';
  }, [isBn]);

  useEffect(() => {
    getCommitteesData(searchParams);
  }, [searchParams, getCommitteesData]);

  useEffect(() => {
    if (!loading && error && typeof error === 'string') {
      setSnackbar({
        open: true,
        severity: 'error',
        text: error,
      });
    }
  }, [loading, error]);

  return {
    loading,
    isBn,
    isAdmin,
    list,
    columns: getColumns(isBn),
    snackbar,
    handleSnackbarClose,
    committeesCount,
    totalCommitteesCount,
  };
};

export default useCommitteeList;
