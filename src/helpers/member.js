export const initialMember = {
  serialNumber: {
    name: 'serialNumber',
    label: 'ক্রমিক',
    type: 'text',
    value: '',
    placeholder: '০১',
    sx: { width: '75px' },
  },
  postName: {
    name: 'postName',
    label: 'কমিটিতে পদের নাম',
    value: '',
    type: 'text',
    placeholder: 'সভাপতি',
    sx: { flex: '2' },
  },
  pharmacistId: {
    name: 'pharmacistId',
    label: 'ফার্মাসিস্ট',
    type: 'autocomplete',
    value: null,
    placeholder: 'আবদুল্লাহ',
    sx: { flex: '3' },
  },
};
