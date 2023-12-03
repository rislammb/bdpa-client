import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  let { pageNumber } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(pageNumber) ?? 1);

  const {
    ui: { language },
    auth: { user },
    pharmacist: {
      loading,
      error,
      searchTerm,
      locationInfo,
      jobDepertmentInfo,
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
  const rowsPerPage = 50;

  const handleChange = (_event, value) => {
    setPage(value);
    navigate(`/members/page/${value}`);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  useEffect(() => {
    navigate(`/members/page/1`);
  }, [searchTerm]);

  useEffect(() => {
    const locationFilter = Object.keys(locationInfo).reduce((acc, cur) => {
      acc[cur] = locationInfo[cur]?.value;
      return acc;
    }, {});

    getPharmacistsData({
      locationFilter,
      depertmentFilter: jobDepertmentInfo.value,
      searchTerm,
      pageNumber,
    });
  }, [pageNumber, searchTerm, locationInfo, jobDepertmentInfo]);

  useEffect(() => {
    setPage(Number(pageNumber) ?? 1);
  }, [pageNumber]);

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
    isBn,
    list,
    pharmacistsCount,
    totalPharmacistsCount,
    columns: getColumns(isBn, user),
    rowsPerPage,
    page,
    handleChange,
    snackbar,
    handleSnackbarClose,
  };
};

export default usePharmacistList;
