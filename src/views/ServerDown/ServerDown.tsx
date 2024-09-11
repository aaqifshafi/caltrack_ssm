import { Heading, Text, VStack, Button, Image } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router";

const ServerDown: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <VStack w="100%" align="center" justify="center" mt={20} gap={4}>
      <Image
        // eslint-disable-next-line max-len
        src={"/src/assets/logo.png."}
        w="100px"
        h="100px"
      />
      <Heading
        textAlign="center"
        lineHeight={1.1}
        fontWeight={900}
        fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
      >
        <Text as={"span"}>Error 500</Text>
        <br />
        <Text as={"span"} color={"brand.red"}>
          Server Down
        </Text>
      </Heading>
      <Text>
        Uh-Oh... our server is currently having some issues... We are sure that
        it will be up and running in no time!
      </Text>
      <Text>Please try again a bit later!</Text>
      <Button colorScheme="teal" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </VStack>
  );
};

export default ServerDown;
