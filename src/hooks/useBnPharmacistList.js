import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

const columns = [
  { id: 'regNumber', label: 'নিবন্ধ সংখ্যা', minWidth: 105 },
  { id: 'name', label: 'নাম (English)', minWidth: 130 },
  { id: 'bn_name', label: 'নাম (বাংলা)', minWidth: 130 },
  { id: 'memberId', label: 'সদস্য সনাক্তকারী', minWidth: 90 },
  { id: 'dateOfBirth', label: 'জন্ম তারিখ', minWidth: 110 },
  {
    id: 'mainPosting',
    label: 'মূল কর্মস্থল/ঠিকানা',
    minWidth: 230,
  },
  {
    id: 'voterDistrict',
    label: 'ভোটার জেলা',
    minWidth: 95,
  },
];

const useBnPharmacistList = () => {
  let { pageNumber } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(pageNumber) ?? 1);

  const { loading, list, filteredList } = useStoreState(
    (state) => state.pharmacist
  );
  const { getPharmacistsData } = useStoreActions(
    (actions) => actions.pharmacist
  );

  const rowsPerPage = 50;

  const handleChange = (_event, value) => {
    setPage(value);
    navigate(`/members/page/${value}`);
  };

  useEffect(() => {
    if (list.length < 1) {
      getPharmacistsData();
    }
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
    list,
    filteredList,
    columns,
    rowsPerPage,
    page,
    handleChange,
  };
};

export default useBnPharmacistList;
