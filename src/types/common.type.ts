/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse = {
  data: any;
  meta?: IMeta;
};
