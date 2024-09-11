import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactElement, FC } from "react";
import {
  FcManager,
  FcDisplay,
  FcVip,
  FcBullish,
  FcMindMap,
} from "react-icons/fc";
import Feature from "../Feature/Feature";

const FeaturesList: FC = (): ReactElement => {
  return (
    <Box p={8} py={20} w="100%">
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading color="brand.green" fontSize="4xl" fontWeight={"bold"}>
          OUR FEATURES
        </Heading>
        <Text color={"gray.500"}>
          Explore our state-of-the-art fitness and health tracking features,
          calorie tracking, Diet Recommendations, Expert advices, and much more.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Feature
            heading="Tracker"
            icon={<Icon as={FcDisplay} w={10} h={10} />}
            description="Track your daily calories to achive your fitness goals."
          />

          <Feature
            heading="Goals"
            icon={<Icon as={FcBullish} w={10} h={10} />}
            description="Achieve your fitness goals by setting goals and tracking your progress."
          />
          <Feature
            heading="AI Nutrition"
            icon={<Icon as={FcMindMap} w={10} h={10} />}
            description="Get personalized nutrition recommendations based on your goals."
          />
          <Feature
            heading="Premium Plans"
            icon={<Icon as={FcVip} w={10} h={10} />}
            description="Get your hands on our premium plans for exclusive features."
          />

          <Feature
            heading="Expert Dietitians"
            icon={<Icon as={FcManager} w={10} h={10} />}
            description="Get on call with our expert Dietitians who will help you with customized diet plan and health advices based on your goals."
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default FeaturesList;
