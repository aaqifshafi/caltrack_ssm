import { FC, ReactElement, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Avatar,
  VStack,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Select,
  useToast,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ExpertCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
}

const ExpertCard: FC<ExpertCardProps> = ({
  name,
  specialty,
  imageUrl,
}): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");

  const timeSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTimeRange) {
      toast({
        title: "Error",
        description: "Please select a valid date and time range.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Handle the schedule logic here
    toast({
      title: "Request Recorded",
      description: `Your request has been recorded. Our team will reach out to you on ${selectedDate.toLocaleDateString()} between ${selectedTimeRange}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
        <HStack spacing={4} align="center">
          <Avatar size="xl" name={name} src={imageUrl} />
          <VStack align="start" spacing={2}>
            <Heading as="h3" size="md">
              {name}
            </Heading>
            <Text fontSize="sm" color="gray.600">
              {specialty}
            </Text>
            <Button colorScheme="blue" size="sm" onClick={onOpen}>
              Schedule Zoom call
            </Button>
          </VStack>
        </HStack>
      </Box>

      {/* Modal for scheduling */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule a Zoom Call</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Select a date:</Text>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              minDate={new Date()}
              isClearable
            />

            <Text mt={4} mb={2}>
              Select a time range (2-hour span):
            </Text>
            <Select
              placeholder="Select time range"
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              value={selectedTimeRange}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSchedule}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExpertCard;
