import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import DetailsPharmacistRow from '../components/DetailsPharmacistRow';
import SnackbarComp from '../components/Snackbar';
import useDetailsPharmacist from '../hooks/useDetailsPharmacist';
import DetailsPharmacistSkeleton from '../skeleton/DetailsPharmacistSkeleton';

const DetailsPharmacist = () => {
  const {
    loading,
    submitting,
    isBn,
    isAdmin,
    pharmacist,
    tableRows,
    isPermittedForEdit,
    handleDelete,
    snackbar,
    setSnackbar,
    handleSnackbarClose,
  } = useDetailsPharmacist();

  return (
    <TableContainer
      sx={{
        overflow: 'auto',
        maxWidth: 650,
        margin: '10px auto',
        pb: 1.5,
      }}
      component={Paper}
    >
      {loading ? (
        <DetailsPharmacistSkeleton
          rows={tableRows}
          isPermittedForEdit={isPermittedForEdit}
        />
      ) : pharmacist ? (
        tableRows[tableRows.length - 1]?.td === '' &&
        tableRows[tableRows.length - 2]?.td === '' ? (
          <DetailsPharmacistSkeleton
            rows={tableRows}
            isPermittedForEdit={isPermittedForEdit}
          />
        ) : (
          <Table size='small'>
            <TableBody>
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
                        disabled={submitting}
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
            </TableBody>
          </Table>
        )
      ) : (
        <Box>
          <Typography
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
          </Typography>
        </Box>
      )}

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
