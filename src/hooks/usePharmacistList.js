import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

const getColumns = (isBn) => [
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
    minWidth: 110,
  },
  {
    id: 'mainPosting',
    label: isBn ? 'মূল কর্মস্থল/ঠিকানা' : 'Main postiong/Address',
    minWidth: 230,
  },
  {
    id: 'voterDistrict',
    label: isBn ? 'ভোটার জেলা' : 'Voter District',
    minWidth: 95,
  },
];

const usePharmacistList = () => {
  let { pageNumber } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(pageNumber) ?? 1);

  const {
    ui: { language },
    pharmacist: { loading, list, filteredList },
  } = useStoreState((state) => state);
  const { getPharmacistsData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const isBn = language === 'BN' ? true : false;

  const rowsPerPage = 50;

  const handleChange = (_event, value) => {
    setPage(value);
    navigate(`/members/page/${value}`);
  };

  useEffect(() => {
    getPharmacistsData();
  }, []);

  useEffect(() => {
    if (filteredList.length !== list.length) {
      navigate(`/members/page/1`);
    }
  }, [list.length, filteredList.length]);

  useEffect(() => {
    setPage(Number(pageNumber) ?? 1);
  }, [pageNumber]);

  return {
    loading,
    isBn,
    list,
    filteredList,
    columns: getColumns(isBn),
    rowsPerPage,
    page,
    handleChange,
  };
};

export default usePharmacistList;
