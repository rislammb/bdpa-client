import { divisions } from './divisions';

export const voterAreaFields = {
  voterDivision: {
    type: 'select',
    options: [
      { id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' },
      ...divisions,
    ],
    name: 'voterDivision',
    label: 'Voter Division',
    bn_label: 'ভোটার বিভাগ',
    value: '',
  },
  voterDistrict: {
    type: 'select',
    options: [{ id: '', name: '--- Select ---', bn_name: '--- নির্বাচন ---' }],
    name: 'voterDistrict',
    label: 'Voter District',
    bn_label: 'ভোটার জেলা',
    value: '',
  },
};
