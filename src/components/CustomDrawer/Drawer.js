import './drawer.css';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Image,
  Menu,
  MenuItem,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardHorizontalLine } from 'react-icons/ri';

const routes = [
  {
    path: '/',
    title: 'dashboard',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/clients',
    title: 'clients',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/projects',
    title: 'projects',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/sub-projects',
    title: 'sub projects',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/invoice',
    title: 'invoice',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/items',
    title: 'items',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/user-management',
    title: 'user management (BUH)',
    icon: <RiDashboardHorizontalLine />,
  },
  {
    path: '/brand-management',
    title: 'brand management',
    icon: <RiDashboardHorizontalLine />,
  },
];

const CustomDrawer = () => {
  return (
    <Box className="w-full h-[90vh] bg-blue-700 rounded-tr-[2.5rem] rounded-br-[2.5rem]">
      <Box boxSize="xs" className="flex justify-center items-center mx-auto">
        <Image
          src="https://www.inviztechnologies.net/images/ilogo.png"
          alt="logo"
          className="w-52"
        />
      </Box>
      <Menu size="xs">
        {routes.map((v, i) => (
          <MenuItem
          key={i}
            backgroundColor={'transparent'}
            height={'4vh'}
            className="text-md !text-white font-bold tracking-wider hover:ms-12 ms-8 !transition-all"
          >
            <NavLink to={v.path} className="w-full h-full flex items-center ps-4 gap-4">
              <RiDashboardHorizontalLine size={24} /> <span>{v.title}</span>
            </NavLink>
          </MenuItem>
        ))}
        
      </Menu>
    </Box>
  );
};

export default CustomDrawer;

function MobileDrawer({ isOpen, onOpen, onClose }) {
  const [placement, setPlacement] = React.useState('left');

  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className='overflow-hidden !bg-blue-700'>
          <DrawerBody>
            <CustomDrawer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export {MobileDrawer}