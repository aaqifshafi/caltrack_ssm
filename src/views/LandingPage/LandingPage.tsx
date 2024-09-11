import { FC } from "react";
import Hero from "../../components/LandingPage/Hero/Hero";
import { VStack } from "@chakra-ui/react";
import FeaturesList from "../../components/LandingPage/FeaturesList/FeaturesList";

const LandingPage: FC = () => {
  return (
    <VStack>
      <Hero />
      <FeaturesList />
    </VStack>
  );
};

export default LandingPage;
