import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';

import { genderOptionsWithEmpty } from '../constants/gender';
import {
  jobDepertmentField,
  jobDepertmentOptions,
} from '../constants/jobDepertment';
import { onDeputationOptions } from '../constants/onDeputationFields';
import {
  changeHandlerForDeputationGroup,
  changeHandlerForPermanentGroup,
  changeHandlerForPostingGroup,
  changeHandlerForVoterGroup,
  deputationFieldsFromPharmacist,
  deputationValueFromState,
  permanentFieldsFromPharmacist,
  permanentValueFromState,
  postingFieldsFromPharmacist,
  postingValueFromState,
  voterFieldsFromPharmacist,
  voterValueFromState,
} from '../helpers/utilities';

const useDetailsPharmacistRow = ({
  row,
  pharmacist,
  handleShowDeputation,
  setSnackbar,
}) => {
  const {
    ui: { language },
    pharmacist: { error },
  } = useStoreState((actions) => actions);
  const { updatePharmacistData } = useStoreActions(
    (actions) => actions.pharmacist
  );

  const [tableData, setTableData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [jobDepertment, setJobDepertment] = useState(null);
  const [postingFields, setPostingFields] = useState(null);
  const [permanentFields, setPermanentFields] = useState(null);
  const [voterFields, setVoterFields] = useState(
    voterFieldsFromPharmacist(pharmacist)
  );
  const [onDeputation, setOnDeputation] = useState(
    onDeputationOptions.find((opt) => opt.name === pharmacist.onDeputation)?.id
  );
  const [deputationFields, setDeputationFields] = useState(null);

  const isBn = language === 'BN' ? true : false;

  const postingFieldsArray =
    postingFields &&
    Object.keys(postingFields).reduce((acc, cur) => {
      acc.push(postingFields[cur]);
      return acc;
    }, []);

  const permanentFieldsArray =
    permanentFields &&
    Object.keys(permanentFields).reduce((acc, cur) => {
      acc.push(permanentFields[cur]);
      return acc;
    }, []);

  const voterAreaArray =
    voterFields &&
    Object.keys(voterFields).reduce((acc, cur) => {
      acc.push(voterFields[cur]);
      return acc;
    }, []);

  const deputationFieldsArray =
    deputationFields &&
    Object.keys(deputationFields).reduce((acc, cur) => {
      acc.push(deputationFields[cur]);
      return acc;
    }, []);

  const handleIsEditOpen = () => {
    if (isEditOpen) {
      setIsEditOpen(false);
    } else {
      if (row.name === 'mobile') {
        setInputValue(pharmacist?.mobile?.name);
      } else if (row.type === 'textGroup') {
        setInputValue(pharmacist && pharmacist[row.name]);
      } else if (row.name === 'gender') {
        setInputValue(
          genderOptionsWithEmpty.find(
            (item) => item.id === pharmacist?.gender.id
          )
        );
      } else setInputValue(tableData);
      setIsEditOpen(true);
    }
  };

  const handleChange = (e, name) => {
    if (name === 'dateOfBirth' || name === 'dateOfJoin') {
      setInputValue(e);
    } else if (row.type === 'textGroup') {
      setInputValue((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else if (row.name === 'gender') {
      setInputValue(
        genderOptionsWithEmpty.find((item) => item.id === e.target.value)
      );
    } else {
      setInputValue(e.target.value);
    }
  };

  const handlePostingChange = (e) => {
    setPostingFields((prevState) => {
      return changeHandlerForPostingGroup(
        prevState,
        e.target.name,
        e.target.value
      );
    });
  };
  const handlePermanentChange = (e) => {
    setPermanentFields((prevState) => {
      return changeHandlerForPermanentGroup(
        prevState,
        e.target.name,
        e.target.value
      );
    });
  };
  const handleDeputationChange = (e) => {
    setDeputationFields((prevState) => {
      return changeHandlerForDeputationGroup(
        prevState,
        e.target.name,
        e.target.value
      );
    });
  };
  const handleVoterAreaChange = (e) => {
    setVoterFields((prevState) => {
      return changeHandlerForVoterGroup(
        prevState,
        e.target.name,
        e.target.value
      );
    });
  };

  const handleSubmit = async () => {
    let dataForSubmit = null;
    let dataForCell = '';

    if (
      row.name === 'fathersName' ||
      row.name === 'mothersName' ||
      row.name === 'gender'
    ) {
      dataForSubmit = { [row.name]: inputValue };
      dataForCell = isBn ? inputValue.bn_name : inputValue.name;
    } else if (row.name === 'jobDepertment') {
      const strJobDepertment =
        jobDepertmentOptions.find((option) => option.id === jobDepertment.value)
          ?.name || '';
      dataForSubmit = { jobDepertment: strJobDepertment };
      dataForCell = strJobDepertment;
    } else if (row.name === 'mainPosting') {
      dataForSubmit = postingValueFromState(postingFields);
      dataForCell = `${
        dataForSubmit.postingPlace ? `${dataForSubmit.postingPlace}, ` : ''
      }${
        dataForSubmit.postingUpazila?.name
          ? `${dataForSubmit.postingUpazila?.name}, `
          : ''
      }${
        dataForSubmit.postingDistrict?.name
          ? dataForSubmit.postingDistrict?.name
          : ''
      }`;
    } else if (row.name === 'permanentAddress') {
      dataForSubmit = permanentValueFromState(permanentFields);
      dataForCell = `${
        dataForSubmit.permanentPlace ? `${dataForSubmit.permanentPlace}, ` : ''
      }${
        dataForSubmit.permanentUpazila?.name
          ? `${dataForSubmit.permanentUpazila?.name}, `
          : ''
      }${
        dataForSubmit.permanentDistrict?.name
          ? dataForSubmit.permanentDistrict?.name
          : ''
      }`;
    } else if (row.name === 'onDeputation') {
      const data = onDeputationOptions.find(
        (opt) => opt.id === onDeputation
      )?.name;
      dataForSubmit = { onDeputation: data };
      dataForCell = data;
    } else if (row.name === 'voterArea') {
      dataForSubmit = voterValueFromState(voterFields);
      dataForCell = `${
        dataForSubmit.voterDistrict?.name
          ? `${dataForSubmit.voterDistrict?.name}, `
          : ''
      }${
        dataForSubmit.voterDivision?.name
          ? `${dataForSubmit.voterDivision?.name} Division`
          : ''
      }`;
    } else if (row.name === 'deputationPosting') {
      dataForSubmit = deputationValueFromState(deputationFields);
      dataForCell = `${
        dataForSubmit.deputationPlace
          ? `${dataForSubmit.deputationPlace}, `
          : ''
      }${
        dataForSubmit.deputationUpazila?.name
          ? `${dataForSubmit.deputationUpazila?.name}, `
          : ''
      }${
        dataForSubmit.deputationDistrict?.name
          ? dataForSubmit.deputationDistrict?.name
          : ''
      }`;
    } else {
      dataForSubmit = { [row.name]: inputValue };
      dataForCell = inputValue;
    }

    // console.log('data for submit', dataForSubmit);
    // console.log('data for cell', dataForCell);

    const res = await updatePharmacistData({
      regNumber: pharmacist.regNumber,
      data: dataForSubmit,
    });

    if (res) {
      setTableData(dataForCell);
      setIsEditOpen(false);
      if (row.name === 'onDeputation') {
        handleShowDeputation(res['onDeputation']);
      }
      setSnackbar({
        open: true,
        severity: 'success',
        text: 'Pharmacist update successfull.',
      });
    } else {
      setTableData(row.td);
      setSnackbar({
        open: true,
        severity: 'error',
        text: 'Pharmacist update faild!.',
      });
    }
  };

  useEffect(() => {
    setTableData(row.td);
    if (row.name === 'jobDepertment') {
      const tempJobDepertment = { ...jobDepertmentField };
      if (pharmacist.jobDepertment) {
        tempJobDepertment.value =
          jobDepertmentOptions.find(
            (option) => option.name === pharmacist.jobDepertment
          )?.id || '0';
        setJobDepertment(tempJobDepertment);
      } else {
        setJobDepertment(tempJobDepertment);
      }
    } else if (row.name === 'mainPosting') {
      setPostingFields(postingFieldsFromPharmacist(pharmacist));
    } else if (row.name === 'permanentAddress') {
      setPermanentFields(permanentFieldsFromPharmacist(pharmacist));
    } else if (row.name === 'deputationPosting') {
      setDeputationFields(deputationFieldsFromPharmacist(pharmacist));
    }
  }, []);

  return {
    isBn,
    isEditOpen,
    inputValue,
    handleChange,
    error,
    handleIsEditOpen,
    jobDepertment,
    setJobDepertment,
    postingFieldsArray,
    handlePostingChange,
    permanentFieldsArray,
    handlePermanentChange,
    voterAreaArray,
    handleVoterAreaChange,
    onDeputation,
    setOnDeputation,
    deputationFieldsArray,
    handleDeputationChange,
    tableData,
    handleSubmit,
  };
};

export default useDetailsPharmacistRow;
