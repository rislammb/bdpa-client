import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EmptyTableRow from '../components/EmptyTableRow';
import FilterGroup from '../components/FilterGroup';
import PharmacistTableRow from '../components/PharmacistTableRow';
import TableHeader from '../components/TableHeader';
import Loading from '../components/ui/Loading';
import { axiosInstance } from '../config';

const columns = [
  { id: 'regNumber', label: 'Registration', minWidth: 105 },
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'bn_name', label: 'Name Bengali', minWidth: 130 },
  { id: 'memberId', label: 'Member ID', minWidth: 90 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 110 },
  {
    id: 'mainPosting',
    label: 'Main Posting/Address',
    minWidth: 230,
  },
  {
    id: 'voterDistrict',
    label: 'Voter District',
    minWidth: 95,
  },
];

const PharmacistTable = () => {
  let { pageNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dbPharmacists, setDbPharmacists] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [page, setPage] = useState(Number(pageNumber) ?? 1);

  const rowsPerPage = 50;

  const handleChange = (_event, value) => {
    setPage(value);
    navigate(`/members/page/${value}`);
  };

  useEffect(() => {
    axiosInstance
      .get('/pharmacist')
      .then((res) => {
        setDbPharmacists(res.data);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (pharmacists.length !== dbPharmacists.length) {
      navigate(`/members/page/1`);
    }
  }, [pharmacists]);

  useEffect(() => {
    setPage(Number(pageNumber) ?? 1);
  }, [pageNumber]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1300px',
        margin: 'auto',
      }}
    >
      <FilterGroup
        dbPharmacists={dbPharmacists}
        setAfterFilter={(value) => setPharmacists(value)}
      />

      {loading ? (
        <Box sx={{ p: 3 }}>
          <Loading />
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table stickyHeader size='small' aria-label='sticky table'>
              <TableHeader columns={columns} />
              <TableBody>
                {pharmacists.length > 0 ? (
                  pharmacists
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((pharmacist) => (
                      <PharmacistTableRow
                        key={pharmacist._id}
                        pharmacist={pharmacist}
                        columns={columns}
                      />
                    ))
                ) : (
                  <EmptyTableRow colSpan={7} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              p: 2,
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Typography>
              Showing{' '}
              {pharmacists.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to{' '}
              {page * rowsPerPage < pharmacists.length
                ? page * rowsPerPage
                : pharmacists.length}{' '}
              of {pharmacists.length} entries{' '}
              {pharmacists.length < dbPharmacists.length && (
                <Typography component={'span'}>
                  (filtered from {dbPharmacists.length} total entries)
                </Typography>
              )}
            </Typography>
            <Pagination
              count={Math.ceil(pharmacists.length / rowsPerPage)}
              color='primary'
              page={page}
              onChange={handleChange}
              sx={{
                '.MuiPagination-ul': {
                  justifyContent: 'center',
                },
              }}
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default PharmacistTable;
