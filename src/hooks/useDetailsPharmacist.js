import dayjs from 'dayjs';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBnDate } from '../helpers/date';
import { getAreaInfo, getBnAreaInfo } from '../helpers/utilities';

const createRow = (th, value, name, type, isEditable, textGroupFields) => ({
  th,
  td: value,
  name,
  type,
  isEditable,
  textGroupFields,
});

const getInitialRows = (user, isBn, isPermittedForEdit, isAdmin) => {
  if (user) {
    return [
      createRow('', '', 'imageUrl', '', isPermittedForEdit),
      createRow(
        isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
        '',
        'regNumber'
      ),
      createRow(
        isBn ? 'নাম (English)' : 'Name (English)',
        '',
        'name',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
        '',
        'bn_name',
        '',
        isPermittedForEdit
      ),
      createRow(isBn ? 'ইমেইল' : 'Email', '', 'email', '', isAdmin),
      createRow(
        isBn ? 'মোবাইল নাম্বার' : 'Mobile number',
        '',
        'mobile',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'পিতার নাম' : 'Fathers Name',
        '',
        'fathersName',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'মাতার নাম' : 'Mothers Name',
        '',
        'mothersName',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'লিঙ্গ' : 'Gender',
        '',
        'gender',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'জন্ম তারিখ' : 'Date of birth',
        '',
        'dateOfBirth',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'জাতীয় পরিচয়পত্র নাম্বার' : 'National ID',
        '',
        'nationalId',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'ইনস্টিটিউটের নাম' : 'Institute Name',
        '',
        'institute',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'পাশের বছর' : 'Passing year',
        '',
        'passingYear',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
        '',
        'memberId',
        '',
        isAdmin
      ),
      createRow(
        isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment',
        '',
        'jobDepertment',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'যোগদানের তারিখ' : 'Date of join',
        '',
        'dateOfJoin',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
        '',
        'mainPosting',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address',
        '',
        'permanentAddress',
        '',
        isPermittedForEdit
      ),
      createRow(
        isBn ? 'ভোটার জেলা' : 'Voter District',
        '',
        'voterArea',
        '',
        isAdmin
      ),
      createRow(
        isBn ? 'প্রেষনে/সংযুক্ত আছেন?' : 'On deputation/ attachment?',
        '',
        'onDeputation',
        '',
        isPermittedForEdit
      ),
    ];
  } else {
    return [
      createRow(
        isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
        '',
        'regNumber'
      ),
      createRow(isBn ? 'নাম (English)' : 'Name (English)', '', 'name'),
      createRow(isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)', '', 'bn_name'),
      createRow(isBn ? 'ইমেইল' : 'Email', '', 'email'),
      createRow(
        isBn ? 'সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
        '',
        'memberId'
      ),
      createRow(isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment', '', 'jobDepertment'),
      createRow(
        isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
        '',
        'mainPosting'
      ),
      createRow(isBn ? 'ভোটার জেলা' : 'Voter District', '', 'voterArea'),
    ];
  }
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
    getInitialRows(user, isBn, isPermittedForEdit, isAdmin)
  );

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, severity: snackbar.severity, text: '' });
  };

  const getPharmacistRows = (ph) => {
    let rows = [];

    if (user) {
      rows = [
        createRow('', ph.imageUrl, 'imageUrl', 'text', isPermittedForEdit),
        createRow(
          isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
          ph.regNumber,
          'regNumber',
          '',
          false
        ),
        createRow(
          isBn ? 'নাম (English)' : 'Name (English)',
          ph.name,
          'name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)',
          ph.bn_name,
          'bn_name',
          'text',
          isPermittedForEdit
        ),
        createRow(isBn ? 'ইমেইল' : 'Email', ph.email, 'email', 'text', isAdmin),
        createRow(
          isBn ? 'মোবাইল নাম্বার' : 'Mobile number',
          isBn ? ph.mobile?.bn_name ?? '' : ph.mobile?.name ?? '',
          'mobile',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'পিতার নাম' : 'Fathers Name',
          isBn ? ph.fathersName?.bn_name : ph.fathersName?.name,
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
          isBn ? ph.mothersName?.bn_name : ph.mothersName?.name,
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
          ph.gender?.id ? (isBn ? ph.gender?.bn_name : ph.gender?.name) : '',
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'জন্ম তারিখ' : 'Date of birth',
          ph.dateOfBirth
            ? isBn
              ? getBnDate(ph.dateOfBirth)
              : dayjs(ph.dateOfBirth).format('DD MMM YYYY')
            : '',
          'dateOfBirth',
          'date',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'জাতীয় পরিচয়পত্র নাম্বার' : 'National ID',
          isBn ? ph.nationalId?.bn_name : ph.nationalId?.name,
          'nationalId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'ইনস্টিটিউটের নাম' : 'Institute Name',
          isBn ? ph.institute?.bn_name : ph.institute?.name,
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
          isBn ? ph.passingYear?.bn_name : ph.passingYear?.name,
          'passingYear',
          'text',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
          ph.memberId || '',
          'memberId',
          'text',
          isAdmin
        ),
        createRow(
          isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment',
          ph.jobDepertment?.id
            ? isBn
              ? ph.jobDepertment?.bn_name
              : ph.jobDepertment?.name
            : '',
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'যোগদানের তারিখ' : 'Date of join',
          ph.dateOfJoin
            ? isBn
              ? getBnDate(ph.dateOfJoin)
              : dayjs(ph.dateOfJoin).format('DD MMM YYYY')
            : '',
          'dateOfJoin',
          'date',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
          isBn ? getBnAreaInfo(ph, 'posting') : getAreaInfo(ph, 'posting'),
          'mainPosting',
          'area',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'স্থায়ী ঠিকানা' : 'Permanent Address',
          isBn ? getBnAreaInfo(ph, 'permanent') : getAreaInfo(ph, 'permanent'),
          'permanentAddress',
          'area',
          isPermittedForEdit
        ),
        createRow(
          isBn ? 'ভোটার জেলা' : 'Voter District',
          isBn ? getBnAreaInfo(ph, 'voter') : getAreaInfo(ph, 'voter'),
          'voterArea',
          'area',
          isAdmin
        ),
        createRow(
          isBn ? 'প্রেষনে/সংযুক্ত আছেন?' : 'On deputation/ attachment?',
          isBn ? ph.onDeputation?.bn_name : ph.onDeputation?.name,
          'onDeputation',
          'select',
          isPermittedForEdit
        ),
      ];

      ph.onDeputation?.name === 'Yes' &&
        rows.push(
          createRow(
            isBn ? 'প্রেষন/সংযুক্ত কর্মস্থল' : 'Deputation/attachment posting',
            isBn
              ? getBnAreaInfo(ph, 'deputation')
              : getAreaInfo(ph, 'deputation'),
            'deputationPosting',
            'area',
            isPermittedForEdit
          )
        );
    } else {
      rows = [
        createRow(
          isBn ? 'বি-গ্রেড নিবন্ধন সংখ্যা' : 'Registration number',
          ph.regNumber,
          'regNumber'
        ),
        createRow(isBn ? 'নাম (English)' : 'Name (English)', ph.name, 'name'),
        createRow(isBn ? 'নাম (বাংলা)' : 'Name (বাংলা)', ph.bn_name, 'bn_name'),
        createRow(isBn ? 'ইমেইল' : 'Email', ph.email, 'email', 'text', isAdmin),
        createRow(
          isBn ? 'সদস্য সনাক্তকারী সংখ্যা' : 'BDPA member ID',
          ph.memberId || '',
          'memberId'
        ),
        createRow(
          isBn ? 'চাকুরীর বিভাগ' : 'Job Depertment',
          ph.jobDepertment?.id
            ? isBn
              ? ph.jobDepertment?.bn_name
              : ph.jobDepertment?.name
            : '',
          'jobDepertment'
        ),
        createRow(
          isBn ? 'বর্তমান কর্মস্থল/ঠিকানা' : 'Current Postiong/Address',
          isBn ? getBnAreaInfo(ph, 'posting') : getAreaInfo(ph, 'posting'),
          'mainPosting'
        ),
        createRow(
          isBn ? 'ভোটার জেলা' : 'Voter District',
          isBn ? getBnAreaInfo(ph, 'voter') : getAreaInfo(ph, 'voter'),
          'voterArea'
        ),
      ];
    }

    return rows;
  };

  useEffect(() => {
    if (pharmacist && pharmacist.regNumber === regNumber) {
      const rows = getPharmacistRows(pharmacist);
      if (rows) setTableRows(rows);
    } else
      setTableRows(getInitialRows(user, isBn, isPermittedForEdit, isAdmin));
  }, [user, regNumber, pharmacist, isBn]);

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
