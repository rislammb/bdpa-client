import { divisions } from './divisions';

export const addDeputationFields = {
  deputationDivision: {
    type: 'select',
    options: [
      { id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' },
      ...divisions,
    ],
    name: 'deputationDivision',
    label: 'Deputation Division',
    bn_label: 'প্রেষন/সংযুক্তের বিভাগ',
    value: '',
  },
  deputationDistrict: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'deputationDistrict',
    label: 'Deputation District',
    bn_label: 'প্রেষন/সংযুক্তের জেলা',
    value: '',
  },
  deputationUpazila: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'deputationUpazila',
    label: 'Deputation Upazila',
    bn_label: 'প্রেষন/সংযুক্তের উপজেলা',
    value: '',
  },
  deputationPlace: {
    type: 'text',
    name: 'deputationPlace',
    label: 'Deputation Place (English)',
    bn_label: 'প্রেষন/সংযুক্তের জায়গা (English)',
    placeholder: 'Modhupur Sub Health Center',
    value: '',
  },
  bn_deputationPlace: {
    type: 'text',
    name: 'bn_deputationPlace',
    label: 'Deputation Place (বাংলা)',
    bn_label: 'প্রেষন/সংযুক্তের জায়গা (বাংলা)',
    placeholder: 'মধুপুর উপ স্বাস্থ্য কেন্দ্র',
    value: '',
  },
};
