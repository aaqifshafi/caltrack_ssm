import { FC, ReactElement } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
// import WeightLoss from "./WeightLoss";
// import MuscleGain from "./MuscleGain";

const DietTabs: FC<{ weightLossPlans: any[]; muscleGainPlans: any[] }> = ({
  weightLossPlans,
  muscleGainPlans,
}): ReactElement => (
  <Tabs align="center" w="100%">
    <TabList>
      <Tab w="200px">Weight Loss</Tab>
      <Tab w="200px">Muscle Gain</Tab>
    </TabList>

    <TabPanels w={{ sm: "100%", lg: "80%" }} py={5}>
      <TabPanel>{/* <WeightLoss plans={weightLossPlans} /> */}</TabPanel>
      <TabPanel>{/* <MuscleGain plans={muscleGainPlans} /> */}</TabPanel>
    </TabPanels>
  </Tabs>
);

export default DietTabs;
