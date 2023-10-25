import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { genderOptionsWithEmpty } from '../constants/gender';
import { jobDepertmentOptionsWithEmpty } from '../constants/jobDepertment';
import { onDeputationOptions } from '../constants/onDeputationFields';
import {
  areaFieldsFromPharmacist,
  areaValuesFromState,
  changeHandlerForAreaGroup,
  changeHandlerForDeputationGroup,
  changeHandlerForPermanentGroup,
  changeHandlerForVoterGroup,
  deputationFieldsFromPharmacist,
  getAreaInfo,
  getBnAreaInfo,
  permanentFieldsFromPharmacist,
  voterFieldsFromPharmacist,
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
  const [permanentFields, setPermanentFields] = useState(null);
  const [voterFields, setVoterFields] = useState(
    voterFieldsFromPharmacist(pharmacist)
  );
  const [onDeputation, setOnDeputation] = useState(
    onDeputationOptions.find((opt) => opt.name === pharmacist.onDeputation)?.id
  );
  const [deputationFields, setDeputationFields] = useState(null);

  const isBn = language === 'BN' ? true : false;

  const addressFieldsArray =
    inputValue &&
    (row.name === 'mainPosting' ||
    row.name === 'permanentAddress' ||
    row.name === 'voterArea' ||
    row.name === 'deputationPosting'
      ? Object.keys(inputValue).reduce((acc, cur) => {
          acc.push(inputValue[cur]);
          return acc;
        }, [])
      : []);

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

  // console.log('input value =>', inputValue);

  const handleIsEditOpen = () => {
    if (isEditOpen) {
      setIsEditOpen(false);
    } else {
      if (row.name === 'mobile') {
        setInputValue(pharmacist?.mobile?.name);
      } else if (
        row.type === 'textGroup' ||
        row.type === 'select' ||
        row.type === 'date'
      ) {
        setInputValue(pharmacist && pharmacist[row.name]);
      } else if (row.name === 'mainPosting') {
        setInputValue(areaFieldsFromPharmacist(pharmacist, 'posting'));
      } else if (row.name === 'permanentAddress') {
        setInputValue(areaFieldsFromPharmacist(pharmacist, 'permanent'));
      } else if (row.name === 'voterArea') {
        setInputValue(areaFieldsFromPharmacist(pharmacist, 'voter'));
      } else if (row.name === 'deputationPosting') {
        setInputValue(areaFieldsFromPharmacist(pharmacist, 'deputation'));
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
    } else if (row.name === 'jobDepertment') {
      setInputValue(
        jobDepertmentOptionsWithEmpty.find((item) => item.id === e.target.value)
      );
    } else if (row.name === 'mainPosting') {
      setInputValue(
        changeHandlerForAreaGroup(
          inputValue,
          e.target.name,
          e.target.value,
          'posting'
        )
      );
    } else if (row.name === 'permanentAddress') {
      setInputValue(
        changeHandlerForAreaGroup(
          inputValue,
          e.target.name,
          e.target.value,
          'permanent'
        )
      );
    } else if (row.name === 'voterArea') {
      setInputValue(
        changeHandlerForAreaGroup(
          inputValue,
          e.target.name,
          e.target.value,
          'voter'
        )
      );
    } else if (row.name === 'deputationPosting') {
      setInputValue(
        changeHandlerForAreaGroup(
          inputValue,
          e.target.name,
          e.target.value,
          'deputation'
        )
      );
    } else {
      setInputValue(e.target.value);
    }
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

    if (row.type === 'textGroup') {
      dataForSubmit = { [row.name]: inputValue };
      dataForCell = isBn ? inputValue.bn_name : inputValue.name;
    } else if (row.tpe === 'select') {
      dataForSubmit = {
        [row.name]: inputValue.id
          ? inputValue
          : { id: '', name: '', bn_name: '' },
      };
      dataForCell = inputValue.id
        ? isBn
          ? inputValue.bn_name
          : inputValue.name
        : '';
    } else if (row.type === 'date') {
      dataForSubmit = {
        [row.name]: inputValue,
      };
      dataForCell = dayjs(inputValue).format('DD MMM YYYY');
    } else if (row.name === 'mainPosting') {
      dataForSubmit = areaValuesFromState(inputValue, 'posting');
      dataForCell = isBn
        ? getBnAreaInfo(dataForSubmit, 'posting')
        : getAreaInfo(dataForSubmit, 'posting');
    } else if (row.name === 'permanentAddress') {
      console.log('permanent called');
      dataForSubmit = areaValuesFromState(inputValue, 'permanent');
      dataForCell = isBn
        ? getBnAreaInfo(dataForSubmit, 'permanent')
        : getAreaInfo(dataForSubmit, 'permanent');
    } else if (row.name === 'voterArea') {
      dataForSubmit = areaValuesFromState(inputValue, 'voter');
      dataForCell = isBn
        ? getBnAreaInfo(dataForSubmit, 'voter')
        : getAreaInfo(dataForSubmit, 'voter');
    } else if (row.name === 'deputationPosting') {
      dataForSubmit = areaValuesFromState(inputValue, 'deputation');
      dataForCell = isBn
        ? getBnAreaInfo(dataForSubmit, 'deputation')
        : getAreaInfo(dataForSubmit, 'deputation');
    } else {
      dataForSubmit = { [row.name]: inputValue };
      dataForCell = inputValue;
    }

    console.log('data for submit', dataForSubmit);
    console.log('data for cell', dataForCell);

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
    if (row.name === 'permanentAddress') {
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
    addressFieldsArray,
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
