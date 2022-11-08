import { genderOptions } from '../constants/addFormFields';
import { addPostingFields } from '../constants/addPostingFields';
import { depertmentOptions } from '../constants/depertmentOptions';
import { districts } from '../constants/districts';
import { divisions } from '../constants/divisions';
import { upazilas } from '../constants/upazilas';

export const arraySortByDate = (array) => {
  return array.sort((a, b) =>
    a.dateOfJoin > b.dateOfJoin ? 1 : a.dateOfJoin < b.dateOfJoin ? -1 : 0
  );
};

export const postingFieldsFromPharmacist = (pharmacist) => {
  return {
    ...Object.keys({ ...addPostingFields }).reduce((acc, cur) => {
      acc[cur] = { ...addPostingFields[cur] };
      if (cur === 'postingDivision') {
        if (pharmacist[cur].id) {
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'postingDistrict') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addPostingFields[cur].options,
            ...districts.filter(
              (district) =>
                district.division_id === pharmacist['postingDivision'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'postingUpazila') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addPostingFields[cur].options,
            ...upazilas.filter(
              (upazila) =>
                upazila.district_id === pharmacist['postingDistrict'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      } else {
        acc[cur].value = pharmacist[cur] || '';
      }
      return acc;
    }, {}),
  };
};

export const changeHandlerForPostingGroup = (prevState, name, value) => {
  if (name === 'postingDivision') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      postingDistrict: {
        ...prevState['postingDistrict'],
        options: [
          ...addPostingFields['postingDistrict'].options,
          ...districts.filter((district) => district.division_id === value),
        ],
        value: '0',
      },
      postingUpazila: {
        ...prevState['postingUpazila'],
        options: [...addPostingFields['postingUpazila'].options],
        value: '0',
      },
    };
  } else if (name === 'postingDistrict') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      postingUpazila: {
        ...prevState['postingUpazila'],
        options: [
          ...addPostingFields['postingUpazila'].options,
          ...upazilas.filter((upazila) => upazila.district_id === value),
        ],
        value: '0',
      },
    };
  } else {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
    };
  }
};

export const postingValueFromState = (postingFields) => {
  return Object.keys(postingFields).reduce((acc, cur) => {
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

  const postingValues = postingValueFromState(postingFields);

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
