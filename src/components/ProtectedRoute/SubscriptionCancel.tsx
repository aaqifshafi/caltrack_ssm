import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
} from "@chakra-ui/react";

const CancelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <VStack spacing={4} maxWidth="400px" width="100%">
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Subscription Cancelled</AlertTitle>
            <AlertDescription>
              Your subscription process has been cancelled. No changes have been
              made to your account.
            </AlertDescription>
          </Box>
        </Alert>
        <HStack spacing={4}>
          <Button onClick={() => navigate("/")} colorScheme="blue">
            Return to Home
          </Button>
          <Button onClick={() => navigate("/diet")} variant="outline">
            Buy Premium
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CancelPage;
