"use client";
import StripeSuccessPage from "@/components/stripePages/StripeSuccessPage";
import { useGetStripeTransactionQuery } from "@/redux/api/multipleApi";
import Loading from "@/shared/loading/Loading";
import { useSearchParams } from "next/navigation";

const CustomerStripeSuccessPage = () => {
  const params = useSearchParams();
  const id = params?.get("session_id");
  console.log(id);
  const { data: stripeTransaction, isLoading } = useGetStripeTransactionQuery(
    id,
    {
      skip: !id,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <StripeSuccessPage data={stripeTransaction} />
    </div>
  );
};

export default CustomerStripeSuccessPage;
