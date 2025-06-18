export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export type TError = {
  error: {
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorMessages: any;
      message: string;
      statusCode: number;
    };
    status?: boolean;
  };
};

export type TGlobalResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  success?: boolean;
  message?: string;
  error?: {
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorMessages: any;
      message: string;
      statusCode: number;
    };
    status?: boolean;
  };
};
