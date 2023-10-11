import dayjs from 'dayjs';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAreaInfo } from '../helpers/utilities';

const createRow = (th, value, name, type, edit) => ({
  th,
  td: value,
  name,
  type,
  edit,
});

const useDetailsPharmacist = () => {
  let { regNumber } = useParams();
  const navigate = useNavigate();
  const [showDeputationRow, setShowDeputationRow] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  const {
    auth: { user },
    pharmacist: { loading, details: pharmacist },
  } = useStoreState((state) => state);
  const { getDetailsPharmacistData, deletePharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );

  const isPermittedForEdit =
    user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN');

  useEffect(() => {
    if (pharmacist) {
      setShowDeputationRow(pharmacist.onDeputation === 'Yes' ? true : false);

      const rows = [
        createRow(
          'Registration number',
          pharmacist.regNumber || '',
          'regNumber',
          '',
          false
        ),
        createRow(
          'Name (English)',
          pharmacist.name || '',
          'name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Name (বাংলা)',
          pharmacist.bn_name || '',
          'bn_name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Email',
          pharmacist.email || '',
          'email',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Mobile number',
          pharmacist.gender === 'Male'
            ? pharmacist.mobile?.name ?? ''
            : 'Hide now',
          'mobile',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Fathers Name',
          pharmacist.fathersName?.name || '',
          'fathersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Mothers Name',
          pharmacist.mothersName?.name || '',
          'mothersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Gender',
          pharmacist.gender?.name || '',
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Date of birth',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY') || '',
          'dateOfBirth',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'National ID',
          pharmacist.nationalId?.name || '',
          'nationalId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Passing year',
          pharmacist.passingYear?.name || '',
          'passingYear',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'BDPA member ID',
          pharmacist.memberId || '',
          'memberId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Job Depertment',
          pharmacist.jobDepertment?.name || '',
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Date of join',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY') || '',
          'dateOfJoin',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'Main posting/Address',
          getAreaInfo(pharmacist, 'posting'),
          'mainPosting',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Permanent Address',
          getAreaInfo(pharmacist, 'permanent'),
          'permanentAddress',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Voter Area',
          getAreaInfo(pharmacist, 'voter'),
          'voterArea',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'On deputation/attachment',
          pharmacist.onDeputation?.name,
          'onDeputation',
          'select',
          isPermittedForEdit
        ),
      ];

      pharmacist.onDeputation?.name === 'Yes' &&
        rows.push(
          createRow(
            'Deputation/attachment posting',
            getAreaInfo(pharmacist, 'deputation'),
            'deputationPosting',
            'select',
            isPermittedForEdit
          )
        );

      setTableRows(rows);
    } else setTableRows([]);
  }, [pharmacist, isPermittedForEdit]);

  useEffect(() => {
    if (showDeputationRow) {
      const row = createRow(
        'Deputation/attachment posting',
        getAreaInfo(pharmacist, 'deputation'),
        'deputationPosting',
        'select',
        true
      );
      setTableRows([...tableRows, row]);
    } else {
      setTableRows((prevState) => {
        return prevState.filter((item) => item.name !== 'deputationPosting');
      });
    }
  }, [showDeputationRow]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete '${pharmacist.bn_name} : ${pharmacist.regNumber}'?`
      )
    ) {
      deletePharmacistData(regNumber);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (regNumber && regNumber !== pharmacist?.regNumber) {
      getDetailsPharmacistData(regNumber);
    }
  }, [regNumber, pharmacist?.regNumber]);

  return {
    loading,
    user,
    pharmacist,
    tableRows,
    showDeputationRow,
    setShowDeputationRow,
    handleDelete,
  };
};

export default useDetailsPharmacist;
