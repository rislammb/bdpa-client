import { Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import EmptyTableRow from '../components/EmptyTableRow';
import FilterGroup from '../components/FilterGroup';
import PharmacistListItem from '../components/PharmacistListItem';

import TableHeader from '../components/TableHeader';
import Loading from '../components/ui/Loading';
import usePharmacistList from '../hooks/usePharmacistList';

import SnackbarComp from '../components/Snackbar';
import { enToBnNumber } from '../helpers/number';

const PharmacistList = () => {
  const {
    loading,
    isBn,
    list,
    pharmacistsCount,
    totalPharmacistsCount,
    columns,
    rowsPerPage,
    page,
    handleChange,
    snackbar,
    handleSnackbarClose,
  } = usePharmacistList();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1300px',
        margin: 'auto',
      }}
    >
      <FilterGroup />

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
                {list?.length > 0 ? (
                  list
                    // .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((pharmacist) => (
                      <PharmacistListItem
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
          {list?.length > 0 && pharmacistsCount && (
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
                {isBn
                  ? `${enToBnNumber(pharmacistsCount)} টির মধ্যে ${enToBnNumber(
                      pharmacistsCount > 0 ? (page - 1) * rowsPerPage + 1 : 0
                    )} থেকে ${enToBnNumber(
                      page * rowsPerPage < pharmacistsCount
                        ? page * rowsPerPage
                        : pharmacistsCount
                    )} টি দেখাচ্ছে `
                  : `Showing ${
                      pharmacistsCount > 0 ? (page - 1) * rowsPerPage + 1 : 0
                    } to ${
                      page * rowsPerPage < pharmacistsCount
                        ? page * rowsPerPage
                        : pharmacistsCount
                    } of ${pharmacistsCount} entries `}
                {pharmacistsCount < totalPharmacistsCount && (
                  <Typography component={'span'}>
                    {isBn
                      ? `( বাছাই করা হয়েছে মোট ${enToBnNumber(
                          totalPharmacistsCount
                        )} টি থেকে )`
                      : `( filtered from ${totalPharmacistsCount} total entries )`}
                  </Typography>
                )}
              </Typography>

              <Pagination
                count={Math.ceil(pharmacistsCount / rowsPerPage)}
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
          )}
        </Paper>
      )}

      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default PharmacistList;
