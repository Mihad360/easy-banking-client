"use client";
import MyLoan from "@/components/customerPages/MyLoan";
import RequestLoan from "@/components/customerPages/RequestLoan";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { useGetMyLoanQuery } from "@/redux/api/loanApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import React, { useEffect, useState } from "react";

const MyLoanPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const { data: myAccount, isLoading: accountLoading } = useGetMyAccountQuery(
    undefined,
    {
      skip: !user,
    }
  );
  const { data: myLoan, isLoading } = useGetMyLoanQuery(undefined, {
    skip: !accountLoading,
  });
  console.log(myLoan);

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <div>{myLoan ? <MyLoan /> : <RequestLoan myAccount={myAccount} />}</div>
  );
};

export default MyLoanPage;
