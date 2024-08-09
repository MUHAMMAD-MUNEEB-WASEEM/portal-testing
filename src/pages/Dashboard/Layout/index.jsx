// import Sidebar from '../Sidebar';
// import Topbar from '../Topbar';
// import ErrorBoundary from '../../../components/ErrorBoundaries/ErrorBoundary';
// import { Box, Flex } from '@chakra-ui/react';

// const Layout = (props) => {
//   return (
//     <Flex h="100vh" color="white" overflow="hidden">
//       <aside>
//         <Sidebar />
//       </aside>
//       <Flex direction="column" w="full" overflowY="scroll">
//         <Topbar />
//         <Box as="div" px="5">
//           <ErrorBoundary>{props.children}</ErrorBoundary>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// };

// export default Layout;

// // bg={'#121212'}

import Sidebar, { MobileDrawer } from '../Sidebar';
import Topbar from '../Topbar';
import ErrorBoundary from '../../../components/ErrorBoundaries/ErrorBoundary';
import { Box, Button, Drawer, Flex, useDisclosure } from '@chakra-ui/react';

const Layout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex h="100vh" color="white" overflow="hidden" className='!bg-gray-200'>
      <aside>
        <div className="col-span-4 md:col-span-1 !p-0">
          <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          <span className="hidden lg:block">
            <Sidebar />
          </span>
        </div>
      </aside>
      <Flex direction="column" w="full" overflowY="scroll">
        <Topbar onOpen={onOpen} />
        <Box as="div" px="5">
          <ErrorBoundary>{props.children}</ErrorBoundary>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

// bg={'#121212'}
