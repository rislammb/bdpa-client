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
      },
      {
        id: '1',
        name: 'Main Posting',
      },
      {
        id: '2',
        name: 'Voter Area',
      },
      {
        id: '3',
        name: 'Deputation Posting',
      },
      {
        id: '4',
        name: 'Permanent Address',
      },
    ],
  },
  division: {
    name: 'division',
    label: 'Division',
    value: 'all',
    options: [{ id: 'all', name: 'All' }, ...divisions],
  },
  district: {
    name: 'district',
    label: 'District',
    value: 'all',
    options: [{ id: 'all', name: 'All' }],
  },
  upazila: {
    name: 'upazila',
    label: 'Upazila',
    value: 'all',
    options: [{ id: 'all', name: 'All' }],
  },
};

export const INITIAL_DEPERTMENT_INFO = {
  value: 'all',
  options: [
    {
      id: 'all',
      name: 'All',
    },
    ...jobDepertmentOptions,
  ],
};
