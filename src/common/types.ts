import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import { ActivityLevel, Gender, UserRoles, WeightGoal } from "./enums";

export interface IAppState {
  user: User | null | undefined;
  userData: IUserData | null;
}

export interface IAppContextValue extends IAppState {
  setContext: Dispatch<
    SetStateAction<{
      user: User | null | undefined;
      userData: IUserData | null;
    }>
  >;
}

export type IHealth = {
  weightMetric?: number;
  weightImperial?: number;
  heightMetric?: number;
  heightImperial?: number;
  gender?: Gender;
  BMI?: number;
  activityLevel?: ActivityLevel;
  weightGoal?: WeightGoal;
  waterTargetMetric?: number;
  waterTargetImperial?: number;
};

export type ICollection = {
  [key: string]: true;
};

export type INotifications = {
  [key: string]: string;
};

export interface IUserData {
  sentFriendRequests: any;
  receivedFriendRequests: any;
  friends: any;
  handle: string;
  uid: string;
  email: string;
  telephone: string;
  createdOn: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  avatarURL?: string;
  dateOfBirth?: string;
  health?: IHealth;
  notifications?: INotifications;
}

export type IDuration = {
  startDate: string;
  endDate: string;
};

export type ICompetingWith = {
  [key: string]: string;
};

export interface ITodayLog {
  calories?: { [key: string]: number };
  [key: string]: number | { [key: string]: number } | undefined;
}

export type IGoalProgresses = {
  [key: string]: number;
};

export type IFood = {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};
