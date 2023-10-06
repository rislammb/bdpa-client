import { divisions } from './divisions';
import { jobDepertmentOptions } from './jobDepertment';

export const INITIAL_LOCATION_INFO = {
  locationType: {
    name: 'locationType',
    label: 'Location Type',
    value: 'all',
    options: [
      {
        id: 'all',
        name: 'All',
        name_bn: 'সব',
      },
      {
        id: '1',
        name: 'Main Posting/Address',
        name_bn: 'মূল কর্মস্থল/ঠিকানা',
      },
      {
        id: '2',
        name: 'Voter Area',
        name_bn: 'ভোটার এলাকা',
      },
      {
        id: '3',
        name: 'Deputation Posting',
        name_bn: 'প্রেষন/সংযুক্ত কর্মস্থল',
      },
      {
        id: '4',
        name: 'Permanent Address',
        name_bn: 'স্থায়ী ঠিকানা',
      },
    ],
  },
  division: {
    name: 'division',
    label: 'Division',
    value: 'all',
    options: [{ id: 'all', name: 'All', name_bn: 'সব', }, ...divisions],
  },
  district: {
    name: 'district',
    label: 'District',
    value: 'all',
    options: [{ id: 'all', name: 'All', name_bn: 'সব', }],
  },
  upazila: {
    name: 'upazila',
    label: 'Upazila',
    value: 'all',
    options: [{ id: 'all', name: 'All', name_bn: 'সব', }],
  },
};

export const INITIAL_DEPERTMENT_INFO = {
  value: 'all',
  options: [
    {
      id: 'all',
      name: 'All',
      name_bn: 'সব',
    },
    ...jobDepertmentOptions,
  ],
};
