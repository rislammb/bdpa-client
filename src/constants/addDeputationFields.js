import { divisions } from './divisions';

export const addDeputationFields = {
  deputationDivision: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }, ...divisions],
    name: 'deputationDivision',
    label: 'Deputation Division',
    value: '0',
  },
  deputationDistrict: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'deputationDistrict',
    label: 'Deputation District',
    value: '0',
  },
  deputationUpazila: {
    type: 'select',
    options: [{ id: '0', name: '--- Select ---' }],
    name: 'deputationUpazila',
    label: 'Deputation Upazila',
    value: '0',
  },
  deputationPlace: {
    type: 'text',
    name: 'deputationPlace',
    label: 'Deputation Place',
    placeholder: 'Auchpara Health and Family Welfare Center',
    value: '',
  },
};
