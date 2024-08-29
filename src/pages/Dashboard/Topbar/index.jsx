// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../../hooks/useAuthContext';
// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Text,
//   useColorMode,
// } from '@chakra-ui/react';
// import { ChevronDownIcon, Moon, Sun } from 'lucide-react';
// import { useLogout } from '../../../hooks/useLogout';

// const Topbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const { logout } = useLogout();
//   const navigate = useNavigate();
//   const { user } = useAuthContext();
//   const [userSettingData, setUserSettingData] = useState(null);
//   const options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     weekday: 'long',
//   };
//   const today = new Date();
//   const formatter = new Intl.DateTimeFormat('en-GB', options);
//   const formattedDate = formatter.format(today);

//   const logoutHandler = () => {
//     logout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     setUserSettingData(JSON.parse(localStorage.getItem('User')));
//   }, []);

//   return (
//     <Box bg="brand.primary" position={'sticky'} top={0} zIndex={9999} py={5} px="30px">
//       <Flex justifyContent="space-between" alignItems="center">
//         <Flex flexDirection="column">
//           <Text fontSize="2xl">Overview</Text>
//           <Text>{`${formattedDate}`}</Text>
//         </Flex>

//         <Flex alignItems="flex-end">
//           <Flex alignItems="center" gap="8px">
//             <Avatar name={user?.data?.name} src="" bg="brand.secondary" />
//             <Flex flexDirection="column">
//               <Text textTransform={'capitalize'} fontWeight={600} fontSize="24px">
//                 {user?.data?.name}
//               </Text>
//               <Text textTransform={'capitalize'} fontWeight={600} fontSize="16px">
//                 {user?.data?.roles?.name}
//               </Text>
//             </Flex>

//             <Menu>
//               <MenuButton
//                 as={Button}
//                 size="xs"
//                 bg="brand.primary"
//                 rightIcon={<ChevronDownIcon color="white" />}
//               ></MenuButton>
//               <MenuList color="brand.primary">
//                 <MenuItem onClick={() => navigate('/dashboard/usersettings')}>
//                   <Link to="/dashboard/usersettings">User Profile</Link>
//                 </MenuItem>
//                 <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//               </MenuList>
//             </Menu>
//             <Button onClick={toggleColorMode}>{colorMode === 'light' ? <Moon /> : <Sun />}</Button>
//           </Flex>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default Topbar;

import { Search2Icon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { CiSquareChevDown } from 'react-icons/ci';
import { IoNotificationsOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLogout } from '../../../hooks/useLogout';
import { BiLogOut } from "react-icons/bi";


const Header = ({ onOpen, user }) => {
  const { logout } = useLogout();
  return (
    <header className="bg-white text-black  p-4 rounded-2xl mt-2 mx-4">
      <Box className="flex gap-4 border-b-2 pb-2 border-[#1C4DCC]">
        <label className="select-none mt-2 capitalize text-sm text-gray-600">Today</label>
        <Divider orientation="vertical" className="mt-3 bg-gray-400 !h-4" />
        <label className="select-none mt-2 capitalize text-sm text-gray-600">weekly</label>
        <Divider orientation="vertical" className="mt-3 bg-gray-400 !h-4" />
        <label className="select-none mt-2 capitalize text-sm text-gray-600">monthly</label>
      </Box>
      <Box className="flex items-center justify-between mt-3">
        <Box className="hidden lg:block">
          <Heading as={'h1'} size={'md'}>
            Overview
          </Heading>
          <Text>20 oct 2024, wednesdary</Text>
        </Box>

      <Box className="block lg:hidden z-10">
        <Button onClick={onOpen} >
          <RxHamburgerMenu size={28} />
        </Button>
      </Box>

        <Box className="flex items-center gap-4">
          <InputGroup className="hidden md:block">
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Typee To search"
              _focus={{ outline: 'none', boxShadow: 'none', border: 'none' }}
              borderRadius={200}
              className="!bg-slate-100 rounded-xl !focus:border-none !focus:outline-none"
            />
          </InputGroup>

          <FiSettings className="text-lg md:text-xl !hidden !md:block" />
          <IoNotificationsOutline className="text-lg md:text-xl !hidden !md:block" />

          <Avatar
            size="md"
            className="rounded-xs"
            borderRadius="10"
            name={user ? user.data?.name : "Jhon Doe"}
            src={user.data ? user.data?.userImage : 'https://bit.ly/dan-abramov'}
          />
          <Box className='min-w-28'>
            <Text className="font-semibold text-sm">{user ? user.data?.name : "Jhon Doe"}</Text>
            <Text className="font-semibold text-sm">{user ? user.data?.role : "role area"}</Text>
          </Box>
          <Menu isLazy placement="bottom-end">
            <MenuButton className="hover:bg-gray-100 p-2 rounded-full">
              <CiSquareChevDown />
            </MenuButton>
            <MenuList
              minWidth="120px"
              sx={{
                margin: '-0.5rem 12px 0px 0px',
              }}
            >
              <MenuItem className="text-sm w-full capitalize">
                <FiSettings className="text-lg md:text-xl !block !md:hidden me-2" />
                notification
              </MenuItem>
              <MenuItem className="text-sm w-full capitalize">
                <IoNotificationsOutline className="text-lg md:text-xl !block !md:hidden me-2" />
                setting
              </MenuItem>
              <MenuItem className="text-sm !bg-red-900 !text-white w-full" onClick={logout}>
                <BiLogOut className="text-lg md:text-xl !block !md:hidden me-2" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
