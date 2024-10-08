import moment from "moment";
import foodData from "../assets/foodData.json";
import { IFood } from "../common/types";
import { get, ref, update } from "firebase/database";
import { db } from "../config/firebase-config";

/**
 * Retrieves all food from API Ninjas, that match the search criteria.
 * @param {object} searchFood The search parameters.
 * @return {Promise} A Promise that resolves to array of food objects.
 */
export const findFood = (searchFood: string): Promise<IFood[]> => {
  return new Promise((resolve) => {
    const lowerSearch = searchFood.toLowerCase();
    const filteredFoods = foodData.filter((food: IFood) =>
      food.name.toLowerCase().includes(lowerSearch)
    );
    resolve(filteredFoods);
  });
};

/**
Logs the consumption of a food item and its associated calories into the user's daily log.
@param {string} handle - The user's handle.
@param {string} foodName - The name of the food item to be logged.
@param {number} calories - The number of calories.
@return {Promise} A promise that resolves when the food item is successfully logged.
*/
export const logFood = (handle: string, foodName: string, calories: number) => {
  const todayDate = moment().format("YYYY-MM-DD");

  return get(ref(db, `logs/${handle}/${todayDate}/calories/${foodName}`)).then(
    (snapshot) => {
      if (!snapshot.exists()) {
        return update(ref(db, `logs/${handle}/${todayDate}/calories`), {
          [foodName]: calories,
        });
      }

      const updatedCalories = snapshot.val() + calories;

      return update(ref(db, `logs/${handle}/${todayDate}/calories`), {
        [foodName]: updatedCalories,
      });
    }
  );
};

/**
Removes the logged food entry for a specific food item from the user's daily log.
@param {string} handle - The user's handle.
@param {string} foodName - The name of the food item to be removed.
@return {Promise} A promise that resolves when the food entry is successfully removed.
*/
export const unlogFood = (handle: string, foodName: string) => {
  const todayDate = moment().format("YYYY-MM-DD");

  return update(ref(db, `logs/${handle}/${todayDate}/calories/`), {
    [foodName]: null,
  });
};
