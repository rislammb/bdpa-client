import { jobDepertmentOptions } from '../constants/jobDepertment';

const divisionFilter = (list, locationValue, divisionValue) => {
  if (locationValue === '1') {
    if (divisionValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.postingDivision.id === divisionValue);
    }
  } else if (locationValue === '2') {
    if (divisionValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.voterDivision.id === divisionValue);
    }
  } else if (locationValue === '3') {
    if (divisionValue === 'all') {
      return list;
    } else {
      return list.filter(
        (item) => item.deputationDivision.id === divisionValue
      );
    }
  } else if (locationValue === '4') {
    if (divisionValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.permanentDivision.id === divisionValue);
    }
  } else {
    if (divisionValue === 'all') {
      return list;
    } else {
      return list.filter(
        (item) =>
          item.postingDivision.id === divisionValue ||
          item.voterDivision.id === divisionValue ||
          item.deputationDivision.id === divisionValue ||
          item.permanentDivision.id === divisionValue
      );
    }
  }
};

const districtFilter = (list, locationValue, districtValue) => {
  if (locationValue === '1') {
    if (districtValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.postingDistrict.id === districtValue);
    }
  } else if (locationValue === '2') {
    if (districtValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.voterDistrict.id === districtValue);
    }
  } else if (locationValue === '3') {
    if (districtValue === 'all') {
      return list;
    } else {
      return list.filter(
        (item) => item.deputationDistrict.id === districtValue
      );
    }
  } else if (locationValue === '4') {
    if (districtValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.permanentDistrict.id === districtValue);
    }
  } else {
    if (districtValue === 'all') {
      return list;
    } else {
      return list.filter(
        (item) =>
          item.postingDistrict.id === districtValue ||
          item.voterDistrict.id === districtValue ||
          item.deputationDistrict.id === districtValue ||
          item.permanentDistrict.id === districtValue
      );
    }
  }
};

const upazilaFilter = (list, locationValue, upazilaValue) => {
  if (locationValue === '1') {
    if (upazilaValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.postingUpazila.id === upazilaValue);
    }
  } else if (locationValue === '3') {
    if (upazilaValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.deputationUpazila.id === upazilaValue);
    }
  } else if (locationValue === '4') {
    if (upazilaValue === 'all') {
      return list;
    } else {
      return list.filter((item) => item.permanentUpazila.id === upazilaValue);
    }
  } else {
    if (upazilaValue === 'all') {
      return list;
    } else {
      return list.filter(
        (item) =>
          item.postingUpazila.id === upazilaValue ||
          item.deputationUpazila.id === upazilaValue ||
          item.permanentUpazila.id === upazilaValue
      );
    }
  }
};

const depertmentFilter = (list, depertmentInfo) => {
  if (depertmentInfo.value === 'all') {
    return list;
  } else {
    const strDepertment =
      jobDepertmentOptions.find(
        (depertment) => depertment.id === depertmentInfo.value
      )?.name ?? '';

    return list.filter((item) => item.jobDepertment === strDepertment);
  }
};

const searchFilter = (list, searchTerm) => {
  return list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.bn_name.toLowerCase().includes(searchTerm) ||
      item.regNumber.toLowerCase().includes(searchTerm) ||
      item.memberId.toLowerCase().includes(searchTerm)
  );
};

export const getFilteredPharmacists = (
  list,
  locationInfo,
  jobDepertmentInfo,
  searchTerm
) => {
  const { locationType, division, district, upazila } = locationInfo;

  const listAfterDivisionFilter = divisionFilter(
    list,
    locationType.value,
    division.value
  );
  const listAfterDistrictFilter = districtFilter(
    listAfterDivisionFilter,
    locationType.value,
    district.value
  );
  const listAfterUpazilaFilter = upazilaFilter(
    listAfterDistrictFilter,
    locationType.value,
    upazila.value
  );

  const listAfterDepertmentFilter = depertmentFilter(
    listAfterUpazilaFilter,
    jobDepertmentInfo
  );

  return searchFilter(listAfterDepertmentFilter, searchTerm);
};
