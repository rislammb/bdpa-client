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
    } else acc[cur] = postingFields[cur].value;
    return acc;
  }, {});
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
    } else acc[cur] = permanentFields[cur].value;
    return acc;
  }, {});
};

export const voterValueFromState = (voterAreaFields) => {
  return Object.keys(voterAreaFields).reduce((acc, cur) => {
    if (cur === 'voterDivision') {
      const division = divisions.find(
        (item) => item.id === voterAreaFields[cur].value
      );
      acc[cur] = division
        ? division
        : {
            id: '',
            name: '',
            bn_name: '',
          };
    } else {
      const district = districts.find(
        (item) => item.id === voterAreaFields[cur].value
      );
      acc[cur] = district
        ? district
        : { id: '', division_id: '', name: '', bn_name: '' };
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
    } else acc[cur] = deputationFields[cur].value;
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
    if (cur === 'gender') {
      const gender = genderOptions.find(
        (item) => item.id === formFields[cur].value
      );
      acc[cur] = gender ? gender.name : '';
    } else if (cur === 'jobDepertment') {
      const depertment = jobDepertmentOptions.find(
        (item) => item.id === formFields[cur].value
      );
      acc[cur] = depertment ? depertment.name : '';
    } else acc[cur] = formFields[cur].value;
    return acc;
  }, {});

  const postingValues = postingValueFromState(postingFields);
  const permanentValues = permanentValueFromState(permanentFields);

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
    ...permanentValues,
    ...voterAreaValues,
    onDeputation: onDeputationOptions.find((opt) => opt.id === onDeputation)
      ?.name,
    ...deputationValues,
  };
};

export const objDeepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const getBnAreaInfo = (data, area) =>
  `${data[area + 'Place']?.bn_name ? `${data[area + 'Place'].bn_name}, ` : ''}${
    data[area + 'Upazila']?.bn_name ? `${data[area + 'Upazila'].bn_name}, ` : ''
  }${data[area + 'District']?.bn_name ? data[area + 'District'].bn_name : ''}`;

export const getAreaInfo = (data, area) =>
  `${data[area + 'Place']?.name ? `${data[area + 'Place'].name}, ` : ''}${
    data[area + 'Upazila']?.name ? `${data[area + 'Upazila'].name}, ` : ''
  }${data[area + 'District']?.name ? data[area + 'District'].name : ''}`;

export const generateId = () => {
  const v4 = () => Math.floor(Math.random() * 99999).toString(16);
  return v4() + '-' + v4() + '-' + v4();
};
