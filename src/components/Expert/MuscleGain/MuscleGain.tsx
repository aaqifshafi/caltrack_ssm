import { FC, ReactElement } from "react";
import { VStack } from "@chakra-ui/react";
import ExpertCard from "../ExpertCard/ExpertCard";

const WeightLoss: FC = (): ReactElement => (
  <VStack spacing={4} w="100%">
    <ExpertCard
      name="Dr. Emily Johnson"
      specialty="Weight Loss Specialist"
      imageUrl="/assets/expert1.jpg"
    />
    <ExpertCard
      name="Mark Davis"
      specialty="Nutritionist"
      imageUrl="/assets/expert2.jpg"
    />
  </VStack>
);

export default WeightLoss;
