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
          'বি-গ্রেড নিবন্ধ সংখ্যা',
          pharmacist.regNumber || '',
          'regNumber',
          '',
          false
        ),
        createRow(
          'নাম (English)',
          pharmacist.name || '',
          'name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'নাম (বাংলা)',
          pharmacist.bn_name || '',
          'bn_name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'ইমেইল',
          pharmacist.email || '',
          'email',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'মোবাইল',
          pharmacist.gender === 'Male' ? pharmacist.mobile : 'Hide now',
          'mobile',
          'text',
          isPermittedForEdit
        ),
        createRow(
          "পিতার নাম",
          pharmacist.fathersName || '',
          'fathersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          "মাতার নাম",
          pharmacist.mothersName || '',
          'mothersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'লিঙ্গ',
          pharmacist.gender || '',
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'জন্ম তারিখ',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY') || '',
          'dateOfBirth',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'জাতীয় পরিচয়পত্র সংখ্যা',
          pharmacist.nationalId || '',
          'nationalId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'পাশের বছর',
          pharmacist.passingYear || '',
          'passingYear',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'বিডিপিএ সদস্য সনাক্তকারী সংখ্যা',
          pharmacist.memberId || '',
          'memberId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'চাকুরীর বিভাগ',
          pharmacist.jobDepertment || '',
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'যোগদানের তারিখ',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY') || '',
          'dateOfJoin',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'মূল কর্মস্থল/ঠিকানা',
          getAreaInfo(pharmacist, 'posting'),
          'mainPosting',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'স্থায়ী ঠিকানা',
          getAreaInfo(pharmacist, 'permanent'),
          'permanentAddress',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'ভোটার এলাকা',
          getAreaInfo(pharmacist, 'voter'),
          'voterArea',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'প্রেষনে/সংযুক্ত আছেন?',
          pharmacist.onDeputation,
          'onDeputation',
          'select',
          isPermittedForEdit
        ),
      ];

      pharmacist.onDeputation === 'Yes' &&
        rows.push(
          createRow(
            'প্রেষন/সংযুক্ত কর্মস্থল',
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
        'প্রেষন/সংযুক্ত কর্মস্থল',
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
        `আপনি কি সত্যিই মুছে ফেলতে চান '${pharmacist.bn_name} : ${pharmacist.regNumber}'?`
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
    pharmacist,
    tableRows,
    showDeputationRow,
    setShowDeputationRow,
    handleDelete,
  };
};

export default useDetailsPharmacist;
