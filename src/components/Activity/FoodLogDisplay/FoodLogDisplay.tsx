import { FC, useContext } from "react";
import { Badge, Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { IoMdRemove } from "react-icons/io";
import { ITodayLog } from "../../../common/types";
import { unlogFood } from "../../../services/food.services";
import { AppContext } from "../../../context/AppContext/AppContext";
import { WATER, badgeColorScheme } from "../../../common/constants";
import { get } from "firebase/database";

// Hash function to assign a consistent color based on food name
const getColorForFood = (foodName: string) => {
  let hash = 212334456576978;
  for (let i = 0; i < foodName.length; i++) {
    hash = (hash << 5) - hash + foodName.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % badgeColorScheme.length;
  return index;
};

const FoodLogDisplay: FC<{ todayLog: ITodayLog | null }> = ({ todayLog }) => {
  const { userData } = useContext(AppContext);

  const handleUnlog = (foodName: string) => {
    unlogFood(userData!.handle, foodName);
  };

  if (todayLog && todayLog.calories) {
    const { water: todayWater, ...todayCalories } = todayLog.calories;

    return (
      <VStack align="start" pb={2}>
        {todayWater && (
          <Box
            key={WATER}
            w="100%"
            px={{ base: 0, md: 4 }}
            py={2}
            display={{ base: "block", xl: "flex" }}
          >
            <Badge colorScheme="blue" h="fit-content" p={2} rounded="full">
              {WATER}:
            </Badge>
            <HStack w="100%" justify="right" pt={2}>
              <Text>{todayWater} ml</Text>
              <IconButton
                size="xs"
                icon={<IoMdRemove />}
                colorScheme="red"
                aria-label="remove activity"
                onClick={() => handleUnlog(WATER)}
              />
            </HStack>
          </Box>
        )}
        {Object.entries(todayCalories).map(([foodName, kcal]) => (
          <Box
            key={foodName}
            w="100%"
            px={{ base: 0, md: 4 }}
            py={2}
            display={{ base: "block", xl: "flex" }}
          >
            <Badge
              colorScheme={badgeColorScheme[getColorForFood(foodName)]} // Get color based on food name
              h="fit-content"
              p={2}
              rounded="full"
            >
              {foodName}:
            </Badge>
            <HStack w="100%" justify="right" pt={2}>
              <Text>{kcal} kcal</Text>
              <IconButton
                size="xs"
                icon={<IoMdRemove />}
                colorScheme="red"
                aria-label="remove activity"
                onClick={() => handleUnlog(foodName)}
              />
            </HStack>
          </Box>
        ))}
      </VStack>
    );
  }

  return null;
};

export default FoodLogDisplay;
