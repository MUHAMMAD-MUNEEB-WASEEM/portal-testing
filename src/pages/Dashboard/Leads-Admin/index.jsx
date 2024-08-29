import React, { useEffect, useState } from 'react';
import CONSTANTS from '../../../utils/constants';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../../hooks/useToast';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import DashboardHeading from '../../../components/DashboardHeading';
import { deleteLead, getAllLeads, setSingleLeadNull } from '../../../redux/leadSlice';
import { Paginate } from 'react-paginate-chakra-ui';
import Modal from '../../../components/Modal/Modal';
import { Edit, RefreshCw, Trash2, View } from 'lucide-react';

const Leads = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leads, total } = useSelector((state) => state.lead);
  const { showSuccessToast, showErrorToast } = useToast();

  const [currentId, setCurrentId] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    sort: '',
    limit: 10,
    search: '',
  });

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.key === 'Backspace') {
      setFilters({ ...filters, search: searchInput });
    }
  };

  const handlePageClick = (e) => {
    setFilters({ ...filters, page: e + 1 });
  };

  useEffect(() => {
    dispatch(getAllLeads(filters));
    dispatch(setSingleLeadNull());
  }, [dispatch, filters]);

  const refresh = () => {
    dispatch(getAllLeads(filters));
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setCurrentId(id);
  };

  const onDeleteConfirm = () => {
    dispatch(deleteLead({ id: currentId })).then(() => {
      showSuccessToast('Lead Deleted');
      setDeleteModalOpen(false);
    });
  };

  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.ADMIN_LEADS);

  return (
    <>
      {isReadAllowed && (
        <VStack spacing="6" align="stretch" p="4">
          <Flex justifyContent="space-between" alignItems="end">
            <DashboardHeading>Leads</DashboardHeading>
            <Flex gap={4} alignItems={'end'}>
              <Input
                type="text"
                color={'brand.secondary'}
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />

              {(isCreateAllowed ||
                user?.roles?.name === 'admin' ||
                user?.roles?.name === 'marketing') && (
                  <Button onClick={() => navigate('add')} color="brand.text" className='!bg-blue-700 !px-8'>
                    Add Lead
                  </Button>
                )}
              <Button onClick={refresh} color="brand.text" className='!bg-blue-700'>
                <RefreshCw />
              </Button>
            </Flex>
          </Flex>
          <Table colorScheme="blue" variant="simple" bg="brand.primary" className='rounded-md overflow-hidden'>
            <Thead className='rounded-md bg-blue-700'>
              <Tr
                borderTopLeftRadius="10px"
                py="10px"
                fontWeight="600"
                fontSize="16px"
              >
                <Th color="brand.text">Client Name</Th>
                <Th color="brand.text">Email</Th>
                <Th color="brand.text">Lead Cost</Th>
                <Th color="brand.text">Lead Type</Th>
                <Th color="brand.text">Lead Date</Th>
                <Th color="brand.text">Service</Th>
                <Th color="brand.text">Phone</Th>
                <Th color="brand.text">Brand</Th>
                <Th color="brand.text">Assigned To</Th>
                <Th color="brand.text">Status</Th>
                <Th color="brand.text"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {leads?.map((e, i) => (
                <Tr key={i} style={{ cursor: 'pointer' }}>
                  <Td>
                    <Text textTransform="capitalize">{e?.clientName}</Text>
                  </Td>
                  <Td>
                    <Text>{e?.email}</Text>
                  </Td>
                  <Td>
                    <Text> {e?.leadCost} </Text>
                  </Td>
                  <Td>
                    <Text>{e?.leadType} </Text>
                  </Td>
                  <Td>
                    <Text>
                      {`${new Date(e?.leadDate).getFullYear()}/${new Date(e?.leadDate).getMonth() + 1
                        }/${new Date(e?.leadDate).getDate()}`}{' '}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{e?.service} </Text>
                  </Td>
                  <Td>
                    <Text>{e?.phone}</Text>
                  </Td>
                  <Td>
                    <Text>{e?.brand?.name}</Text>
                  </Td>
                  <Td>
                    <Text>{e?.assignedTo?.name}</Text>
                  </Td>
                  <Td>
                    <Text>{e?.status}</Text>
                  </Td>
                  <Td>
                    <HStack gap={2}>
                      {isReadAllowed && <View onClick={() => navigate(`${e._id}`)} size={18} />}
                      {isUpdateAllowed && (
                        <Edit onClick={() => navigate(`update/${e._id}`)} size={18} />
                      )}
                      {isDeleteAllowed && (
                        <Trash2 size={18} onClick={() => handleDeleteModal(e._id)} />
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent={'flex-end'}>
            {!!leads?.length && !!total && (
              <Box>
                <Flex justifyContent={'center'} alignItems={'center'}>
                  <Text fontSize={12} color="brand.primary">
                    Showing {(filters.page - 1) * filters.limit + 1} -{' '}
                    {total < (filters.page - 1) * filters.limit + filters.limit
                      ? total
                      : (filters.page - 1) * filters.limit + filters.limit}
                    &nbsp; of {total}
                  </Text>
                  <Paginate
                    page={filters.page}
                    count={total}
                    pageSize={filters.limit}
                    onPageChange={handlePageClick}
                    margin={2}
                    // pageCount={Math.ceil(results / filters.limit)}
                    color="brand.primary"
                    fontWeight="600"
                    variant="outline"
                    border="2px solid #1b9ee4"
                    className='!border-blue-700'
                    w="50%"
                  />
                </Flex>
              </Box>
            )}
          </Flex>
        </VStack>
      )}

      {deleteModalOpen && (
        <Modal
          isOpen={deleteModalOpen}
          onRequestClose={() => setDeleteModalOpen(false)}
          heading={'Confirmation'}
        >
          <Box as="div" mt={5}>
            <Text color={'#808080'}>Are you sure you want to delete this Item?</Text>
            <Flex mt={5} alignItems={'center'} gap={4}>
              <Button onClick={onDeleteConfirm} bg={'#750815'} color={'white'}>
                Confirm
              </Button>
              <Button bg={'#000'} color={'#fff'} onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
            </Flex>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Leads;
