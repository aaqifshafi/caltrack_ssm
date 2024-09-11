import { FC, ReactElement } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import PersonalizedDietForm from "../PersonalizedDietForm/PersonalizedDietForm";
import { ActivityLevel, WeightGoal } from "../../../common/enums";

// Define the type for the preferences parameter
interface Preferences {
  dietaryRestrictions: string;
  fitnessGoals: WeightGoal;
  activityLevel: ActivityLevel;
  foodPreferences: string;
}

const PersonalizedDietModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (preferences: Preferences) => void;
}> = ({ isOpen, onClose, onGenerate }): ReactElement => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Personalize Your Diet</ModalHeader>
      <ModalBody>
        {/* Pass the onGenerate function as the onSubmit handler */}
        <PersonalizedDietForm onSubmit={onGenerate} />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default PersonalizedDietModal;
