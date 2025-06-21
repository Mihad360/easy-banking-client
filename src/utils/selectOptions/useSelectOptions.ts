/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectBranchOptions = (data: any) => {
  return data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
};
