import { Heading } from '@chakra-ui/react';
const DashboardHeading = ({ children }) => {
  return (
    <Heading as="h1" fontSize={28} className='text-blue-700'>
      {children}
    </Heading>
  );
};

export default DashboardHeading;
