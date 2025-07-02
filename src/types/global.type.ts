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

export interface User {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: "admin" | "customer" | "manager";
  isDeleted: boolean;
  profilePhotoUrl: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  data: User[];
}

export interface TUser {
  otp: string;
  expiresAt: Date;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  profilePhotoUrl?: string;
  phoneNumber: string;
}