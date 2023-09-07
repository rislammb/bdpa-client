import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Link from '../components/ui/Link';

import FilterGroup from '../components/FilterGroup';
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

const ListTable = () => {
  let { pageNumber } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [dbPharmacists, setDbPharmacists] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [page, setPage] = useState(Number(pageNumber) ?? 1);

  const rowsPerPage = 50;

  const handleChange = (_event, value) => {
    setPage(value);
    navigate(`/list/page/${value}`);
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
      navigate(`/list/page/1`);
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
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        minWidth: column.minWidth,
                        padding: { xs: '8px 6px', sm: '8px 12px' },
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pharmacists.length > 0 ? (
                  pharmacists
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((pharmacist) => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={pharmacist.regNumber}
                        >
                          {columns.map((column) => {
                            const value = pharmacist[column.id];

                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{
                                  minWidth: column.minWidth,
                                  padding: { xs: '8px 6px', sm: '12px' },
                                }}
                              >
                                {column.id === 'dateOfBirth' ? (
                                  dayjs(value).format('DD MMM YYYY')
                                ) : column.id === 'mainPosting' ? (
                                  `${
                                    pharmacist['postingPlace']
                                      ? `${pharmacist['postingPlace']}, `
                                      : ''
                                  }${
                                    pharmacist['postingUpazila'].name
                                      ? `${pharmacist['postingUpazila'].name}, `
                                      : ''
                                  }${
                                    pharmacist['postingDistrict'].name
                                      ? pharmacist['postingDistrict'].name
                                      : ''
                                  }`
                                ) : column.id === 'regNumber' ||
                                  column.id === 'name' ? (
                                  <Link
                                    to={`/members/${pharmacist['regNumber']}`}
                                    target='_blank'
                                    text={value}
                                  />
                                ) : column.id === 'voterDistrict' ? (
                                  value.name
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        textAlign: 'center',
                        p: 2.5,
                        color: theme.palette.warning.main,
                      }}
                    >
                      There is nothing to show!
                    </TableCell>
                  </TableRow>
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

export default ListTable;
