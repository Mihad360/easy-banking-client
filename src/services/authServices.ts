"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decoded = null;
  if (accessToken) {
    decoded = await jwtDecode(accessToken);
    return decoded;
  }
  return decoded;
};
