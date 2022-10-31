import { genderOptions } from '../constants/addFormFields';
import { depertmentOptions } from '../constants/depertmentOptions';
import { districts } from '../constants/districts';
import { divisions } from '../constants/divisions';
import { upazilas } from '../constants/upazilas';

export const arraySortByDate = (array) => {
  return array
    .sort((a, b) =>
      a.dateOfJoin > b.dateOfJoin ? 1 : a.dateOfJoin < b.dateOfJoin ? -1 : 0
    )
    .sort((a, b) =>
      a.dateOfBirth > b.dateOfBirth ? 1 : a.dateOfBirth < b.dateOfBirth ? -1 : 0
    );
};

export const pharmacistFromState = (
  formFields,
  postingFields,
  voterArea,
  onDeputation,
  deputationFields
) => {
  const formValues = Object.keys(formFields).reduce((acc, cur) => {
    if (cur === 'gender') {
      const gender = genderOptions.find(
        (item) => item.id === formFields[cur].value
      );
      acc[cur] = gender ? gender.name : '';
    } else if (cur === 'jobDepertment') {
      const depertment = depertmentOptions.find(
        (item) => item.id === formFields[cur].value
      );
      acc[cur] = depertment ? depertment.name : '';
    } else acc[cur] = formFields[cur].value;
    return acc;
  }, {});

  const postingValues = Object.keys(postingFields).reduce((acc, cur) => {
    if (cur === 'postingDivision') {
      const division = divisions.find(
        (item) => item.id === postingFields[cur].value
      );
      acc[cur] = division
        ? division
        : {
            id: '',
            name: '',
            bn_name: '',
          };
    } else if (cur === 'postingDistrict') {
      const district = districts.find(
        (item) => item.id === postingFields[cur].value
      );
      acc[cur] = district
        ? district
        : { id: '', division_id: '', name: '', bn_name: '' };
    } else if (cur === 'postingUpazila') {
      const upazila = upazilas.find(
        (item) => item.id === postingFields[cur].value
      );
      acc[cur] = upazila
        ? upazila
        : {
            id: '',
            district_id: '',
            name: '',
            bn_name: '',
          };
    } else acc[cur] = postingFields[cur].value;
    return acc;
  }, {});

  const voterAreaValues = Object.keys(voterArea).reduce((acc, cur) => {
    if (cur === 'voterDivision') {
      const division = divisions.find(
        (item) => item.id === voterArea[cur].value
      );
      acc[cur] = division
        ? division
        : {
            id: '',
            name: '',
            bn_name: '',
          };
    } else if (cur === 'voterDistrict') {
      const district = districts.find(
        (item) => item.id === voterArea[cur].value
      );
      acc[cur] = district
        ? district
        : { id: '', division_id: '', name: '', bn_name: '' };
    }
    return acc;
  }, {});

  const deputationValues = Object.keys(deputationFields).reduce((acc, cur) => {
    if (cur === 'deputationDivision') {
      const division = divisions.find(
        (item) => item.id === deputationFields[cur].value
      );
      acc[cur] = division
        ? division
        : {
            id: '',
            name: '',
            bn_name: '',
          };
    } else if (cur === 'deputationDistrict') {
      const district = districts.find(
        (item) => item.id === deputationFields[cur].value
      );
      acc[cur] = district
        ? district
        : { id: '', division_id: '', name: '', bn_name: '' };
    } else if (cur === 'deputationUpazila') {
      const upazila = upazilas.find(
        (item) => item.id === deputationFields[cur].value
      );
      acc[cur] = upazila
        ? upazila
        : { id: '', district_id: '', name: '', bn_name: '' };
    } else acc[cur] = deputationFields[cur].value;
    return acc;
  }, {});

  return {
    ...formValues,
    ...postingValues,
    ...voterAreaValues,
    onDeputation,
    ...deputationValues,
  };
};
