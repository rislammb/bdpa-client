import dayjs from 'dayjs';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBnDate } from '../helpers/date';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

const createRow = (
  th,
  value,
  name,
  type,
  isEditable,
  textGroupFields,
  placeholder
) => ({
  th,
  td: value,
  name,
  type,
  isEditable,
  textGroupFields,
  placeholder,
});

const getPharmacistRows = ({
  user,
  pharmacist,
  isPermittedForEdit,
  isBn,
  isAdmin,
}) => {
  let rows = [];

  if (user) {
    rows = [
      createRow(
        '',
        pharmacist?.imageUrl || '',
        'imageUrl',
        'text',
        isPermittedForEdit,
        null,
        'https://bdpa.org/image/member7.jpg'
      ),
      createRow(
        isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
        pharmacist?.regNumber || '',
        'regNumber',
        '',
        false,
        null,
        'B-0123'
      ),
      createRow(
        isBn ? 'নাম (English)' : 'Name (English)',
        pharmacist?.name || '',
        'name',
        'text',
        isPermittedForEdit,
        null,
        'ABDULLAH'
      ),
      createRow(
        isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
        pharmacist?.bn_name || '',
        'bn_name',
        'text',
        isPermittedForEdit,
        null,
        'আবদুল্লাহ'
      ),
      createRow(
        isBn ? 'ইমেইল' : 'Email',
        pharmacist?.email || '',
        'email',
        'text',
        isAdmin,
        null,
        'abdullah@email.com'
      ),
      createRow(
        isBn ? 'মোবাইল নাম্বার' : 'Mobile number',
        pharmacist
          ? isBn
            ? pharmacist.mobile?.bn_name ?? ''
            : pharmacist.mobile?.name ?? ''
          : '',
        'mobile',
        'text',
        isPermittedForEdit,
        null,
        '01712123456'
      ),
      createRow(
        isBn ? 'পিতার নাম' : 'Fathers Name',
        pharmacist
          ? isBn
            ? pharmacist.fathersName?.bn_name
            : pharmacist.fathersName?.name
          : '',
        'fathersName',
        'textGroup',
        isPermittedForEdit,
        [
          {
            name: 'name',
            label: "Father's name (English)",
            bn_label: 'পিতার নাম (English)',
            placeholder: 'ABDUR RAHMAN',
          },
          {
            name: 'bn_name',
            label: "Father's name (বাংলা)",
            bn_label: 'পিতার নাম (বাংলা)',
            placeholder: 'আব্দুর রহমান',
          },
        ]
      ),
      createRow(
        isBn ? 'মাতার নাম' : 'Mothers Name',
        pharmacist
          ? isBn
            ? pharmacist.mothersName?.bn_name
            : pharmacist.mothersName?.name
          : '',
        'mothersName',
        'textGroup',
        isPermittedForEdit,
        [
          {
            name: 'name',
            label: "Mother's name (English)",
            bn_label: 'মায়ের নাম (English)',
            placeholder: 'AYESHA',
          },
          {
            name: 'bn_name',
            label: "Mother's name (বাংলা)",
            bn_label: 'মায়ের নাম (বাংলা)',
            placeholder: 'আয়েশা',
          },
        ]
      ),
      createRow(
        isBn ? 'লিঙ্গ' : 'Gender',
        pharmacist
          ? pharmacist.gender?.id
            ? isBn
              ? pharmacist.gender?.bn_name
              : pharmacist.gender?.name
            : ''
          : '',
        'gender',
        'select',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'জন্ম তারিখ' : 'Date of birth',
        pharmacist
          ? pharmacist.dateOfBirth
            ? isBn
              ? getBnDate(pharmacist.dateOfBirth)
              : dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY')
            : ''
          : '',
        'dateOfBirth',
        'date',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'জাতীয় পরিচয়পত্র নাম্বার' : 'National ID',
        pharmacist
          ? isBn
            ? pharmacist.nationalId?.bn_name
            : pharmacist.nationalId?.name
          : '',
        'nationalId',
        'text',
        isPermittedForEdit,
        null,
        '1372362372'
      ),
      createRow(
        isBn ? 'ইনস্টিটিউটের নাম' : 'Institute Name',
        pharmacist
          ? isBn
            ? pharmacist.institute?.bn_name
            : pharmacist.institute?.name
          : '',
        'institute',
        'textGroup',
        isPermittedForEdit,
        [
          {
            name: 'name',
            label: 'Institute Name (English)',
            bn_label: 'ইনস্টিটিউটের নাম (English)',
            placeholder: 'Institute of Health Technology, Rajshahi',
          },
          {
            name: 'bn_name',
            label: 'Institute Name (বাংলা)',
            bn_label: 'ইনস্টিটিউটের নাম (বাংলা)',
            placeholder: 'ইনস্টিটিউট অব হেলথ টেকনোলজি, রাজশাহী',
          },
        ]
      ),
      createRow(
        isBn ? 'পাশের বছর' : 'Passing year',
        pharmacist
          ? isBn
            ? pharmacist.passingYear?.bn_name
            : pharmacist.passingYear?.name
          : '',
        'passingYear',
        'text',
        isPermittedForEdit,
        null,
        '2012'
      ),
      createRow(
        isBn ? 'সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
        pharmacist?.memberId || '',
        'memberId',
        'text',
        isAdmin,
        null,
        'BDP00321'
      ),
      createRow(
        isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment',
        pharmacist
          ? pharmacist.jobDepertment?.id
            ? isBn
              ? pharmacist.jobDepertment?.bn_name
              : pharmacist.jobDepertment?.name
            : ''
          : '',
        'jobDepertment',
        'select',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'যোগদানের তারিখ' : 'Date of join',
        pharmacist
          ? pharmacist.dateOfJoin
            ? isBn
              ? getBnDate(pharmacist.dateOfJoin)
              : dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY')
            : ''
          : '',
        'dateOfJoin',
        'date',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
        pharmacist
          ? isBn
            ? getBnAreaInfo(pharmacist, 'posting')
            : getAreaInfo(pharmacist, 'posting')
          : '',
        'mainPosting',
        'area',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address',
        pharmacist
          ? isBn
            ? getBnAreaInfo(pharmacist, 'permanent')
            : getAreaInfo(pharmacist, 'permanent')
          : '',
        'permanentAddress',
        'area',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'ভোটার জেলা' : 'Voter District',
        pharmacist
          ? isBn
            ? getBnAreaInfo(pharmacist, 'voter')
            : getAreaInfo(pharmacist, 'voter')
          : '',
        'voterArea',
        'area',
        isAdmin
      ),
      createRow(
        isBn ? 'প্রেষনে/সংযুক্ত আছেন?' : 'On deputation/ attachment?',
        pharmacist
          ? isBn
            ? pharmacist.onDeputation?.bn_name
            : pharmacist.onDeputation?.name
          : '',
        'onDeputation',
        'select',
        isPermittedForEdit
      ),
    ];

    pharmacist &&
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
  } else {
    rows = [
      createRow(
        isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
        pharmacist?.regNumber || '',
        'regNumber'
      ),
      createRow(
        isBn ? 'নাম (English)' : 'Name (English)',
        pharmacist?.name || '',
        'name'
      ),
      createRow(
        isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
        pharmacist?.bn_name || '',
        'bn_name'
      ),
      createRow(
        isBn ? 'ইমেইল' : 'Email',
        pharmacist?.email || '',
        'email',
        'text',
        isAdmin
      ),
      createRow(
        isBn ? 'সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
        pharmacist?.memberId || '',
        'memberId'
      ),
      createRow(
        isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment',
        pharmacist
          ? pharmacist.jobDepertment?.id
            ? isBn
              ? pharmacist.jobDepertment?.bn_name
              : pharmacist.jobDepertment?.name
            : ''
          : '',
        'jobDepertment'
      ),
      createRow(
        isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
        pharmacist
          ? isBn
            ? getBnAreaInfo(pharmacist, 'posting')
            : getAreaInfo(pharmacist, 'posting')
          : '',
        'mainPosting'
      ),
      createRow(
        isBn ? 'ভোটার জেলা' : 'Voter District',
        pharmacist
          ? isBn
            ? getBnAreaInfo(pharmacist, 'voter')
            : getAreaInfo(pharmacist, 'voter')
          : '',
        'voterArea'
      ),
    ];
  }

  return rows;
};

const useDetailsPharmacist = () => {
  let { regNumber } = useParams();
  const navigate = useNavigate();

  const {
    ui: { language },
    auth: { user },
    pharmacist: { loading, details: pharmacist, submitting, error },
  } = useStoreState((state) => state);
  const { getDetailsPharmacistData, deletePharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );
  const isBn = language === 'BN' ? true : false;

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'info',
    text: '',
  });

  const isPermittedForEdit =
    user?.accountStatus === 'ACTIVE' &&
    (user.roles?.includes('SUPER_ADMIN') ||
      user.roles?.includes('ADMIN') ||
      user.regNumber === regNumber);

  const isAdmin =
    user?.accountStatus === 'ACTIVE' &&
    (user?.roles?.includes('SUPER_ADMIN') || user?.roles?.includes('ADMIN'));

  const [tableRows, setTableRows] = useState(
    getPharmacistRows({ user, isBn, isPermittedForEdit, isAdmin })
  );

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  useEffect(() => {
    if (pharmacist && pharmacist.regNumber === regNumber) {
      const rows = getPharmacistRows({
        user,
        pharmacist,
        isBn,
        isPermittedForEdit,
        isAdmin,
      });
      if (rows) setTableRows(rows);
    } else
      setTableRows(
        getPharmacistRows({ user, isBn, isPermittedForEdit, isAdmin })
      );
  }, [user, regNumber, pharmacist, isBn, isAdmin, isPermittedForEdit]);

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
    document.title = isBn ? `বিডিপিএ | ${regNumber}` : `BDPA | ${regNumber}`;
  }, [isBn, regNumber]);

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
    submitting,
    error,
    isBn,
    isAdmin,
    isPermittedForEdit,
    pharmacist,
    tableRows,
    handleDelete,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  };
};

export default useDetailsPharmacist;
