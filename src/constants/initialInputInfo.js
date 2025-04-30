import { divisions } from './divisions';
import { jobDepartmentOptions } from './jobDepartment';

export const INITIAL_OPTIONS = [
  {
    id: 'all',
    name: 'All',
    bn_name: 'সব',
  },
];

export const LOCATION_TYPE_OPTIONS = [
  ...INITIAL_OPTIONS,
  {
    id: 'currentAddress',
    name: 'Current Posting/Address',
    bn_name: 'বর্তমান কর্মস্থল/ঠিকানা',
  },
  {
    id: 'voterArea',
    name: 'Voter Area',
    bn_name: 'ভোটার এলাকা',
  },
  {
    id: 'deputationPosting',
    name: 'Deputation Posting',
    bn_name: 'প্রেষন/সংযুক্ত কর্মস্থল',
  },
  {
    id: 'permanentAddress',
    name: 'Permanent Address',
    bn_name: 'স্থায়ী ঠিকানা',
  },
];

export const DIVISION_OPTIONS = [...INITIAL_OPTIONS, ...divisions];

export const DEPARTMENT_OPTIONS = [...INITIAL_OPTIONS, ...jobDepartmentOptions];
