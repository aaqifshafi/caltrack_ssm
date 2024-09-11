import { FC, ReactElement } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";
import CalorieIntake from "../../components/Activity/CalorieIntake/CalorieIntake";
import WaterIntake from "../../components/Activity/WaterIntake/WaterIntake";

const ActivityView: FC = (): ReactElement => {
  return (
    <VStack gap={5} w="100%" align="center">
      <ActivityLogger />
      <Flex justifyContent="center" wrap="wrap" gap={3} w="100%">
        <CalorieIntake />
        <WaterIntake />
      </Flex>
    </VStack>
  );
};

export default ActivityView;
