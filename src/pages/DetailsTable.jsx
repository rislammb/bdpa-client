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

  const isPermittedForEdit = false;

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
          isPermittedForEdit
        ),
        createRow(
          'Name (Bengali)',
          pharmacist.bn_name || '',
          'bn_name',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Email',
          pharmacist.email || '',
          'email',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Mobile',
          pharmacist.gender === 'Male' ? pharmacist.mobile : 'Hide now',
          'mobile',
          'text',
          isPermittedForEdit
        ),
        createRow(
          "Father's Name",
          pharmacist.fathersName || '',
          'fathersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          "Mother's Name",
          pharmacist.mothersName || '',
          'mothersName',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Gender',
          pharmacist.gender || '',
          'gender',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Date of Birth',
          dayjs(pharmacist.dateOfBirth).format('DD MMM YYYY') || '',
          'dateOfBirth',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'National ID Number',
          pharmacist.nationalId || '',
          'nationalId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Passing Year',
          pharmacist.passingYear || '',
          'passingYear',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'BDPA Member ID',
          pharmacist.memberId || '',
          'memberId',
          'text',
          isPermittedForEdit
        ),
        createRow(
          'Date of Join',
          dayjs(pharmacist.dateOfJoin).format('DD MMM YYYY') || '',
          'dateOfJoin',
          'date',
          isPermittedForEdit
        ),
        createRow(
          'Job Depertment',
          pharmacist.jobDepertment || '',
          'jobDepertment',
          'select',
          isPermittedForEdit
        ),
        createRow(
          'Main Posting/Address',
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
          isPermittedForEdit
        ),
        createRow(
          'Permanent Address',
          `${
            pharmacist.permanentPlace ? `${pharmacist.permanentPlace}, ` : ''
          }${
            pharmacist.permanentUpazila?.name
              ? `${pharmacist.permanentUpazila?.name}, `
              : ''
          }${
            pharmacist.permanentDistrict?.name
              ? pharmacist.permanentDistrict?.name
              : ''
          }`,
          'permanentAddress',
          'select',
          isPermittedForEdit
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
          isPermittedForEdit
        ),
        createRow(
          'On Deputation/Attachment',
          pharmacist.onDeputation,
          'onDeputation',
          'select',
          isPermittedForEdit
        ),
      ];

      setTableRows(rows);
    } else setTableRows([]);
  }, [pharmacist]);

  useEffect(() => {
    if (showDeputationRow) {
      const row = createRow(
        'Deputation/Attachment Posting',
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
        .then(() => navigate('/list/page/1'))
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
                <Box>
                  <img
                    src={pharmacist.imageUrl}
                    alt={pharmacist.name}
                    height={'130'}
                    style={{ border: '1px solid #ccc' }}
                  />
                </Box>
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
