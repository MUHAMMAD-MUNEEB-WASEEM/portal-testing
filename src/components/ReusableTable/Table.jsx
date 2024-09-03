import styles from '../../pages/Dashboard/Clients/Client/Client.module.css';

import { useNavigate } from 'react-router-dom';
import { getMonthName } from '../../utils/helpers';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

const TablePage = ({ pageTitle, createBtnText = null, navigateUrl = '', data }) => {
  const navigate = useNavigate();
  console.log('data', data);
  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex w="100%" justifyContent="space-between">
        <Heading color="brand.primary" as="h2" fontSize="2rem" className='!text-blue-700'>
          {pageTitle}
        </Heading>
        {createBtnText && (
          <Button colorScheme="blue" onClick={() => navigate(navigateUrl)} className='!bg-blue-700'>
            {createBtnText}
          </Button>
        )}
      </Flex>

      <Box>
        <Table colorScheme="blue" variant="simple" className='rounded-md overflow-hidden'>
          <Thead className='rounded-md bg-blue-700'>
            <Tr
              borderTopLeftRadius="10px"
              py="10px"
              fontWeight="600"
              fontSize="16px"
            >
              <Th color="brand.text">Amount</Th>
              <Th color="brand.text">Month</Th>
              <Th color="brand.text">Year</Th>
              <Th color="brand.text">BUH</Th>
              {pageTitle === 'Expenses' && <Th className='!text-white'>Description</Th>}
            </Tr>
          </Thead>

          <Tbody className='bg-white text-gray-800'>
            {data?.map((e) => (
              <Tr key={e._id}>
                <Td>{Number(e?.amount)}</Td>
                <Td>{getMonthName(e?.month)}</Td>
                <Td>{Number(e?.year)}</Td>
                <Td color="brand.secondary" textTransform="capitalize">
                  {e?.user?.name}
                </Td>
                {pageTitle === 'Expenses' && <Td>{e?.description ?? '-'}</Td>}
              </Tr>
            ))}
          </Tbody>
          {data?.length === 0 && (
            <Box>
              <Text color="destructive" className='text-gray-800'>No Data Available</Text>
            </Box>
          )}
        </Table>
      </Box>
    </VStack>
  );
};

export default TablePage;
