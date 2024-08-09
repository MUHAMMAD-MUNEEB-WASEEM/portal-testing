import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { TiChartArea } from 'react-icons/ti';
import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider,
  Text,
  Heading,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from '@chakra-ui/react';

const CustomViewCard = ({ headText, menuItems = [], amount, percentage }) => {

  return (
    <Card className="!shadow-none rounded-xl">
      <CardHeader className="flex justify-between">
        <Text size="md" className="font-bold text-xs uppercase">
          {headText || 'No Head Text'}
        </Text>
        <Menu isLazy placement="bottom-end">
          <MenuButton className="hover:bg-gray-100 p-2 rounded-full">
            <HiOutlineDotsVertical />
          </MenuButton>
          <MenuList
            minWidth="120px"
            sx={{
              margin: '-0.5rem 12px 0px 0px',
            }}
          >
            {Array.isArray(menuItems) &&
              menuItems.length &&
              menuItems.map((item, i) => (
                <MenuItem className="text-sm w-full" key={i}>
                  {item}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </CardHeader>

      <CardBody className="mt-[-12px]">
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="md" textTransform="uppercase">
              $ {amount ? String(Number(amount).toFixed(2)) : '00.00'}
            </Heading>
          </Box>
          <Box className="flex items-center justify-between">
            <Heading size="xs" className={`${!(amount >= 0) ? 'text-red-600' : 'text-purple-600'}`}>
              <span>{percentage || '00.00'}</span>%
            </Heading>
            <div>
              <TiChartArea size={32} className={`${!(percentage >= 0) ? 'text-red-600' : 'text-purple-600'}`}/>
            </div>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CustomViewCard;
