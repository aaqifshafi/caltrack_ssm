import React, { FC } from "react";
import { VStack, Center, Heading, Text, Button, Box } from "@chakra-ui/react";
import { FaCrown } from "react-icons/fa";

interface PremiumUpgradeProps {
  onClick: () => void;
}

const PremiumUpgrade: FC<PremiumUpgradeProps> = ({ onClick }) => {
  return (
    <VStack spacing={6} h="100vh" justify="center" align="center">
      <Center
        flexDirection="column"
        p={6}
        bg="white"
        borderRadius="md"
        boxShadow="md"
        border="1px"
        borderColor="gray.200"
      >
        <Heading
          color={"purple.600"}
          as="h1"
          size="2xl"
          textAlign="center"
          mb={4}
        >
          Premium Content
        </Heading>
        <Text color="brand.grey" textAlign="center" px={4} mb={4}>
          Upgrade to a Premium membership to access AI-generated diet plans.
        </Text>
        <Box mb={4} p={4} bg="gray.50" borderRadius="md">
          <Center>
            <Heading as="h2" size="lg" color="blue.500">
              ₹99
            </Heading>
            <Text color="gray.600" mt={2}>
              {"  /"}
              per month
            </Text>
          </Center>
        </Box>
        <Button
          onClick={onClick}
          colorScheme="blue"
          size="lg"
          rightIcon={<FaCrown color="yellow.400" />}
        >
          Get Premium Now
        </Button>
      </Center>
    </VStack>
  );
};

export default PremiumUpgrade;
