import { divisions } from './divisions';

export const addPostingFields = {
  postingDivision: {
    type: 'select',
    options: [
      { id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' },
      ...divisions,
    ],
    name: 'postingDivision',
    label: 'Posting Division',
    bn_label: 'কর্মস্থল/ঠিকানার বিভাগ',
    value: '',
  },
  postingDistrict: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'postingDistrict',
    label: 'Posting District',
    bn_label: 'কর্মস্থল/ঠিকানার জেলা',
    value: '',
  },
  postingUpazila: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'postingUpazila',
    label: 'Posting Upazila',
    bn_label: 'কর্মস্থল/ঠিকানার উপজেলা',
    value: '',
  },
  postingPlace: {
    type: 'text',
    name: 'postingPlace',
    label: 'Posting Place (English)',
    bn_label: 'কর্মস্থল/ঠিকানার স্থান (English)',
    placeholder: 'Modhupur Union Health and Family Welfare Center',
    value: '',
  },
  bn_postingPlace: {
    type: 'text',
    name: 'bn_postingPlace',
    label: 'Posting Place (বাংলা)',
    bn_label: 'কর্মস্থল/ঠিকানার স্থান (বাংলা)',
    placeholder: 'মধুপুর ইউনিয়ন স্বাস্থ্য ও পরিবার কলাণ কেন্দ্র',
    value: '',
  },
};
