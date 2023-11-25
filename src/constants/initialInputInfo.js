import { divisions } from './divisions';
import { jobDepertmentOptions } from './jobDepertment';

export const INITIAL_LOCATION_INFO = {
  locationType: {
    name: 'locationType',
    label: 'Location Type',
    bn_label: 'ঠিকানা বা এলাকার ধরন',
    value: 'all',
    options: [
      {
        id: 'all',
        name: 'All',
        bn_name: 'সব',
      },
      {
        id: '1',
        name: 'Present Posting/Address',
        bn_name: 'বর্তমান কর্মস্থল/ঠিকানা',
      },
      {
        id: '2',
        name: 'Voter Area',
        bn_name: 'ভোটার এলাকা',
      },
      {
        id: '3',
        name: 'Deputation Posting',
        bn_name: 'প্রেষন/সংযুক্ত কর্মস্থল',
      },
      {
        id: '4',
        name: 'Permanent Address',
        bn_name: 'স্থায়ী ঠিকানা',
      },
    ],
  },
  division: {
    name: 'division',
    label: 'Division',
    bn_label: 'বিভাগ',
    value: 'all',
    options: [{ id: 'all', name: 'All', bn_name: 'সব' }, ...divisions],
  },
  district: {
    name: 'district',
    label: 'District',
    bn_label: 'জেলা',
    value: 'all',
    options: [{ id: 'all', name: 'All', bn_name: 'সব' }],
  },
  upazila: {
    name: 'upazila',
    label: 'Upazila',
    bn_label: 'উপজেলা',
    value: 'all',
    options: [{ id: 'all', name: 'All', bn_name: 'সব' }],
  },
};

export const INITIAL_DEPERTMENT_INFO = {
  value: 'all',
  options: [
    {
      id: 'all',
      name: 'All',
      bn_name: 'সব',
    },
    ...jobDepertmentOptions,
  ],
};
