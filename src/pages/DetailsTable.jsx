import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsTableRow from '../components/DetailsTableRow';
import Loading from '../components/ui/Loading';
import { axiosInstance } from '../config';

const createRow = (th, value, name, type, edit) => ({
  th,
  td: value,
  name,
  type,
  edit,
});

const DetailsTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let { regNumber } = useParams();
  const [pharmacist, setPharmacist] = useState(null);
  const [showDeputationRow, setShowDeputationRow] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (pharmacist) {
      setShowDeputationRow(pharmacist.onDeputation === 'Yes' ? true : false);
      const rows = [
        createRow(
          'Registration Number',
          pharmacist.regNumber || '',
          'regNumber',
          '',
          false
        ),
        createRow(
          'Name (English)',
          pharmacist.name || '',
          'name',
          'text',
          true
        ),
        createRow(
          'Name (Bengali)',
          pharmacist.bn_name || '',
          'bn_name',
          'text',
          true
        ),
        createRow('Email', pharmacist.email || '', 'email', 'text', true),
        createRow('Mobile', 'Hide now', 'mobile', 'text', false),
        // createRow('Mobile', pharmacist.mobile || '', 'mobile', 'text', true),
        createRow('Gender', pharmacist.gender || '', 'gender', 'select', true),
        createRow(
          'Date of Birth',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY') || '',
          'dateOfBirth',
          'date',
          true
        ),
        createRow(
          'Passing Year',
          pharmacist.passingYear || '',
          'passingYear',
          'text',
          true
        ),
        createRow(
          'Date of Join',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY') || '',
          'dateOfJoin',
          'date',
          true
        ),
        createRow(
          'Job Depertment',
          pharmacist.jobDepertment || '',
          'jobDepertment',
          'select',
          true
        ),
        createRow(
          'Main Posting',
          `${pharmacist.postingPlace ? `${pharmacist.postingPlace}, ` : ''}${
            pharmacist.postingUpazila?.name
              ? `${pharmacist.postingUpazila?.name}, `
              : ''
          }${
            pharmacist.postingDistrict?.name
              ? pharmacist.postingDistrict?.name
              : ''
          }`,
          'mainPosting',
          'select',
          true
        ),
        createRow(
          'Voter Area',
          `${
            pharmacist.voterDistrict?.name
              ? `${pharmacist.voterDistrict?.name}, `
              : ''
          }${
            pharmacist.voterDivision?.name
              ? `${pharmacist.voterDivision?.name} Division`
              : ''
          }`,
          'voterArea',
          'select',
          true
        ),
        createRow(
          'On Deputation',
          pharmacist.onDeputation,
          'onDeputation',
          'select',
          true
        ),
      ];

      setTableRows(rows);
    } else setTableRows([]);
  }, [pharmacist]);

  useEffect(() => {
    if (showDeputationRow) {
      const row = createRow(
        'Deputation Posting',
        `${
          pharmacist.deputationPlace ? `${pharmacist.deputationPlace}, ` : ''
        }${
          pharmacist.deputationUpazila?.name
            ? `${pharmacist.deputationUpazila?.name}, `
            : ''
        }${
          pharmacist.deputationDistrict?.name
            ? pharmacist.deputationDistrict?.name
            : ''
        }`,
        'deputationPosting',
        'select',
        true
      );
      setTableRows([...tableRows, row]);
    } else {
      setTableRows((prevState) => {
        return prevState.filter((item) => item.name !== 'deputationPosting');
      });
    }
  }, [showDeputationRow]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete '${pharmacist.name} : ${pharmacist.regNumber}'?`
      )
    ) {
      axiosInstance
        .delete(`/pharmacist/${regNumber}`)
        .then(() => navigate('/list'))
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/pharmacist/${regNumber}`)
      .then((res) => {
        setPharmacist(res.data);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        setPharmacist(null);
      });
  }, [regNumber]);

  return loading ? (
    <Box sx={{ p: 5 }}>
      <Loading />
    </Box>
  ) : (
    <TableContainer
      sx={{
        overflow: 'auto',
        maxWidth: 650,
        margin: '10px auto',
      }}
      component={Paper}
    >
      <Table size='small'>
        <TableBody>
          {pharmacist ? (
            tableRows.length > 0 ? (
              <>
                {tableRows.map((row) => (
                  <DetailsTableRow
                    key={row.th}
                    row={row}
                    pharmacist={pharmacist}
                    showDeputationRow={showDeputationRow}
                    handleShowDeputation={(data) =>
                      setShowDeputationRow(data === 'Yes' ? true : false)
                    }
                  />
                ))}
                <TableRow sx={{ border: 0 }}>
                  <TableCell
                    colSpan={3}
                    sx={{ padding: 1.5, textAlign: 'center' }}
                  >
                    <Button
                      onClick={handleDelete}
                      variant='contained'
                      startIcon={<DeleteIcon />}
                      color='error'
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                <TableRow key={num}>
                  <TableCell
                    sx={{
                      padding: 3,
                    }}
                  ></TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell
                sx={{
                  p: 5,
                  textAlign: 'center',
                  color: '#de6176',
                  fontSize: 17,
                }}
              >
                Pharmacist not found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DetailsTable;
