import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ recipe_accessToken }) => {
  return setToLocalStorage("recipe_accessToken", recipe_accessToken);
};
export const removeUserInfo = () => {
  return removeFromLocalStorage("recipe_accessToken");
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("recipe_accessToken");
  if (authToken) {
    const userInfo = decodedToken(authToken);
    return userInfo;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("recipe_accessToken");
  return !!authToken;
};
