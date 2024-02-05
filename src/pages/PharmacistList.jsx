import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Link as RouterLink } from 'react-router-dom';
import EmptyTableRow from '../components/EmptyTableRow';
import FilterGroup from '../components/FilterGroup';
import PharmacistListItem from '../components/PharmacistListItem';

import TableHeader from '../components/TableHeader';
import usePharmacistList from '../hooks/usePharmacistList';

import { useDeferredValue } from 'react';
import SnackbarComp from '../components/Snackbar';
import CustomPagination from '../components/shared/CustomPagination';
import PharmacistListSkeleton from '../skeleton/PharmacistListSkeleton';

const PharmacistList = () => {
  const {
    loading,
    isAdmin,
    isBn,
    list,
    pharmacistsCount,
    totalPharmacistsCount,
    columns,
    snackbar,
    handleSnackbarClose,
  } = usePharmacistList();

  const deferredList = useDeferredValue(list);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1300px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ mt: 2.5, textAlign: 'right' }}>
        {isAdmin && (
          <Button
            startIcon={<AddIcon />}
            component={RouterLink}
            to='/members/add'
            variant='contained'
          >
            {isBn ? 'ফার্মাসিস্ট' : 'Pharmacist'}
          </Button>
        )}
      </Box>

      <FilterGroup />

      <Paper>
        <TableContainer>
          <Table stickyHeader size='small' aria-label='sticky table'>
            <TableHeader columns={columns} />
            <TableBody>
              {loading ? (
                <PharmacistListSkeleton columns={columns} />
              ) : deferredList?.length > 0 ? (
                deferredList.map((pharmacist) => (
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
      </Paper>

      <CustomPagination
        count={pharmacistsCount}
        totalCount={totalPharmacistsCount}
        pageSize={50}
      />

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
