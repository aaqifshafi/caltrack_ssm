import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { handleSubscriptionSuccess } from "../../services/payment.services";
import {
  Box,
  VStack,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext/AppContext";

const SuccessPage: React.FC = () => {
  const { userData } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const updateSubscription = async () => {
      const params = new URLSearchParams(location.search);
      const priceId = params.get("price_id");

      if (!user || !priceId || !userData?.handle) {
        setError("Missing required information");
        setIsProcessing(false);
        return;
      }

      try {
        await handleSubscriptionSuccess(userData.handle, priceId);
        setSubscriptionType(
          priceId.includes("ultra") ? "Ultra Premium" : "Premium"
        );
        setIsProcessing(false);
      } catch (error) {
        setError("Failed to update subscription");
        setIsProcessing(false);
      }
    };

    updateSubscription();
  }, [location, user, userData]);

  if (isProcessing) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="lg" fontWeight="semibold">
            Processing your subscription...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <VStack spacing={4} maxWidth="400px" width="100%">
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => navigate("/")} colorScheme="blue">
            Return to Home
          </Button>
        </VStack>
      </Box>
    );
  }

  if (subscriptionType) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <VStack spacing={4} maxWidth="400px" width="100%">
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Subscription Successful!</AlertTitle>
              <AlertDescription>
                Thank you for subscribing to our {subscriptionType} plan. Your
                account has been upgraded.
              </AlertDescription>
            </Box>
          </Alert>
          <Button onClick={() => navigate("/")} colorScheme="blue">
            Go to Activity
          </Button>
        </VStack>
      </Box>
    );
  }

  return null;
};

export default SuccessPage;
