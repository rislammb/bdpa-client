import dayjs from 'dayjs';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBnDate } from '../helpers/date';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

const createRow = (th, value, name, type, isEdit, textGroupFields) => ({
  th,
  td: value,
  name,
  type,
  isEdit,
  textGroupFields,
});

const useDetailsPharmacist = () => {
  let { regNumber } = useParams();
  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const {
    ui: { language },
    auth: { user },
    pharmacist: { loading, details: pharmacist, submitting, error },
  } = useStoreState((state) => state);
  const { getDetailsPharmacistData, deletePharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const isBn = language === 'BN' ? true : false;

  const isPermittedForEdit =
    user?.accountStatus === 'ACTIVE' &&
    (user.roles?.includes('SUPER_ADMIN') ||
      user.roles?.includes('ADMIN') ||
      user.regNumber === regNumber);

  const isAdmin =
    user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  useEffect(() => {
    if (pharmacist) {
      const rows = [
        createRow(
          '',
          pharmacist.imageUrl,
          'imageUrl',
          'text',
          isPermittedForEdit
        ),
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
          isAdmin
        ),
        createRow(
          isBn ? 'মোবাইল নাম্বার' : 'Mobile number',
          pharmacist.gender?.name === 'Male' || isPermittedForEdit
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
          isBn ? pharmacist.fathersName?.bn_name : pharmacist.fathersName?.name,
          'fathersName',
          'textGroup',
          isPermittedForEdit,
          [
            {
              name: 'name',
              label: "Father's name (English)",
              bn_label: 'পিতার নাম (English)',
            },
            {
              name: 'bn_name',
              label: "Father's name (বাংলা)",
              bn_label: 'পিতার নাম (বাংলা)',
            },
          ]
        ),
        createRow(
          isBn ? 'মাতার নাম' : 'Mothers Name',
          isBn ? pharmacist.mothersName?.bn_name : pharmacist.mothersName?.name,
          'mothersName',
          'textGroup',
          isPermittedForEdit,
          [
            {
              name: 'name',
              label: "Mother's name (English)",
              bn_label: 'মায়ের নাম (English)',
            },
            {
              name: 'bn_name',
              label: "Mother's name (বাংলা)",
              bn_label: 'মায়ের নাম (বাংলা)',
            },
          ]
        ),
        createRow(
          isBn ? 'লিঙ্গ' : 'Gender',
          pharmacist.gender.id
            ? isBn
              ? pharmacist.gender?.bn_name
              : pharmacist.gender?.name
            : '',
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'জন্ম তারিখ' : 'Date of birth',
          pharmacist.dateOfBirth
            ? isBn
              ? getBnDate(pharmacist.dateOfBirth)
              : dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY')
            : '',
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
          isBn ? 'ইনস্টিটিউটের নাম' : 'Institute Name',
          isBn ? pharmacist.institute?.bn_name : pharmacist.institute?.name,
          'institute',
          'textGroup',
          isPermittedForEdit,
          [
            {
              name: 'name',
              label: 'Institute Name (English)',
              bn_label: 'ইনস্টিটিউটের নাম (English)',
            },
            {
              name: 'bn_name',
              label: 'Institute Name (বাংলা)',
              bn_label: 'ইনস্টিটিউটের নাম (বাংলা)',
            },
          ]
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
          pharmacist.jobDepertment.id
            ? isBn
              ? pharmacist.jobDepertment?.bn_name
              : pharmacist.jobDepertment?.name
            : '',
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'যোগদানের তারিখ' : 'Date of join',
          pharmacist.dateOfJoin
            ? isBn
              ? getBnDate(pharmacist.dateOfJoin)
              : dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY')
            : '',
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
          'area',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address',
          isBn
            ? getBnAreaInfo(pharmacist, 'permanent')
            : getAreaInfo(pharmacist, 'permanent'),
          'permanentAddress',
          'area',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'ভোটার জেলা' : 'Voter District',
          isBn
            ? getBnAreaInfo(pharmacist, 'voter')
            : getAreaInfo(pharmacist, 'voter'),
          'voterArea',
          'area',
          isAdmin
        ),
        createRow(
          isBn ? 'প্রেষনে/সংযুক্ত আছেন?' : 'On deputation/ attachment?',
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
            'area',
            isPermittedForEdit
          )
        );

      setTableRows(rows);
    } else setTableRows([]);
  }, [pharmacist, isPermittedForEdit, isAdmin, isBn]);

  const handleDelete = async () => {
    if (
      window.confirm(
        isBn
          ? `আপনি কি সত্যিই মুছে ফেলতে চান '${pharmacist.bn_name} : ${pharmacist.regNumber}'?`
          : `Are you sure you want to delete '${pharmacist.name} : ${pharmacist.regNumber}'?`
      )
    ) {
      const res = await deletePharmacistData(regNumber);
      if (res) navigate(-1);
    }
  };

  useEffect(() => {
    if (regNumber) {
      getDetailsPharmacistData(regNumber);
    }
  }, [regNumber]);

  useEffect(() => {
    if (!loading && !submitting && error && typeof error === 'string') {
      setSnackbar({
        open: true,
        severity: 'error',
        text: error,
      });
    }
  }, [loading, submitting, error]);

  return {
    loading,
    error,
    isBn,
    isAdmin,
    pharmacist,
    tableRows,
    handleDelete,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  };
};

export default useDetailsPharmacist;
