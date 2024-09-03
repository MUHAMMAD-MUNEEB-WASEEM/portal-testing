import React from 'react';
import './clientTable.css';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const ClientTable = ({ tableHeading, tableData, tableHeaderText, link }) => {

    console.log('client', tableData)
    return (
        <TableContainer className="component-scrollbar h-[60vh] md:h-[46vh] lg:h-[44vh] xl:h-[40vh] bg-white !overflow-y-scroll rounded-md">
            <div className="flex justify-between gap-4 p-4">
                <div>
                    {/* <Heading as="h4" className="!text-md !text-black">
            {tableHeading || 'Table heading'}
          </Heading> */}
                </div>

                <div className="flex">
                    <Link to={link} className="font-semibold mt-2 mb-2 sm:ms-6 border-b-4  border-[#1c4dcc] text-[#1c4dcc] select-none">
                        View All
                    </Link>
                </div>
            </div>

            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        {
                            tableHeaderText.map((item, index) => (
                                <Th key={index}>
                                    <Heading as={'h2'} size={'sm'} >
                                        {item}
                                    </Heading>
                                </Th>
                            ))
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        tableData.length && tableData.map(({ firstName, lastName, createdAt, clientEmail, phone }, index) => (
                            <Tr key={index}>
                                <Td className="flex gap-2 items-center tracking-wide lowercase font-medium text-gray-600">
                                    {userIcon()} {/* This function returns icon in svg for user */}
                                    {`${firstName} ${lastName}` || 'no name'}
                                </Td>
                                <Td className="tracking-wide lowercase font-medium text-gray-600">{new Date(createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}</Td>
                                <Td className="tracking-wide lowercase font-medium text-gray-600">{clientEmail}</Td>
                                <Td className="tracking-wide lowercase font-medium text-gray-600">{phone}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ClientTable;

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

