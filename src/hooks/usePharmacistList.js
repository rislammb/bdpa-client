import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

const getColumns = (isBn, user) => {
  return user
    ? [
        {
          id: 'regNumber',
          label: isBn ? 'নিবন্ধন সংখ্যা' : 'Reg Number',
          minWidth: 105,
        },
        {
          id: 'name',
          label: isBn ? 'নাম (English)' : 'Name (English)',
          minWidth: 130,
        },
        {
          id: 'bn_name',
          label: isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
          minWidth: 130,
        },
        {
          id: 'memberId',
          label: isBn ? 'সদস্য সনাক্তকারী' : 'Member ID',
          minWidth: 90,
        },
        {
          id: 'dateOfBirth',
          label: isBn ? 'জন্ম তারিখ' : 'Date of Birth',
          minWidth: 145,
        },
        {
          id: 'mainPosting',
          label: isBn ? 'মূল কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
          minWidth: 230,
        },
        {
          id: 'voterDistrict',
          label: isBn ? 'ভোটার জেলা' : 'Voter District',
          minWidth: 95,
        },
      ]
    : [
        {
          id: 'regNumber',
          label: isBn ? 'নিবন্ধন সংখ্যা' : 'Reg Number',
          minWidth: 105,
        },
        {
          id: 'name',
          label: isBn ? 'নাম (English)' : 'Name (English)',
          minWidth: 130,
        },
        {
          id: 'bn_name',
          label: isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
          minWidth: 130,
        },
        {
          id: 'memberId',
          label: isBn ? 'সদস্য সনাক্তকারী' : 'Member ID',
          minWidth: 90,
        },
        {
          id: 'mainPosting',
          label: isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
          minWidth: 130,
        },
        {
          id: 'voterDistrict',
          label: isBn ? 'ভোটার জেলা' : 'Voter District',
          minWidth: 95,
        },
      ];
};

const usePharmacistList = () => {
  const [searchParams] = useSearchParams();

  const {
    ui: { language },
    auth: { user },
    pharmacist: {
      loading,
      error,
      list,
      pharmacistsCount,
      totalPharmacistsCount,
    },
  } = useStoreState((state) => state);

  const { getPharmacistsData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isBn = language === 'BN' ? true : false;

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  useEffect(() => {
    getPharmacistsData(searchParams);
  }, [searchParams, getPharmacistsData]);

  useEffect(() => {
    document.title = isBn ? 'বিডিপিএ | সদস্য' : 'BDPA | Members';
  }, [isBn]);

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
    list,
    pharmacistsCount,
    totalPharmacistsCount,
    columns: getColumns(isBn, user),
    snackbar,
    handleSnackbarClose,
  };
};

export default usePharmacistList;
