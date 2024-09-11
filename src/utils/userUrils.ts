import { IUserData } from "../common/types";
import { UserRoles } from "../common/enums";
import { calculateAge } from "./ageUtils";

export const checkUserAccess = (userData: IUserData | null): boolean =>
  userData?.role === UserRoles.Premium ||
  userData?.role === UserRoles.UltraPremium ||
  userData?.role === UserRoles.Admin;

export const isProfileComplete = (userData: IUserData | null): boolean => {
  if (!userData || !userData.health) return false;

  const { dateOfBirth: dob } = userData;
  const { weightMetric, heightMetric } = userData.health;
  const age = dob ? calculateAge(dob) : null;

  return !!(age && weightMetric && heightMetric);
};
