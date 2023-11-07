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
  getAreaInfo,
  getBnAreaInfo,
} from '../helpers/utilities';

const useDetailsPharmacistRow = ({ row, pharmacist, setSnackbar }) => {
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
    } else if (row.name === 'onDeputation') {
      setInputValue(
        onDeputationOptions.find((item) => item.id === e.target.value)
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

  const handleSubmit = async () => {
    let dataForSubmit = null;
    let dataForCell = '';

    if (row.type === 'textGroup') {
      dataForSubmit = { [row.name]: inputValue };
      dataForCell = isBn ? inputValue.bn_name : inputValue.name;
    } else if (row.type === 'select') {
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

    const res = await updatePharmacistData({
      regNumber: pharmacist.regNumber,
      data: dataForSubmit,
    });

    if (res) {
      setTableData(dataForCell);
      setIsEditOpen(false);

      setSnackbar({
        open: true,
        severity: 'success',
        text: isBn
          ? 'ফার্মাসিস্ট সফলভাবে আপডেট হয়েছে৷'
          : 'The Pharmacist updated successfully.',
      });
    } else {
      setTableData(row.td);
      setSnackbar({
        open: true,
        severity: 'error',
        text:
          typeof error === 'object'
            ? isBn
              ? error.bn_text
              : error.text
            : isBn
            ? 'ফার্মাসিস্ট আপডেট ব্যর্থ!'
            : 'Pharmacist update failed!',
      });
    }
  };

  useEffect(() => {
    setTableData(row.td);
  }, []);

  return {
    isBn,
    isEditOpen,
    inputValue,
    handleChange,
    error,
    handleIsEditOpen,
    addressFieldsArray,
    tableData,
    handleSubmit,
  };
};

export default useDetailsPharmacistRow;
