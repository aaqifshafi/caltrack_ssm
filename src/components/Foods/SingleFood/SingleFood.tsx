import { FC, ReactElement, useContext, useState } from "react";
import {
  Badge,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IFood } from "../../../common/types";
import { AppContext } from "../../../context/AppContext/AppContext";
import { logFood } from "../../../services/food.services";
import { WATER } from "../../../common/constants";

const SingleFood: FC<{ food: IFood; children?: ReactElement }> = ({
  food,
  children,
}) => {
  const { userData } = useContext(AppContext);

  const [grams, setGrams] = useState(0);
  const [milliliters, setMilliliters] = useState(0);

  const toast = useToast();

  const calories =
    food.name !== WATER
      ? Math.floor((food.calories / food.serving_size_g) * grams)
      : 0;

  const handleLogFood = (quantity: number) => {
    logFood(userData!.handle, food.name, quantity)
      .then(() => {
        setGrams(0);
        setMilliliters(0);
      })
      .then(() => {
        toast({
          title: `Food logged successfully!`,
          description: `You have logged ${quantity} ${
            food.name !== WATER ? `kcal` : `ml`
          } of ${food.name}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          variant: "subtle",
        });
      })
      .catch(() => {
        toast({
          title: "Error logging food!",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          variant: "subtle",
        });
      });
  };

  return (
    <Box key={food.name} borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <HStack spacing={4} align="start">
        <Box flex="1" textAlign="left">
          <Heading size="xs">{food.name}</Heading>
        </Box>
        <HStack>{children}</HStack>
      </HStack>

      <HStack mt={4} mb={3} flexWrap="wrap" gap={1}>
        <Box maxW={{ base: "50%", md: "40%" }}>
          {food.name !== WATER ? (
            <FormControl isRequired>
              <InputGroup size="sm">
                <NumberInput
                  onChange={(value) => setGrams(+value)}
                  min={0}
                  value={grams}
                >
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon>gr</InputRightAddon>
              </InputGroup>
            </FormControl>
          ) : (
            <FormControl isRequired>
              <InputGroup size="sm">
                <NumberInput
                  onChange={(value) => setMilliliters(+value)}
                  min={0}
                  value={milliliters}
                >
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon>ml</InputRightAddon>
              </InputGroup>
            </FormControl>
          )}
        </Box>
        <Spacer />
        {food.name !== WATER && (
          <Badge colorScheme="green">{calories} kcal</Badge>
        )}

        <Button
          size="sm"
          colorScheme={food.name === WATER ? "blue" : "yellow"}
          isDisabled={food.name === WATER ? !milliliters : !grams}
          onClick={() =>
            handleLogFood(food.name === WATER ? milliliters : calories)
          }
        >
          {food.name === WATER ? "Log water" : "Log food"}
        </Button>
      </HStack>

      {food.name.toLowerCase() !== WATER && (
        <>
          <HStack>
            <Text>Serving size:</Text>
            <Spacer />
            <Badge>{food.serving_size_g} gr</Badge>
          </HStack>
          <HStack>
            <Text>Calories per serving:</Text>
            <Spacer />
            <Badge>{food.calories} kcal</Badge>
          </HStack>
          <HStack>
            <Text>Carbohydrates:</Text>
            <Spacer />
            <Badge>{food.carbohydrates_total_g} gr</Badge>
          </HStack>
          <HStack>
            <Text>Protein:</Text>
            <Spacer />
            <Badge>{food.protein_g} gr</Badge>
          </HStack>
          <HStack>
            <Text>Fat:</Text>
            <Spacer />
            <Badge>{food.fat_total_g} gr</Badge>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default SingleFood;
