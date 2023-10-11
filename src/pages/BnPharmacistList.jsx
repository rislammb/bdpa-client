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
import useBnPharmacistList from '../hooks/useBnPharmacistList';

const BnPharmacistList = () => {
  const {
    loading,
    list,
    filteredList,
    columns,
    rowsPerPage,
    page,
    handleChange,
  } = useBnPharmacistList();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1300px',
        margin: 'auto',
      }}
    >
      <FilterGroup />

      {loading || list.length < 1 ? (
        <Box sx={{ p: 3 }}>
          <Loading />
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table stickyHeader size='small' aria-label='sticky table'>
              <TableHeader columns={columns} />
              <TableBody>
                {filteredList.length > 0 ? (
                  filteredList
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((pharmacist) => (
                      <PharmacistListItem
                        key={pharmacist._id}
                        pharmacist={pharmacist}
                        columns={columns}
                        isTargetBlank={
                          list.length > filteredList.length ? true : false
                        }
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
              {filteredList.length} টির মধ্যে{' '}
              {filteredList.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} থেকে{' '}
              {page * rowsPerPage < filteredList.length
                ? page * rowsPerPage
                : filteredList.length}{' '}
              টি দেখাচ্ছে{' '}
              {filteredList.length < list.length && (
                <Typography component={'span'}>
                  (বাছাই করা হয়েছে মোট {list.length} টি থেকে)
                </Typography>
              )}
            </Typography>
            <Pagination
              count={Math.ceil(filteredList.length / rowsPerPage)}
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

export default BnPharmacistList;
