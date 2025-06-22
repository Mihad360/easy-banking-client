"use server";
import { cookies } from "next/headers";

export const saveCookie = async (accessToken: string, refreshToken: string) => {
  if (accessToken && refreshToken) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
};
