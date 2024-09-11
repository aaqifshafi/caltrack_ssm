import React, { FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { WeightGoal, ActivityLevel } from "../../../common/enums";

const PersonalizedDietForm: FC<{ onSubmit: (preferences: any) => void }> = ({
  onSubmit,
}) => {
  // Define initial values for the form
  const initialValues = {
    dietaryRestrictions: "",
    fitnessGoals: WeightGoal.maintainWeight, // Adjust as needed
    activityLevel: ActivityLevel.moderately, // Adjust as needed
    foodPreferences: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        // Pass the form values to the onSubmit handler
        onSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormControl mb={4}>
            <FormLabel htmlFor="dietaryRestrictions">
              Dietary Restrictions
            </FormLabel>
            <Field
              name="dietaryRestrictions"
              as={Input}
              placeholder="vegan, gluten-free, allergies etc"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="fitnessGoals">Fitness Goals</FormLabel>
            <Field name="fitnessGoals" as={Select}>
              <option value={WeightGoal.weightLoss}>Lose Weight</option>
              <option value={WeightGoal.maintainWeight}>Maintain Weight</option>
              <option value={WeightGoal.weightGain}>Gain Weight</option>
            </Field>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="activityLevel">Activity Level</FormLabel>
            <Field name="activityLevel" as={Select}>
              <option value={ActivityLevel.noActivity}>Not Active</option>
              <option value={ActivityLevel.lightlyActive}>Light Active</option>
              <option value={ActivityLevel.veryActive}>Very Active</option>
            </Field>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="foodPreferences">Food Preferences</FormLabel>
            <Field
              name="foodPreferences"
              as={Input}
              placeholder="spicy, preffered cusine, etc"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
            Generate Diet Plan
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalizedDietForm;
