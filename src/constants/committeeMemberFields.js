export const committeeMemberFields = {
  serialNumber: {
    name: 'serialNumber',
    label: 'Serial',
    bn_label: 'ক্রমিক',
    type: 'text',
    value: '',
    placeholder: '01',
    sx: { width: '75px' },
  },
  postName: {
    name: 'postName',
    label: 'Post Name (English)',
    bn_label: 'পদের নাম (English)',
    value: '',
    type: 'text',
    placeholder: 'Chirman',
    sx: { flex: '2' },
  },
  bn_postName: {
    name: 'bn_postName',
    label: 'Post Name (বাংলা)',
    bn_label: 'পদের নাম (বাংলা)',
    value: '',
    type: 'text',
    placeholder: 'সভাপতি',
    sx: { flex: '2' },
  },
  pharmacistId: {
    name: 'pharmacistId',
    label: 'Pharmacist',
    bn_label: 'ফার্মাসিস্ট',
    type: 'autocomplete',
    value: null,
    placeholder: 'আবদুল্লাহ',
    sx: { flex: '3' },
  },
};
