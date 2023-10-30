import { addDeputationFields } from '../constants/addDeputationFields';
import { addPermanentFields } from '../constants/addPermanentFields';
import { addPostingFields } from '../constants/addPostingFields';
import { districts } from '../constants/districts';
import { divisions } from '../constants/divisions';
import { genderOptions } from '../constants/gender';
import { jobDepertmentOptions } from '../constants/jobDepertment';
import { onDeputationOptions } from '../constants/onDeputationFields';
import { upazilas } from '../constants/upazilas';
import { voterAreaFields } from '../constants/voterAreaFields';

export const areaFieldsFromPharmacist = (pharmacist, areaName) => {
  const selectedFields =
    areaName === 'posting'
      ? addPostingFields
      : areaName === 'permanent'
      ? addPermanentFields
      : areaName === 'voter'
      ? voterAreaFields
      : areaName === 'deputation'
      ? addDeputationFields
      : null;

  return {
    ...Object.keys({ ...selectedFields }).reduce((acc, cur) => {
      acc[cur] = { ...selectedFields[cur] };

      if (cur === areaName + 'Division') {
        acc[cur].value = pharmacist[cur].id;
      } else if (cur === areaName + 'District') {
        acc[cur].options = [
          ...selectedFields[cur].options,
          ...districts.filter(
            (district) =>
              district.division_id === pharmacist[areaName + 'Division'].id
          ),
        ];
        acc[cur].value = pharmacist[cur].id;
      } else if (cur === areaName + 'Upazila') {
        acc[cur].options = [
          ...selectedFields[cur].options,
          ...upazilas.filter(
            (upazila) =>
              upazila.district_id === pharmacist[areaName + 'District'].id
          ),
        ];
        acc[cur].value = pharmacist[cur].id;
      } else if (cur === areaName + 'Place') {
        acc[cur].value = pharmacist[cur]?.name;
      } else if (cur === 'bn_' + areaName + 'Place') {
        acc[cur].value = pharmacist[areaName + 'Place']?.bn_name;
      }

      return acc;
    }, {}),
  };
};

export const changeHandlerForAreaGroup = (prevState, name, value, areaName) => {
  const selectedFields =
    areaName === 'posting'
      ? addPostingFields
      : areaName === 'permanent'
      ? addPermanentFields
      : areaName === 'voter'
      ? voterAreaFields
      : areaName === 'deputation'
      ? addDeputationFields
      : null;

  const clonedState = objDeepClone(prevState);
  if (name === areaName + 'Division') {
    clonedState[name].value = value;

    if (value) {
      clonedState[areaName + 'District'].options = [
        ...selectedFields[areaName + 'District'].options,
        ...districts.filter((district) => district.division_id === value),
      ];
    } else {
      clonedState[areaName + 'District'].options = [
        ...selectedFields[areaName + 'District'].options,
      ];
    }
    clonedState[areaName + 'District'].value = '';

    if (clonedState[areaName + 'Upazila']) {
      clonedState[areaName + 'Upazila'].options = [
        ...selectedFields[areaName + 'Upazila'].options,
      ];
      clonedState[areaName + 'Upazila'].value = '';
    }
  } else if (name === areaName + 'District') {
    clonedState[name].value = value;

    if (clonedState[areaName + 'Upazila']) {
      if (value) {
        clonedState[areaName + 'Upazila'].options = [
          ...selectedFields[areaName + 'Upazila'].options,
          ...upazilas.filter((upazila) => upazila.district_id === value),
        ];
      } else {
        clonedState[areaName + 'Upazila'].options = [
          ...selectedFields[areaName + 'Upazila'].options,
        ];
      }
      clonedState[areaName + 'Upazila'].value = '';
    }
  } else {
    clonedState[name].value = value;
  }

  return clonedState;
};

export const areaValuesFromState = (areaFields, areaName) => {
  return Object.keys(areaFields).reduce((acc, cur) => {
    if (cur === areaName + 'Division') {
      const division = divisions.find(
        (item) => item.id === areaFields[cur].value
      );
      acc[cur] = division ?? { id: '', name: '', bn_name: '' };
    } else if (cur === areaName + 'District') {
      const district = districts.find(
        (item) => item.id === areaFields[cur].value
      );
      acc[cur] = district ?? { id: '', division_id: '', name: '', bn_name: '' };
    } else if (cur === areaName + 'Upazila') {
      const upazila = upazilas.find(
        (item) => item.id === areaFields[cur].value
      );
      acc[cur] = upazila ?? { id: '', district_id: '', name: '', bn_name: '' };
    } else if (cur === areaName + 'Place') {
      acc[cur] = { ...acc[cur], name: areaFields[cur].value };
    } else if (cur === 'bn_' + areaName + 'Place') {
      acc[areaName + 'Place'] = {
        ...acc[areaName + 'Place'],
        bn_name: areaFields[cur].value,
      };
    }

    return acc;
  }, {});
};

export const pharmacistFromState = (
  formFields,
  postingFields,
  permanentFields,
  voterArea,
  onDeputation,
  deputationFields
) => {
  const formValues = Object.keys(formFields).reduce((acc, cur) => {
    if (cur === 'fathersName' || cur === 'mothersName' || cur === 'institute') {
      acc[cur] = { ...acc[cur], name: formFields[cur]?.value };
    } else if (cur === 'bn_fathersName') {
      acc['fathersName'] = {
        ...acc['fathersName'],
        bn_name: formFields[cur]?.value,
      };
    } else if (cur === 'bn_mothersName') {
      acc['mothersName'] = {
        ...acc['mothersName'],
        bn_name: formFields[cur]?.value,
      };
    } else if (cur === 'bn_institute') {
      acc['institute'] = {
        ...acc['institute'],
        bn_name: formFields[cur]?.value,
      };
    } else if (cur === 'gender') {
      const gender = genderOptions.find(
        (item) => item.id === formFields[cur].value
      );
      acc[cur] = gender;
    } else if (cur === 'jobDepertment') {
      const depertment = jobDepertmentOptions.find(
        (item) => item.id === formFields[cur].value
      );
      acc[cur] = depertment;
    } else acc[cur] = formFields[cur].value;

    return acc;
  }, {});

  const postingValues = areaValuesFromState(postingFields, 'posting');
  const permanentValues = areaValuesFromState(permanentFields, 'permanent');
  const voterAreaValues = areaValuesFromState(voterArea, 'voter');
  const deputationValues = areaValuesFromState(deputationFields, 'deputation');

  return {
    ...formValues,
    ...postingValues,
    ...permanentValues,
    ...voterAreaValues,
    onDeputation: onDeputationOptions.find((opt) => opt.id === onDeputation),
    ...deputationValues,
  };
};

export const objDeepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const getBnAreaInfo = (data, areaName) => {
  return (
    data &&
    `${
      data[areaName + 'Place']?.bn_name
        ? `${data[areaName + 'Place'].bn_name}, `
        : ''
    }${
      data[areaName + 'Upazila']?.bn_name
        ? `${data[areaName + 'Upazila'].bn_name}, `
        : ''
    }${
      data[areaName + 'District']?.bn_name
        ? data[areaName + 'District'].bn_name
        : ''
    }`
  );
};

export const getAreaInfo = (data, areaName) =>
  data &&
  `${
    data[areaName + 'Place']?.name ? `${data[areaName + 'Place'].name}, ` : ''
  }${
    data[areaName + 'Upazila']?.name
      ? `${data[areaName + 'Upazila'].name}, `
      : ''
  }${
    data[areaName + 'District']?.name ? data[areaName + 'District'].name : ''
  }`;

export const generateId = () => {
  const v4 = () => Math.floor(Math.random() * 99999).toString(16);
  return v4() + '-' + v4() + '-' + v4();
};
