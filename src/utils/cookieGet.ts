import { cookies } from "next/headers";
import { decodeToken } from "./decodeToken";

export const getCookieToken = async (key: string) => {
  const cookie = await cookies();
  const token = cookie.get(key)?.value as string;
  if (token) {
    const decoded = decodeToken(token);
    return decoded;
  }
};
