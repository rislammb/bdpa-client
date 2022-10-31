import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
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
import { axiosInstance } from '../config';

const createRow = (name, value, edit) => ({ th: name, td: value, edit });

const DetailsTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let { regNumber } = useParams();
  const [pharmacist, setPharmacist] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (pharmacist) {
      const rows = [
        createRow('Registration Number', pharmacist.regNumber, false),
        createRow('Name (English)', pharmacist.name, true),
        createRow('Name (Bengali)', pharmacist.bn_name, true),
        createRow('Email', pharmacist.email, false),
        createRow('Mobile', pharmacist.mobile, true),
        createRow('Gender', pharmacist.gender, true),
        createRow(
          'Date of Birth',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY'),
          true
        ),
        createRow('Passing Year', pharmacist.passingYear, true),
        createRow(
          'Date of Join',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY'),
          true
        ),
        createRow('Job Depertment', pharmacist.jobDepertment, true),
        createRow(
          'Main Posting',
          `${pharmacist.postingPlace ? `${pharmacist.postingPlace}, ` : ''}${
            pharmacist.postingUpazila.name
              ? `${pharmacist.postingUpazila.name}, `
              : ''
          }${
            pharmacist.postingDistrict.name
              ? pharmacist.postingDistrict.name
              : ''
          }`,
          false
        ),
        createRow(
          'Voter Area',
          `${
            pharmacist.voterDistrict.name
              ? `${pharmacist.voterDistrict.name}, `
              : ''
          }${
            pharmacist.voterDivision.name
              ? `${pharmacist.voterDivision.name} Division`
              : ''
          }`,
          true
        ),
        createRow(
          'On Deputation',
          pharmacist.onDeputation ? 'Yes' : 'No',
          true
        ),
      ];
      pharmacist.onDeputation &&
        rows.push(
          createRow(
            'Deputation Posting',
            `${
              pharmacist.deputationPlace
                ? `${pharmacist.deputationPlace}, `
                : ''
            }${
              pharmacist.deputationUpazila.name
                ? `${pharmacist.deputationUpazila.name}, `
                : ''
            }${
              pharmacist.deputationDistrict.name
                ? pharmacist.deputationDistrict.name
                : ''
            }`,
            true
          )
        );

      setTableRows(rows);
    } else setTableRows([]);
  }, [pharmacist]);

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete '${pharmacist.name} : ${pharmacist.regNumber}'?`
      )
    ) {
      if (window.prompt('What is your secret code?') === 'bdpa-raj') {
        axiosInstance
          .delete(`/list/${regNumber}`)
          .then(() => navigate('/list'))
          .catch((e) => {
            console.log(e.message);
          });
      } else {
        window.alert('You are not permitted to delete!');
      }
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/list/${regNumber}`)
      .then((res) => setPharmacist(res.data))
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        setPharmacist(null);
      });
  }, [regNumber]);

  return loading ? (
    <Typography sx={{ p: 3 }}>loading...</Typography>
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
          {pharmacist && tableRows.length > 0 ? (
            <>
              {tableRows.map((row) => (
                <DetailsTableRow key={row.th} row={row} />
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
