import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../hooks/useLogout';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import { InvizLogo } from '../../../images';

import {
  BookUser,
  Building2,
  CircleDollarSign,
  DoorClosed,
  FileText,
  KanbanSquare,
  Layers,
  LayoutDashboard,
  LogOut,
  Users,
} from 'lucide-react';

const links = [
  {
    id: 'dashboard',
    path: '/dashboard/main',
    icon: <LayoutDashboard size={16} />,
    text: 'Dashboard',
  },
  { id: 'clients', path: '/dashboard/clients', icon: <BookUser size={16} />, text: 'Clients' },
  // {
  //   id: 'projects',
  //   path: '/dashboard/projects',
  //   icon: <KanbanSquare size={16} />,
  //   text: 'Projects',
  // },
  // {
  //   id: 'invoices',
  //   path: '/dashboard/allinvoices',
  //   icon: <FileText size={16} />,
  //   text: 'Invoices',
  // },
  {
    id: 'invoices',
    path: '/dashboard/invoices',
    icon: <FileText size={16} />,
    text: 'Invoices',
  },
  // { id: 'items', path: '/dashboard/predefineditems', icon: <Layers size={16} />, text: 'Items' },
  {
    id: 'admin-users',
    path: '/dashboard/user-managment',
    icon: <Users size={16} />,
    text: 'Users',
  },
  {
    id: 'RolesAndPermissions',
    path: '/dashboard/roles',
    icon: <DoorClosed size={16} />,
    text: 'Roles',
  },
  {
    id: 'admin-brands',
    path: '/dashboard/brand-managment',
    icon: <Building2 size={16} />,
    text: 'Brands',
  },
  {
    id: 'admin-clients',
    path: '/dashboard/client-managment',
    icon: <BookUser size={16} />,
    text: 'Clients',
  },
  // {
  //   id: 'admin-projects',
  //   path: '/dashboard/project-managment',
  //   icon: <KanbanSquare size={16} />,
  //   text: 'Projects',
  // },
  {
    id: 'admin-leads',
    path: '/dashboard/all-leads',
    icon: <KanbanSquare size={16} />,
    text: 'All Leads',
  },
  {
    id: 'leads',
    path: '/dashboard/leads',
    icon: <KanbanSquare size={16} />,
    text: 'Leads',
  },
  {
    id: 'admin-invoices',
    path: '/dashboard/invoice-managment',
    icon: <FileText size={16} />,
    text: 'Invoices',
  },
  {
    id: 'admin-monetary',
    path: '/dashboard/monetary-managment',
    icon: <CircleDollarSign size={16} />,
    text: 'Monetary',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    if (user?.data?.roles && user?.data?.roles.modulePermissions) {
      const userReadPermissions = user?.data?.roles?.modulePermissions
        .filter((e) => e?.actions.read)
        .map((e) => e?.module?.name);

      // console.log(links.filter((link) => userReadPermissions.includes(link.id)));

      setFilteredLinks(links?.filter((link) => userReadPermissions.includes(link.id)));
    }
  }, [user]);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      h="100%"
      pt="2rem"
      pb="8rem"
      bgColor="brand.primary"
      position="sticky"
      top="0"
      width="15vw"
      overflowY="scroll"
      overflowX="hidden"
      css={{
        '&::-webkit-scrollbar': {
          width: '1em',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
          boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3);',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '24px',
          backgroundColor: 'brand.primary',
          opacity: 0.6,
          outline: '1px solid #1b9de4',
        },
      }}
    >
      <Flex justify="center">
        <Image w={'60%'} objectFit={'contain'} src={InvizLogo} alt="Logo" />
      </Flex>

      <Flex mt="4" flexDir="column" align="center" gap="3" h="80vh">
        {filteredLinks &&
          filteredLinks.map((link, index) => (
            <Link
              as={NavLink}
              borderRadius="8px"
              w="80%"
              py="16px"
              px="12px"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: '12px',
                _hover: {
                  color: 'white',
                  backgroundColor: 'brand.secondary',
                },
                transition: 'all',
                animationDuration: '300',
              }}
              to={link.path}
              key={index}
              style={({ isActive }) => ({
                borderBottom: isActive ? '#1b9de4 solid 4px' : '',
                opacity: isActive ? 1 : '',
              })}
            >
              {link.icon}
              <Text>{link.text}</Text>
            </Link>
          ))}
        <Link
          w="80%"
          py="16px"
          px="12px"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '12px',
            _hover: {
              color: 'white',
              backgroundColor: 'brand.secondary',
            },
            transition: 'all',
            animationDuration: '300',
          }}
          onClick={logoutHandler}
          to="/login"
        >
          <LogOut size={16} />
          <Text>Logout</Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Sidebar;
