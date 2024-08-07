import React from 'react';
import './CustomTableContainer.css';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Text,
} from '@chakra-ui/react';
import TableNavigationMenu from './TableNavigationMenu';

// const tableHeaderText = ['client', 'date', 'email', 'amount', 'project/job', 'action'];
// const tableData = [
//   {
//     client: 'neymar jr',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 400,
//     project: 'job',
//     status: 'complete',
//   },
//   {
//     client: 'CR7',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 200,
//     project: 'job',
//     status: 'failed',
//   },
//   {
//     client: 'mbappe ',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 100,
//     project: 'project',
//     status: 'pending',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 50,
//     project: 'project',
//     status: 'pending',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 50,
//     project: 'project',
//     status: 'pending',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 50,
//     project: 'project',
//     status: 'pending',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 50,
//     project: 'project',
//     status: 'pending',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: 50,
//     project: 'project',
//     status: 'pending',
//   },
// ];

const CustomTableContainer = ({ menu = false, tableHeading, tableData, tableHeaderText }) => {
  return (
    <TableContainer className="component-scrollbar h-[30vh] md:h-[46vh] lg:h-[44vh] xl:h-[40vh] bg-white">
      <div className="flex justify-between gap-4 p-4">
        <div>
          <Heading as="h4" className="!text-md">
            {tableHeading || 'Table heading'}
          </Heading>
        </div>

        <div className="flex">
          {menu && <TableNavigationMenu />}
          {/* <TableNavigationMenu /> */}
          {/* <div className="tab-container mt-[-4px]">
              <input type="radio" name="tab" id="tab1" className="tab tab--1" />
              <label className="tab_label select-none mt-2 capitalize text-gray-600" for="tab1">
                Today
              </label>
              <Divider orientation="vertical" className="mt-3 bg-gray-400 w-[2px] !h-6" />
              <input type="radio" name="tab" id="tab2" className="tab tab--2" />
              <label className="tab_label select-none mt-2 capitalize text-gray-600" for="tab2">
                weekly
              </label>
              <Divider orientation="vertical" className="mt-3 bg-gray-400 w-[2px] !h-6" />
              <input type="radio" name="tab" id="tab3" className="tab tab--3" />
              <label className="tab_label select-none mt-2 capitalize text-gray-600" for="tab3">
                monthly
              </label>
              <div class="indicator"></div>
            </div> */}
          <Text className="font-semibold mt-2 mb-2 sm:ms-6 border-b-4  border-[#1c4dcc] text-[#1c4dcc] select-none">
            View All
          </Text>
        </div>
      </div>

      <Table variant="simple" size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {tableHeaderText.map((item, index) => (
              <Th key={index}>
                <Heading as={'th'} size={'sm'}>
                  {item}
                </Heading>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const rows = [];
            for (let i = 0; i < tableData.length; i++) {
              const data = tableData[i];
              const values = [
                data.client || '', // Default empty string if key is missing
                data.date || '',
                data.email || '',
                data.amount || '',
                data.project || '',
                data.status || '',
              ];

              rows.push(
                <Tr key={i}>
                  <Td className="flex gap-2 items-center tracking-wide lowercase font-medium text-gray-600">
                    {userIcon()} {/* This function returns icon in svg for user */}
                    {values[0] || 'Client'}
                  </Td>
                  <Td className="tracking-wide lowercase font-medium text-gray-600">{values[1]}</Td>
                  <Td className="tracking-wide lowercase font-medium text-gray-600">{values[2]}</Td>
                  <Td className="tracking-wide lowercase font-medium text-gray-600">{values[3]}</Td>
                  <Td className="tracking-wide lowercase font-medium text-gray-600">{values[4]}</Td>
                  <Td
                    className={`tracking-wide lowercase font-medium text-gray-600 capitalize ${values[5] === 'complete' && 'text-green-800'} ${values[5] === 'pending' && 'text-orange-500'} ${values[5] === 'failed' && 'text-red-800'}`}
                  >
                    {values[5]}
                  </Td>
                </Tr>,
              );
            }
            return rows;
          })()}
        </Tbody>
        <Tfoot>
          {/* <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th>into</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr> */}
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default CustomTableContainer;

function userIcon() {
  return (
    <svg
      className="feather feather-user bg-black text-white rounded-full p-[2px]"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
