export const envConfig = {
  baseApi:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_API
      : process.env.NEXT_PUBLIC_URL,
};
