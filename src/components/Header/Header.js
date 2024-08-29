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
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { CiSquareChevDown } from 'react-icons/ci';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <nav className="container mx-auto bg-white text-black  w-full p-4 rounded-md">
      <Box className="flex gap-4 border-b-2 pb-2 border-[#1C4DCC]">
        <label className="select-none mt-2 capitalize text-sm text-gray-600">Today</label>
        <Divider orientation="vertical" className="mt-3 bg-gray-400 !h-4" />
        <label className="select-none mt-2 capitalize text-sm text-gray-600">weekly</label>
        <Divider orientation="vertical" className="mt-3 bg-gray-400 !h-4" />
        <label className="select-none mt-2 capitalize text-sm text-gray-600">monthly</label>
      </Box>
      <Box className="flex items-center justify-between mt-3">
        {/* <Box>
          <Heading as={'h1'} size={'md'}>
            Overview
          </Heading>
          <Text>20 oct 2024, wednesdary</Text>
        </Box> */}
        <Box className='block lg:hidden z-10'>
          <Button colorScheme="blue" onClick={onOpen}>
            Menu
          </Button>
        </Box>

       
        <Box className="flex items-center gap-4">
          <InputGroup>
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

          <FiSettings size={32} />
          <IoNotificationsOutline size={32} />

          <Avatar
            size="md"
            className="rounded-xs"
            borderRadius="10"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Box>
            <Text className="font-semibold text-sm">Neymar JR</Text>
            <Text className="font-semibold text-sm">Designation</Text>
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
              <MenuItem className="text-sm w-full">Item-1</MenuItem>
              <MenuItem className="text-sm w-full">Item-2</MenuItem>
              <MenuItem className="text-sm w-full">Item-3</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </nav>
  );
};

export default Header;
