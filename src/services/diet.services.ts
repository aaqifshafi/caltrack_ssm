import { get, set, ref, update, getDatabase, remove } from "firebase/database";
import { db } from "../config/firebase-config";
import OpenAI from "openai";
import { IUserData } from "../common/types";
import moment from "moment";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Generates a personalized diet plan using OpenAI's GPT model.
 * @param {IUserData} userData - The user data.
 * @param {object} preferences - The user's diet preferences.
 * @param {string} preferences.dietaryRestrictions - Dietary restrictions.
 * @param {string} preferences.fitnessGoals - Fitness goals.
 * @param {string} preferences.activityLevel - Activity level.
 * @param {string} preferences.foodPreferences - Food preferences.
 * @return {Promise<object>} A promise that resolves with the generated diet plan.
 */
export const generatePersonalizedDiet = async (
  userData: IUserData,
  preferences: {
    dietaryRestrictions: string;
    fitnessGoals: string;
    activityLevel: string;
    foodPreferences: string;
  }
): Promise<{ title: string; description: string }> => {
  try {
    const prompt = `
    You are a smart Nutrition Assistant. Generate a personalized diet plan for the me based on mybody details and fitness goals. Consider the following information:
    
    - Weight: ${userData.health?.weightMetric || "N/A"} kg
    - Height: ${userData.health?.heightMetric || "N/A"} cm
    - Gender: ${userData.health?.gender || "N/A"}
    - Date of Birth: ${userData.dateOfBirth || "N/A"}
    - Activity Level: ${preferences.activityLevel || "N/A"}
    - Dietary Restrictions: ${preferences.dietaryRestrictions || "N/A"}
    - Fitness Goals: ${preferences.fitnessGoals || "N/A"}
    - Food Preferences: ${preferences.foodPreferences || "N/A"}
    
    Provide the diet plan in the following format:
    
    \`\`\`
    #Personalized Diet Plan
  - Summarize the purpose of this plan. and how its going to align with the user's goals and body needs.

    ## *Nutritional Overview:*
    - Summarize how this diet plan supports the user's fitness goals and dietary preferences.
    \`\`\`
    
    Ensure the plan is structured, professional, and easy to follow, and includes a variety of meals. and keeps calorie intake in check. Ensure proper spacing to make it readable
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    const generatedText = response.choices[0]?.message?.content?.trim() || "";
    const [title, ...descriptionParts] = generatedText.split("\n");
    const description = descriptionParts.join("\n");

    return {
      title: title || "Sample Diet Plan",
      description: description || "This is a sample diet plan description.",
    };
  } catch (error) {
    console.error("Error generating diet plan:", error);
    throw new Error("Failed to generate diet plan.");
  }
};

/**
 * Saves a diet plan to the database.
 * @param {string} handle - The user's handle.
 * @param {object} plan - The diet plan to save.
 * @param {string} plan.title - The title of the diet plan.
 * @param {string} plan.description - The description of the diet plan.
 * @param {Date} plan.createdOn - The date and time when the plan was created.
 * @return {Promise<void>} A promise that resolves when the diet plan is saved.
 */
export const saveDietPlan = async (
  handle: string,
  plan: { title: string; description: string; createdOn: string }
) => {
  const db = getDatabase();

  // Use Moment.js to create a formatted string for the path
  const formattedDate = moment().format("YYYYMMDD_HHmmss");
  const newDietPlanRef = ref(db, `users/${handle}/dietPlans/${formattedDate}`);

  try {
    await set(newDietPlanRef, {
      ...plan,
      createdOn: plan.createdOn, // Ensure createdOn is stored as an ISO string
    });
  } catch (error) {
    console.error("Error saving diet plan:", error);
    throw new Error("Failed to save diet plan.");
  }
};

/**
 * Retrieves all diet plans for a user.
 * @param {string} handle - The user's handle.
 * @return {Promise<Array<{ title: string; description: string; createdOn: string }>>} A promise that resolves with the list of diet plans.
 */
export const getAllDietPlans = async (
  handle: string
): Promise<
  Array<{ title: string; description: string; createdOn: string }>
> => {
  const snapshot = await get(ref(db, `users/${handle}/dietPlans/`));
  if (!snapshot.exists()) {
    return [];
  }
  return Object.values(snapshot.val()).map((plan: any) => ({
    title: plan.title,
    description: plan.description,
    createdOn: plan.createdOn,
  }));
};
/**
 * Deletes a specific diet plan.
 * @param {string} handle - The user's handle.
 * @param {string} createdOn - The date and time of the diet plan to delete.
 * @return {Promise<void>} A promise that resolves when the diet plan is deleted.
 */
export const deleteDietPlan = async (
  handle: string,
  createdOn: string
): Promise<void> => {
  // Construct the reference to the diet plan
  const dietPlanRef = ref(db, `users/${handle}/dietPlans/${createdOn}`);

  try {
    // First, check if the entry exists
    const snapshot = await get(dietPlanRef);

    if (!snapshot.exists()) {
      console.log(`Diet plan not found: ${handle}/dietPlans/${createdOn}`);
      return;
    }

    // Perform the delete operation
    await remove(dietPlanRef);
    console.log(`Diet plan deleted successfully: ${handle}/${createdOn}`);
  } catch (error) {
    console.error(`Error deleting diet plan: ${handle}/${createdOn}`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Edits a diet plan for a user.
 * @param {string} handle - The user's handle.
 * @param {string} createdOn - The date and time of the diet plan to edit.
 * @param {object} updates - The updates to apply to the diet plan.
 * @param {string} [updates.title] - The new title of the diet plan.
 * @param {string} [updates.description] - The new description of the diet plan.
 * @return {Promise<void>} A promise that resolves when the diet plan is updated.
 */
export const editDietPlan = (
  handle: string,
  createdOn: string,
  updates: { title?: string; description?: string }
): Promise<void> => {
  return update(ref(db, `dietPlans/${handle}/${createdOn}`), updates);
};

/**
 * Retrieves a specific diet plan for a user.
 * @param {string} handle - The user's handle.
 * @param {string} createdOn - The date and time of the diet plan to retrieve.
 * @return {Promise<{ title: string; description: string; createdOn: string } | null>} A promise that resolves with the diet plan or null if it doesn't exist.
 */
export const getDietPlans = async (
  userId: string
): Promise<{ title: string; description: string; createdOn: string }[]> => {
  const db = getDatabase();
  const dietPlansRef = ref(db, `users/${userId}/dietPlans`);

  try {
    const snapshot = await get(dietPlansRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert the data into an array of diet plans
      return Object.keys(data).map((key) => ({
        ...data[key],
        createdOn: key, // Using the key as the createdOn field if necessary
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    throw new Error("Failed to fetch diet plans.");
  }
};
