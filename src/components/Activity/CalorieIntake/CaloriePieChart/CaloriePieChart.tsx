import { FC, ReactElement } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { badgeColorScheme } from "../../../../common/constants";

// Reuse the hash function to assign a consistent color based on food name
const getColorForFood = (foodName: string) => {
  let hash = 212334456576978;
  for (let i = 0; i < foodName.length; i++) {
    hash = (hash << 5) - hash + foodName.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % badgeColorScheme.length;
  return badgeColorScheme[index];
};

const CaloriePieChart: FC<{ calorieLog: { [key: string]: number } }> = ({
  calorieLog,
}): ReactElement => {
  const tooltipColor = useColorModeValue("#F7FAFC", "#171923");
  const contrastColor = useColorModeValue("#171923", "#F7FAFC");

  // Map food data and assign consistent colors
  const data = Object.keys(calorieLog).map((food) => ({
    id: food,
    label: food,
    value: calorieLog[food],
    color: getColorForFood(food), // Assign color based on food name
  }));

  return (
    <ResponsivePie
      data={data}
      theme={{
        tooltip: {
          container: {
            background: tooltipColor,
          },
        },
      }}
      margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
      innerRadius={0.05}
      padAngle={3}
      cornerRadius={5}
      activeOuterRadiusOffset={8}
      colors={{ datum: "data.color" }} // Use the color from the data object
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      enableArcLinkLabels={false}
      arcLinkLabelsTextColor={contrastColor}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
    />
  );
};

export default CaloriePieChart;
