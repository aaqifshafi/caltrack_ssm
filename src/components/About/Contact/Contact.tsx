/* eslint-disable max-len */
import {
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

const Contact: FC = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const handleSend = () => {
    setEmailError(!email.includes("@"));
    if (email.includes("@")) {
      onOpen();
      setEmail("");
    }
  };

  return (
    <VStack gap={4} w="100%" maxW="xl" mx="auto" py={8}>
      <Heading as="h2" size="xl">
        Contact Us
      </Heading>
      <Text textAlign="center">
        Have questions or want to get in touch? Leave your email below and we'll
        reach out to you as soon as possible!
      </Text>

      <VStack w="100%" spacing={4} py={4}>
        <FormControl isInvalid={emailError}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={AiOutlineMail} boxSize="20px" color="gray.500" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          {emailError && (
            <FormErrorMessage>Email address is not valid.</FormErrorMessage>
          )}
        </FormControl>

        {isOpen ? (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Thank you!</AlertTitle>
              <AlertDescription>
                We've received your email. A representative will get back to you
                soon.
              </AlertDescription>
            </Box>
            <CloseButton
              onClick={onClose}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        ) : (
          <Button onClick={handleSend} colorScheme="purple" w="100%">
            Send Message
          </Button>
        )}
      </VStack>
    </VStack>
  );
};

export default Contact;
