import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterGroup from '../components/FilterGroup';
import Loading from '../components/ui/Loading';
import { axiosInstance } from '../config';

const columns = [
  { id: 'regNumber', label: 'Registration', minWidth: 60 },
  { id: 'name', label: 'Name', minWidth: 130 },
  { id: 'bn_name', label: 'Name Bengali', minWidth: 130 },
  { id: 'gender', label: 'Gender', minWidth: 30 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 95 },
  {
    id: 'mainPosting',
    label: 'Main Posting',
    minWidth: 170,
  },
  {
    id: 'jobDepertment',
    label: 'Job Depertment',
    minWidth: 140,
  },
];

const ListTable = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [dbPharmacists, setDbPharmacists] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1150px',
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
                        padding: '7px 5px',
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                  padding: '7px 5px',
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
                                    style={{
                                      fontWeight: '500',
                                      color:
                                        theme.palette.mode === 'dark'
                                          ? theme.palette.primary.light
                                          : theme.palette.primary.main,
                                    }}
                                    to={`/list/${pharmacist['regNumber']}`}
                                  >
                                    {value}
                                  </Link>
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
                        p: 1.5,
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={pharmacists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ListTable;
