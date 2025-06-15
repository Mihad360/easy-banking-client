import { decodeToken } from "@/utils/decodeToken";
import { getFromLocalStorage } from "@/utils/local-storage";

export const getUser = () => {
  const accessToken = getFromLocalStorage("accessToken");
  if (accessToken) {
    const decoded = decodeToken(accessToken);
    return decoded;
  }
};
