import React, { FC } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import WeightLoss from "../WeightLoss/WeighLoss";
import MuscleGain from "../MuscleGain/MuscleGain";

const ExpertTabs: FC = () => {
  return (
    <>
      <VStack spacing={5} py={6} align="center">
        <HStack spacing={4} align="center">
          <Heading as="h1" size={{ base: "2xl", md: "2xl" }}>
            Ultra Premium Expert Consultations
          </Heading>
        </HStack>
        <Text textAlign="center" px={4}>
          Schedule a call with our experts to get personalized advice for your
          fitness journey.
        </Text>
      </VStack>
      <Tabs align="center" w="100%">
        <TabList>
          <Tab w="200px">Weight Loss</Tab>
          <Tab w="200px">Muscle Gain</Tab>
        </TabList>

        <TabPanels w={{ sm: "100%", lg: "80%" }} py={5}>
          <TabPanel>
            <WeightLoss />
          </TabPanel>
          <TabPanel>
            <MuscleGain />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ExpertTabs;
