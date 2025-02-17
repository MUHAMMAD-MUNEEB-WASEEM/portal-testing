import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';
import { useLogout } from '../../hooks/useLogout';
import { Box, Button, Flex, Image, ListItem, UnorderedList } from '@chakra-ui/react';
import { InvizLogo, PaktechLogo } from '../../images';

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="center"
      as="div"
      bgGradient="linear(to-b, brand.primary,brand.secondary)"
      py="18px"
      px="4px"
    >
      <Flex
        as="nav"
        minW="75%"
        color="brand.text"
        justifyContent="space-between"
        alignItems="center"
        gap="50px"
      >
        <Box w="150px">
          <Link to="/">
            <Image src={PaktechLogo} alt="logo" />
          </Link>
        </Box>

        <Box as="div">
          <UnorderedList display="flex" listStyleType="none" alignItems="center">
            {!user ? (
              <ListItem>
                <Button bg="brand.secondary" color="brand.text" onClick={() => navigate('/login')}>
                  Signin
                </Button>
              </ListItem>
            ) : (
              <ListItem onClick={logout}>
                <a href="#">Logout</a>
              </ListItem>
            )}
          </UnorderedList>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
