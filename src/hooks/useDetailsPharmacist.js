import dayjs from 'dayjs';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

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
    ui: { language },
    auth: { user },
    pharmacist: { loading, details: pharmacist },
  } = useStoreState((state) => state);
  const { getDetailsPharmacistData, deletePharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const isBn = language === 'BN' ? true : false;

  const isPermittedForEdit =
    user?.roles?.includes('SUPER_ADMIN') ||
    user?.roles?.includes('ADMIN') ||
    user?.regNumber === regNumber;
  const isSuperAdmin = user?.roles?.includes('SUPER_ADMIN');

  useEffect(() => {
    if (pharmacist) {
      setShowDeputationRow(
        pharmacist.onDeputation?.name === 'Yes' ? true : false
      );

      const rows = [
        createRow(
          isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
          pharmacist.regNumber,
          'regNumber',
          '',
          false
        ),
        createRow(
          isBn ? 'নাম (English)' : 'Name (English)',
          pharmacist.name,
          'name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
          pharmacist.bn_name,
          'bn_name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'ইমেইল' : 'Email',
          pharmacist.email,
          'email',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'মোবাইল নাম্বার' : 'Mobile number',
          pharmacist.gender?.name === 'Male'
            ? isBn
              ? pharmacist.mobile?.bn_name
              : pharmacist.mobile?.name ?? ''
            : 'Hide now',
          'mobile',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'পিতার নাম' : 'Fathers Name',
          pharmacist.fathersName?.name && pharmacist.fathersName?.bn_name
            ? `${pharmacist.fathersName?.name} - ${pharmacist.fathersName?.bn_name}`
            : pharmacist.fathersName?.name
            ? pharmacist.fathersName?.name
            : pharmacist.fathersName?.bn_name ?? '',
          'fathersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'মাতার নাম' : 'Mothers Name',
          pharmacist.mothersName?.name && pharmacist.mothersName?.bn_name
            ? `${pharmacist.mothersName?.name} - ${pharmacist.mothersName?.bn_name}`
            : pharmacist.mothersName?.name
            ? pharmacist.mothersName?.name
            : pharmacist.mothersName?.bn_name ?? '',
          'mothersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'লিঙ্গ' : 'Gender',
          isBn ? pharmacist.gender?.bn_name : pharmacist.gender?.name,
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'জন্ম তারিখ' : 'Date of birth',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY'),
          'dateOfBirth',
          'date',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'জাতীয় পরিচয়পত্র নাম্বার' : 'National ID',
          isBn ? pharmacist.nationalId?.bn_name : pharmacist.nationalId?.name,
          'nationalId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'পাশের বছর' : 'Passing year',
          isBn ? pharmacist.passingYear?.bn_name : pharmacist.passingYear?.name,
          'passingYear',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'বিডিপিএ সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
          pharmacist.memberId || '',
          'memberId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment',
          isBn
            ? pharmacist.jobDepertment?.bn_name
            : pharmacist.jobDepertment?.name,
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'যোগদানের তারিখ' : 'Date of join',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY') || '',
          'dateOfJoin',
          'date',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'মূল কর্মস্থল/ঠিকানা' : 'Main posting/Address',
          isBn
            ? getBnAreaInfo(pharmacist, 'posting')
            : getAreaInfo(pharmacist, 'posting'),
          'mainPosting',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address',
          isBn
            ? getBnAreaInfo(pharmacist, 'permanent')
            : getAreaInfo(pharmacist, 'permanent'),
          'permanentAddress',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'ভোটার জেলা' : 'Voter District',
          isBn
            ? getBnAreaInfo(pharmacist, 'voter')
            : getAreaInfo(pharmacist, 'voter'),
          'voterArea',
          'select',
          isSuperAdmin
        ),
        createRow(
          isBn ? 'প্রেষনে/সংযুক্ত আছেন?' : 'On deputation/attachment?',
          isBn
            ? pharmacist.onDeputation?.bn_name
            : pharmacist.onDeputation?.name,
          'onDeputation',
          'select',
          isPermittedForEdit
        ),
      ];

      pharmacist.onDeputation?.name === 'Yes' &&
        rows.push(
          createRow(
            isBn ? 'প্রেষন/সংযুক্ত কর্মস্থল' : 'Deputation/attachment posting',
            isBn
              ? getBnAreaInfo(pharmacist, 'deputation')
              : getAreaInfo(pharmacist, 'deputation'),
            'deputationPosting',
            'select',
            isPermittedForEdit
          )
        );

      setTableRows(rows);
    } else setTableRows([]);
  }, [pharmacist, isPermittedForEdit, isBn]);

  useEffect(() => {
    if (showDeputationRow) {
      const row = createRow(
        isBn ? 'প্রেষন/সংযুক্ত কর্মস্থল' : 'Deputation/attachment posting',
        isBn
          ? getBnAreaInfo(pharmacist, 'deputation')
          : getAreaInfo(pharmacist, 'deputation'),
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
        isBn
          ? `আপনি কি সত্যিই মুছে ফেলতে চান '${pharmacist.bn_name} : ${pharmacist.regNumber}'?`
          : `Are you sure you want to delete '${pharmacist.name} : ${pharmacist.regNumber}'?`
      )
    ) {
      deletePharmacistData(regNumber);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (regNumber) {
      getDetailsPharmacistData(regNumber);
    }
  }, [regNumber]);

  return {
    loading,
    isBn,
    user,
    pharmacist,
    tableRows,
    showDeputationRow,
    setShowDeputationRow,
    handleDelete,
  };
};

export default useDetailsPharmacist;
