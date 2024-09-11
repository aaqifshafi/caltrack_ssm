import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer: FC = (): ReactElement => {
  const toast = useToast();

  const handleSocials = (network: string) => {
    toast({
      title: `We are not on ${network} yet!`,
      description: "Stay tuned and follow us when we become live!",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
      variant: "subtle",
    });
  };

  return (
    <Box color="gray.500" borderTopWidth={1} borderStyle="solid" mt={10}>
      <Container
        as={Stack}
        maxW="6xl"
        pt={5}
        spacing={4}
        justify="center"
        align="center"
      >
        <Image
          // eslint-disable-next-line max-len
          src="/src/assets/logo.png"
          h="50px"
        />
      </Container>
      <HStack justify="center" mt={2} flexWrap="wrap">
        <Link to="/">Home</Link>
        <Link to="activity">Activity</Link>
        <Link to="goals">Goals</Link>
        <Link to="community">Community</Link>
        <Link to="about">About</Link>
      </HStack>
      <Box>
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 - Caltrack. All rights reserved</Text>
          <Stack direction="row" spacing={6}>
            <Icon
              as={BsFacebook}
              bg="transparent"
              onClick={() => handleSocials("Facebook")}
            />
            <Icon
              as={BsTwitter}
              bg="transparent"
              onClick={() => handleSocials("Twitter")}
            />
            <Icon
              as={BsLinkedin}
              bg="transparent"
              onClick={() => handleSocials("LinkedIn")}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
