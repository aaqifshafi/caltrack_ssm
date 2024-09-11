/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export enum UserRoles {
  Base = "base",
  WantAdmin = "wantAdmin",
  Admin = "admin",
  Blocked = "blocked",
  Premium = "premium",
  UltraPremium = "ultraPremium",
}

export enum Units {
  walking = "steps",
  running = "km",
  swimming = "m",
  cycling = "km",
  workout = "workouts",
  strength = "workouts",
  stamina = "workouts",
  stretching = "workouts",
}

export enum Gender {
  male = "male",
  female = "female",
  genderNeutral = "gender neutral",
}

export enum ActivityLevel {
  noActivity = "noActivity",
  sedentary = "sedentary",
  lightlyActive = "lightlyActive",
  moderately = "moderately",
  veryActive = "veryActive",
  superActive = "superActive",
}

export enum WeightGoal {
  extremeWeightLoss = "extremeWeightLoss",
  weightLoss = "weightLoss",
  mildWeightLoss = "mildWeightLoss",
  maintainWeight = "maintainWeight",
  mildWeightGain = "mildWeightGain",
  weightGain = "weightGain",
  fastWeightGain = "fastWeightGain",
}
