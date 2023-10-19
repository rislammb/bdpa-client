import { divisions } from './divisions';

export const addPermanentFields = {
  permanentDivision: {
    type: 'select',
    options: [
      { id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' },
      ...divisions,
    ],
    name: 'permanentDivision',
    label: 'Permanent Division',
    bn_label: 'স্থায়ী বিভাগ',
    value: '',
  },
  permanentDistrict: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'permanentDistrict',
    label: 'Permanent District',
    bn_label: 'স্থায়ী জেলা',
    value: '',
  },
  permanentUpazila: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'permanentUpazila',
    label: 'Permanent Upazila',
    bn_label: 'স্থায়ী উপজেলা',
    value: '',
  },
  permanentPlace: {
    type: 'text',
    name: 'permanentPlace',
    label: 'Permanent Place (English)',
    bn_label: 'স্থায়ী জায়গা (English)',
    placeholder: 'Village: Shantipur, Post: Sundorpur-9364',
    value: '',
  },
  bn_permanentPlace: {
    type: 'text',
    name: 'bn_permanentPlace',
    label: 'Permanent Place (বাংলা)',
    bn_label: 'স্থায়ী জায়গা (বাংলা)',
    placeholder: 'গ্রামঃ শান্তিপুর, ডাকঘরঃ সুন্দরপুর-৯৩৬৪',
    value: '',
  },
};
