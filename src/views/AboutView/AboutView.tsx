import { FC, ReactElement } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  VStack,
  Image,
  Heading,
} from "@chakra-ui/react";
import Contact from "../../components/About/Contact/Contact";
import FAQ from "../../components/About/FAQ/FAQ";

const AboutView: FC = (): ReactElement => {
  return (
    <VStack>
      <VStack gap={5} py={6}>
        <Image
          // eslint-disable-next-line max-len
          src="/src/assets/logo.png"
          h={{ base: "80px", md: "120px" }}
        />
        <Heading as="h1" size={{ base: "2xl", md: "3xl" }}>
          About us
        </Heading>
      </VStack>
      <Tabs align="center" w="100%">
        <TabList>
          <Tab w="200px">FAQ</Tab>
          <Tab w="200px">Contact</Tab>
        </TabList>

        <TabPanels w={{ sm: "100%", lg: "80%" }} py={5}>
          <TabPanel>
            <FAQ />
          </TabPanel>
          <TabPanel>
            <Contact />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default AboutView;
