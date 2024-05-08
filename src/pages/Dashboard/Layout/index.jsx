import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import ErrorBoundary from '../../../components/ErrorBoundaries/ErrorBoundary';
import { Box, Flex } from '@chakra-ui/react';

const Layout = (props) => {
  return (
    <Flex h="100vh" color="white" overflow="hidden">
      <aside>
        <Sidebar />
      </aside>
      <Flex direction="column" w="full" overflowY="scroll">
        <Topbar />
        <Box as="div" px="5">
          <ErrorBoundary>{props.children}</ErrorBoundary>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

// bg={'#121212'}
