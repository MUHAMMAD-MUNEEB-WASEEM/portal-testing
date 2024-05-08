import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const AuthHeading = ({ headingTitle, headingText }) => {
  return (
    <Box as="div" textAlign="center" color="white">
      <Heading as="h2" size="xl">
        {headingTitle}
      </Heading>
      <Flex justifyContent="center">
        <Text w="70%" color="brand.lightText" textAlign="center">
          {headingText}
        </Text>
      </Flex>
    </Box>
  );
};

export default AuthHeading;
