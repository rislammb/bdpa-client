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

  const { loading, details: pharmacist } = useStoreState(
    (state) => state.pharmacist
  );
  const { getDetailsPharmacistData, deletePharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );

  const isPermittedForEdit = false;

  useEffect(() => {
    if (pharmacist) {
      setShowDeputationRow(pharmacist.onDeputation === 'Yes' ? true : false);

      const rows = [
        createRow(
          'Registration Number',
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
          'Name (Bengali)',
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
          'Mobile',
          pharmacist.gender === 'Male' ? pharmacist.mobile : 'Hide now',
          'mobile',
          'text',
          isPermittedForEdit
        ),
        createRow(
          "Father's Name",
          pharmacist.fathersName || '',
          'fathersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          "Mother's Name",
          pharmacist.mothersName || '',
          'mothersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Gender',
          pharmacist.gender || '',
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Date of Birth',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY') || '',
          'dateOfBirth',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'National ID Number',
          pharmacist.nationalId || '',
          'nationalId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Passing Year',
          pharmacist.passingYear || '',
          'passingYear',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'BDPA Member ID',
          pharmacist.memberId || '',
          'memberId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Date of Join',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY') || '',
          'dateOfJoin',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'Job Depertment',
          pharmacist.jobDepertment || '',
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Main Posting/Address',
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
          'On Deputation/Attachment',
          pharmacist.onDeputation,
          'onDeputation',
          'select',
          isPermittedForEdit
        ),
      ];

      pharmacist.onDeputation === 'Yes' &&
        rows.push(
          createRow(
            'Deputation Posting/Address',
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
        'Deputation/Attachment Posting',
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
        `Are you sure you want to delete '${pharmacist.name} : ${pharmacist.regNumber}'?`
      )
    ) {
      deletePharmacistData(regNumber);
      navigate(-1);
    }
  };

  useEffect(() => {
    getDetailsPharmacistData(regNumber);
  }, [regNumber]);

  return {
    loading,
    pharmacist,
    tableRows,
    showDeputationRow,
    setShowDeputationRow,
    handleDelete,
  };
};

export default useDetailsPharmacist;
