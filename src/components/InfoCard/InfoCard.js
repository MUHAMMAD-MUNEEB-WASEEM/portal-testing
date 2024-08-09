import React from 'react';
import { Card, CardBody, CardHeader, Heading, Text, Box } from '@chakra-ui/react';

const InfoCard = ({ title, amount = '', icon, number, type= '' }) => (
  <Card shadow="none" borderRadius="xl" className=' h-auto sm:h-[20vh]'>
    <CardHeader className="mb-[-18px] flex items-center justify-between">
      <Heading size="md" className='capitalize'>{title || 'Information'}</Heading>
      <span className={`${type === 'warning' && 'text-orange-600'} ${type === 'danger' && 'text-red-600'} ${type === 'info' && 'text-slate-600'}`}>
        {icon}
      </span>
    </CardHeader>
    <CardBody>
      <Box className='flex justify-between items-center'>
        <Text className='text-black font-semibold'>No of {title}: </Text>
        <Text className='text-black font-semibold'>{number || ''}</Text>
      </Box>
      <Box>
        <Text className='text-black font-semibold capitalize'>total amount</Text>
        {/* <Text>{amount || ''}</Text> */}
      </Box>
      <Box>
        <Heading size='md' className={`text-md ${type === 'warning' && 'text-orange-600'} ${type === 'danger' && 'text-red-600'} ${type === 'info' && 'text-slate-600'}`}>${amount}</Heading>
      </Box>
    </CardBody>
  </Card>
);

export default InfoCard;
