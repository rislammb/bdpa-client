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

export const permanentFieldsFromPharmacist = (pharmacist) => {
  return {
    ...Object.keys({ ...addPermanentFields }).reduce((acc, cur) => {
      acc[cur] = { ...addPermanentFields[cur] };
      if (cur === 'permanentDivision') {
        if (pharmacist[cur].id) {
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'permanentDistrict') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addPermanentFields[cur].options,
            ...districts.filter(
              (district) =>
                district.division_id === pharmacist['permanentDivision'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'permanentUpazila') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addPermanentFields[cur].options,
            ...upazilas.filter(
              (upazila) =>
                upazila.district_id === pharmacist['permanentDistrict'].id
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

export const voterFieldsFromPharmacist = (pharmacist) => {
  return {
    ...Object.keys({ ...voterAreaFields }).reduce((acc, cur) => {
      acc[cur] = { ...voterAreaFields[cur] };
      if (cur === 'voterDivision') {
        if (pharmacist[cur].id) {
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'voterDistrict') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...voterAreaFields[cur].options,
            ...districts.filter(
              (district) =>
                district.division_id === pharmacist['voterDivision'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      }
      return acc;
    }, {}),
  };
};

export const deputationFieldsFromPharmacist = (pharmacist) => {
  return {
    ...Object.keys({ ...addDeputationFields }).reduce((acc, cur) => {
      acc[cur] = { ...addDeputationFields[cur] };
      if (cur === 'deputationDivision') {
        if (pharmacist[cur].id) {
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'deputationDistrict') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addDeputationFields[cur].options,
            ...districts.filter(
              (district) =>
                district.division_id === pharmacist['deputationDivision'].id
            ),
          ];
          acc[cur].value = pharmacist[cur].id;
        }
      } else if (cur === 'deputationUpazila') {
        if (pharmacist[cur].id) {
          acc[cur].options = [
            ...addDeputationFields[cur].options,
            ...upazilas.filter(
              (upazila) =>
                upazila.district_id === pharmacist['deputationDistrict'].id
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
    clonedState[areaName + 'District'].options = [
      ...selectedFields[areaName + 'District'].options,
      ...districts.filter((district) => district.division_id === value),
    ];

    if (clonedState[areaName + 'Upazila']) {
      clonedState[areaName + 'District'].value = '';
      clonedState[areaName + 'Upazila'].options = [
        ...selectedFields[areaName + 'Upazila'].options,
      ];
      clonedState[areaName + 'Upazila'].value = '';
    }
  } else if (name === areaName + 'District') {
    clonedState[name].value = value;
    if (clonedState[areaName + 'Upazila']) {
      clonedState[areaName + 'Upazila'].options = [
        ...selectedFields[areaName + 'Upazila'].options,
        ...upazilas.filter((upazila) => upazila.district_id === value),
      ];
      clonedState[areaName + 'Upazila'].value = '';
    }
  } else {
    clonedState[name].value = value;
  }

  return clonedState;
};

export const changeHandlerForPermanentGroup = (prevState, name, value) => {
  if (name === 'permanentDivision') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      permanentDistrict: {
        ...prevState['permanentDistrict'],
        options: [
          ...addPermanentFields['permanentDistrict'].options,
          ...districts.filter((district) => district.division_id === value),
        ],
        value: '0',
      },
      permanentUpazila: {
        ...prevState['permanentUpazila'],
        options: [...addPermanentFields['permanentUpazila'].options],
        value: '0',
      },
    };
  } else if (name === 'permanentDistrict') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      permanentUpazila: {
        ...prevState['permanentUpazila'],
        options: [
          ...addPermanentFields['permanentUpazila'].options,
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

export const changeHandlerForVoterGroup = (prevState, name, value) => {
  if (name === 'voterDivision') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      voterDistrict: {
        ...prevState['voterDistrict'],
        options: [
          ...voterAreaFields['voterDistrict'].options,
          ...districts.filter((district) => district.division_id === value),
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

export const changeHandlerForDeputationGroup = (prevState, name, value) => {
  if (name === 'deputationDivision') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      deputationDistrict: {
        ...prevState['deputationDistrict'],
        options: [
          ...addDeputationFields['deputationDistrict'].options,
          ...districts.filter((district) => district.division_id === value),
        ],
        value: '0',
      },
      deputationUpazila: {
        ...prevState['deputationUpazila'],
        options: [...addDeputationFields['deputationUpazila'].options],
        value: '0',
      },
    };
  } else if (name === 'deputationDistrict') {
    return {
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
      deputationUpazila: {
        ...prevState['deputationUpazila'],
        options: [
          ...addDeputationFields['deputationUpazila'].options,
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
    } else if (cur === 'postingPlace') {
      acc[cur] = { ...acc[cur], name: postingFields[cur].value };
    } else if (cur === 'bn_postingPlace') {
      acc['postingPlace'] = {
        ...acc['postingPlace'],
        bn_name: postingFields[cur].value,
      };
    }

    return acc;
  }, {});
};

export const areaValuesFromState = (areaFields, areaName) => {
  const res = Object.keys(areaFields).reduce((acc, cur) => {
    if (cur === areaName + 'Division') {
      const division = divisions.find(
        (item) => item.id === areaFields[cur].value
      );
      acc[cur] = division;
    } else if (cur === areaName + 'District') {
      const district = districts.find(
        (item) => item.id === areaFields[cur].value
      );
      acc[cur] = district;
    } else if (cur === areaName + 'Upazila') {
      const upazila = upazilas.find(
        (item) => item.id === areaFields[cur].value
      );
      acc[cur] = upazila;
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

  console.log('response ', res);
  return res;
};

export const permanentValueFromState = (permanentFields) => {
  return Object.keys(permanentFields).reduce((acc, cur) => {
    if (cur === 'permanentDivision') {
      const division = divisions.find(
        (item) => item.id === permanentFields[cur].value
      );
      acc[cur] = division
        ? division
        : {
            id: '',
            name: '',
            bn_name: '',
          };
    } else if (cur === 'permanentDistrict') {
      const district = districts.find(
        (item) => item.id === permanentFields[cur].value
      );
      acc[cur] = district
        ? district
        : { id: '', division_id: '', name: '', bn_name: '' };
    } else if (cur === 'permanentUpazila') {
      const upazila = upazilas.find(
        (item) => item.id === permanentFields[cur].value
      );
      acc[cur] = upazila
        ? upazila
        : {
            id: '',
            district_id: '',
            name: '',
            bn_name: '',
          };
    } else if (cur === 'permanentPlace') {
      acc[cur] = { ...acc[cur], name: permanentFields[cur].value };
    } else if (cur === 'bn_permanentPlace') {
      acc['permanentPlace'] = {
        ...acc['permanentPlace'],
        bn_name: permanentFields[cur].value,
      };
    }

    return acc;
  }, {});
};

export const voterValueFromState = (voterAreaFields) => {
  return Object.keys(voterAreaFields).reduce((acc, cur) => {
    if (cur === 'voterDivision') {
      const division = divisions.find(
        (item) => item.id === voterAreaFields[cur].value
      );
      acc[cur] = division;
    } else if (cur === 'voterDistrict') {
      const district = districts.find(
        (item) => item.id === voterAreaFields[cur].value
      );
      acc[cur] = district;
    }
    return acc;
  }, {});
};

export const deputationValueFromState = (deputationFields) => {
  return Object.keys(deputationFields).reduce((acc, cur) => {
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
        : {
            id: '',
            district_id: '',
            name: '',
            bn_name: '',
          };
    } else if (cur === 'deputationPlace') {
      acc[cur] = { ...acc[cur], name: deputationFields[cur].value };
    } else if (cur === 'bn_deputationPlace') {
      acc['deputationPlace'] = {
        ...acc['deputationPlace'],
        bn_name: deputationFields[cur].value,
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

  const postingValues = postingValueFromState(postingFields);
  const permanentValues = permanentValueFromState(permanentFields);

  const voterAreaValues = voterValueFromState(voterArea);
  const deputationValues = deputationValueFromState(deputationFields);

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
