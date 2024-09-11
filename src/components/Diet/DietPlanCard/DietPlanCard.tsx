import React, { FC } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
interface DietPlanCardProps {
  plan: { title: string; description: string; createdOn: string };
  onDelete: () => void;
}

const DietPlanCard: FC<DietPlanCardProps> = ({ plan, onDelete }) => {
  return (
    <Box boxShadow="md" bg="gray.50">
      <Box p={4}>
        <Heading as="h3" size="md" color="teal.600">
          {plan.title}
        </Heading>
      </Box>
      <Divider />
      <Box p={4}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {plan.description}
        </ReactMarkdown>
        <Text fontSize="sm" color="cyan.600">
          {moment(plan.createdOn, "YYYYMMDD_HHmmss").format("MMMM Do, YYYY")}
        </Text>
        <Center mt={4}>
          <IconButton
            aria-label="Delete Plan"
            icon={<FaTrash />}
            colorScheme="red"
            onClick={onDelete}
          />
        </Center>
      </Box>
    </Box>
  );
};

export default DietPlanCard;
