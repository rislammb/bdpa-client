import { divisions } from './divisions';

export const voterAreaFields = {
  voterDivision: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }, ...divisions],
    name: 'voterDivision',
    label: 'Voter Division',
    value: '0',
  },
  voterDistrict: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'voterDistrict',
    label: 'Voter District',
    value: '0',
  },
};
