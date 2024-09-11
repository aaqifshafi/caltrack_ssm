import { FC, ReactElement } from "react";
import { VStack } from "@chakra-ui/react";
import ExpertCard from "../ExpertCard/ExpertCard";

const MuscleGainExperts: FC = (): ReactElement => (
  <VStack spacing={4} w="100%">
    <ExpertCard
      name="Sarah Thompson"
      specialty="Strength Training Coach"
      imageUrl="/assets/expert3.jpg"
    />
    <ExpertCard
      name="Dr. Michael Lee"
      specialty="Sports Nutritionist"
      imageUrl="/assets/expert4.jpg"
    />
  </VStack>
);

export default MuscleGainExperts;
