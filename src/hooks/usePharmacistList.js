import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useStoreActions, useStoreState } from 'easy-peasy';

const columns = [
  { id: 'regNumber', label: 'Reg Number', minWidth: 105 },
  { id: 'name', label: 'Name (English)', minWidth: 130 },
  { id: 'bn_name', label: 'Name (বাংলা)', minWidth: 130 },
  { id: 'memberId', label: 'Member ID', minWidth: 90 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 110 },
  {
    id: 'mainPosting',
    label: 'Main postiong/Address',
    minWidth: 230,
  },
  {
    id: 'voterDistrict',
    label: 'Voter Area',
    minWidth: 95,
  },
];

const usePharmacistList = () => {
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

export default usePharmacistList;
