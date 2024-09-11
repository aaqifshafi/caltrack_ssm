import { FC, ReactElement, useContext, useState, useEffect } from "react";
import moment from "moment";
import {
  VStack,
  Heading,
  Text,
  Button,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import PersonalizedDietModal from "../../components/Diet/PersonalizedDietModal/PersonalizedDietModal";
import DietPlanCard from "../../components/Diet/DietPlanCard/DietPlanCard";
import { AppContext } from "../../context/AppContext/AppContext";
import { ActivityLevel, WeightGoal, UserRoles } from "../../common/enums";
import {
  generatePersonalizedDiet,
  deleteDietPlan,
  getDietPlans,
  saveDietPlan,
} from "../../services/diet.services";
import { handleCheckout } from "../../services/payment.services";
import { checkUserAccess, isProfileComplete } from "../../utils/userUrils";
import PremiumUpgrade from "../../components/Diet/PremiumUpgrade/PremiumUpgrade";

const DietView: FC = (): ReactElement => {
  const { userData } = useContext(AppContext);
  const [personalizedPlan, setPersonalizedPlan] = useState<{
    title: string;
    description: string;
    createdOn: string;
  } | null>(null);
  const [dietPlans, setDietPlans] = useState<
    { title: string; description: string; createdOn: string }[]
  >([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  // Check if the user is an Ultra Premium or Admin member
  const isPremiumUser =
    userData?.role === UserRoles.UltraPremium ||
    userData?.role === UserRoles.Premium ||
    userData?.role === UserRoles.Admin;

  // Determine if the user has access based on their role and profile completion
  const isUserAllowed =
    checkUserAccess(userData) && isProfileComplete(userData);

  const handleGenerateDiet = async (preferences: {
    dietaryRestrictions: string;
    fitnessGoals: WeightGoal;
    activityLevel: ActivityLevel;
    foodPreferences: string;
  }) => {
    if (!userData) {
      toast({
        title: "Error",
        description: "User data not available.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const plan = await generatePersonalizedDiet(userData, preferences);
      const createdOn = moment().toISOString(); // Format as ISO string for data consistency
      const planWithCreatedOn = { ...plan, createdOn };
      setPersonalizedPlan(planWithCreatedOn);

      // Save the generated plan
      await saveDietPlan(userData.handle, planWithCreatedOn);

      // Refresh the list of diet plans
      await loadDietPlans();

      toast({
        title: "Success",
        description: "Diet plan generated and saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error generating diet plan:", error);
      toast({
        title: "Error",
        description: `Failed to generate or save diet plan: ${
          (error as Error).message || String(error)
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const handleDeletePlan = async (createdOn: string) => {
    if (!userData) return;

    try {
      await deleteDietPlan(userData.handle, createdOn);
      await loadDietPlans();
      toast({
        title: "Success",
        description: "Diet plan deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting diet plan:", error);
      toast({
        title: "Error",
        description: "Failed to delete diet plan.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const loadDietPlans = async () => {
    if (!userData) return;

    try {
      const plans = await getDietPlans(userData.handle);
      setDietPlans(plans);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue loading your diet plans.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (userData) {
      loadDietPlans();
    }
  }, [userData]);

  const handleClick = async (priceId: string) => {
    try {
      await handleCheckout({ priceId });
    } catch (error) {
      console.error("Checkout failed:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      {isPremiumUser ? (
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color="brand.blue">
            Personalized Diet Plans
          </Heading>
          <Text textAlign="center" color="brand.grey">
            Generate a personalized diet plan based on your preferences and body
            needs using our state-of-the-art AI.
          </Text>
          <Center>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => setModalOpen(true)}
              isLoading={isLoading}
              loadingText="Generating..."
            >
              Generate Personalized Diet
            </Button>
          </Center>
          <PersonalizedDietModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onGenerate={handleGenerateDiet}
          />
          {isLoading && (
            <Center>
              <Spinner size="xl" color="teal.500" />
            </Center>
          )}
          {dietPlans.length > 0 && (
            <VStack spacing={4} align="stretch">
              {dietPlans.map((plan) => (
                <DietPlanCard
                  key={plan.createdOn}
                  plan={plan}
                  onDelete={() => handleDeletePlan(plan.createdOn)}
                />
              ))}
            </VStack>
          )}
        </VStack>
      ) : (
        <PremiumUpgrade
          onClick={() => handleClick("price_1PxsI1SCxQSEp1cmt9xU5NiF")}
        />
      )}
    </>
  );
};

export default DietView;
