import { isExpired } from "react-jwt";
import { getFromLocalStorage } from "./getFromLocalStorage";

export const isUserSignedIn = (): boolean => {
  const LoginData = getFromLocalStorage("SignInData") || {};

  if ("access_token" in LoginData) {
    return isExpired(LoginData.access_token);
  }
  return false;
};
