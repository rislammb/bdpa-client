import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import DetailsPharmacistRow from '../components/DetailsPharmacistRow';
import SnackbarComp from '../components/Snackbar';
import Loading from '../components/ui/Loading';
import useDetailsPharmacist from '../hooks/useDetailsPharmacist';

const DetailsPharmacist = () => {
  const {
    loading,
    isBn,
    isAdmin,
    pharmacist,
    tableRows,
    handleDelete,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  } = useDetailsPharmacist();

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
        pb: 1.5,
      }}
      component={Paper}
    >
      <Table size='small'>
        <TableBody>
          {pharmacist ? (
            tableRows.length > 0 ? (
              <>
                {tableRows.map((row) => (
                  <DetailsPharmacistRow
                    key={row.th}
                    row={row}
                    pharmacist={pharmacist}
                    setSnackbar={setSnackbar}
                  />
                ))}
                {isAdmin && (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
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
                        {isBn ? 'ফার্মাসিস্ট মুছুন' : 'Delete Pharmacist'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
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
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                sx={{
                  p: 5,
                  textAlign: 'center',
                  color: '#de6176',
                  fontSize: 17,
                }}
              >
                {isBn
                  ? 'ফার্মাসিস্ট খুঁজে পাওয়া যায় নি!'
                  : 'Pharmacist not found!'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SnackbarComp
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.text}
        handleClose={handleSnackbarClose}
      />
    </TableContainer>
  );
};
export default DetailsPharmacist;
