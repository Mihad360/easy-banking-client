"use client";
import { useGetMyTransactionsQuery } from "@/redux/api/multipleApi";
import { EBTable } from "@/shared/table/EBTable";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw } from "lucide-react";
import type { ColumnDef, ActionConfig } from "@/shared/table/EBTable";
import Loading from "@/shared/loading/Loading";
import { toast } from "sonner";
import { useDownloadTransactionMutation } from "@/redux/api/transactionApi";

// Your transaction type
export type TTransaction = {
  _id: string;
  account?: string;
  user?: string;
  transaction_Id?: string;
  transactionType:
    | "deposit"
    | "withdraw"
    | "transfer"
    | "interest"
    | "loan"
    | "deposit-loan";
  amount: number;
  fromAccount?: string;
  toAccount?: string;
  status?: "pending" | "completed" | "failed";
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const CustomerTransactionPage = () => {
  const { data: myTransactions, isLoading } =
    useGetMyTransactionsQuery(undefined);
  const transactions = myTransactions?.data;
  const [downloadTransaction] = useDownloadTransactionMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleDownloadTransaction = async (transaction: TTransaction) => {
    try {
      const res = await downloadTransaction(transaction?._id);
      if (res?.data?.data?.data) {
        const pdfArray = new Uint8Array(res.data.data.data);
        const blob = new Blob([pdfArray], { type: "application/pdf" });
        // Create a download URL
        const url = window.URL.createObjectURL(blob);
        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = `transaction-${transaction?.transaction_Id}.pdf`;
        document.body.appendChild(a);
        a.click();
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        toast.error("Something went wrong", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns for transaction table
  const columns: ColumnDef<TTransaction>[] = [
    {
      key: "transaction_details",
      header: "Transaction Details",
      render: (transaction) => (
        <div>
          <div className="font-medium text-gray-900">
            {transaction.transaction_Id || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "transactionType",
      header: "Type",
      render: (transaction) => {
        const typeColors = {
          deposit: "bg-green-100 text-green-800",
          withdraw: "bg-red-100 text-red-800",
          transfer: "bg-blue-100 text-blue-800",
          interest: "bg-purple-100 text-purple-800",
          loan: "bg-orange-100 text-orange-800",
          "deposit-loan": "bg-yellow-100 text-yellow-800",
        };

        return (
          <Badge
            className={`capitalize ${
              typeColors[transaction.transactionType]
            } hover:${typeColors[transaction.transactionType]}`}
          >
            {transaction.transactionType.replace("-", " ")}
          </Badge>
        );
      },
    },
    {
      key: "amount",
      header: "Amount",
      render: (transaction) => {
        const isDebit = ["withdraw", "transfer"].includes(
          transaction.transactionType
        );
        return (
          <div
            className={`font-medium ${
              isDebit ? "text-red-600" : "text-green-600"
            }`}
          >
            {isDebit ? "-" : "+"}৳{transaction.amount.toLocaleString()}
          </div>
        );
      },
    },
    {
      key: "accounts",
      header: "Account Info",
      render: (transaction) => (
        <div className="text-sm">
          {transaction.transactionType === "transfer" ? (
            <>
              <div className="text-gray-900">
                From: {transaction.fromAccount || "N/A"}
              </div>
              <div className="text-gray-500">
                To: {transaction.toAccount || "N/A"}
              </div>
            </>
          ) : (
            <div className="text-gray-900">{transaction.account || "N/A"}</div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (transaction) => {
        const statusColors = {
          pending: "bg-yellow-100 text-yellow-800",
          completed: "bg-green-100 text-green-800",
          failed: "bg-red-100 text-red-800",
        };

        const status = transaction.status || "pending";

        return (
          <Badge
            className={`capitalize ${statusColors[status]} hover:${statusColors[status]}`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: "Date",
      render: (transaction) => (
        <div className="text-sm">
          <div className="text-gray-900">
            {transaction.createdAt
              ? new Date(transaction.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
          <div className="text-gray-500">
            {transaction.createdAt
              ? new Date(transaction.createdAt).toLocaleTimeString()
              : ""}
          </div>
        </div>
      ),
    },
  ];

  // Define actions for transaction table
  const actions: ActionConfig<TTransaction>[] = [
    // {
    //   type: "button",
    //   icon: <Eye className="h-4 w-4" />,
    //   className: "hover:bg-blue-500 hover:text-white",
    //   onClick: (transaction) => {
    //     console.log("View transaction details:", transaction.transaction_Id);
    //     // Handle view transaction details
    //   },
    // },
    {
      type: "button",
      icon: <Download className="h-4 w-4" />,
      className: "cursor-pointer text-white bg-[#104042] hover:bg-gray-300",
      onClick: (transaction) => handleDownloadTransaction(transaction),
    },
    // Only show retry for failed transactions
    ...(transactions?.some((t: TTransaction) => t.status === "failed")
      ? [
          {
            type: "button" as const,
            icon: <RefreshCw className="h-4 w-4" />,
            className: "hover:bg-orange-500 hover:text-white",
            onClick: (transaction: TTransaction) => {
              if (transaction.status === "failed") {
                console.log("Retry transaction:", transaction.transaction_Id);
                // Handle retry transaction
              }
            },
          },
        ]
      : []),
  ];

  return (
    <div className="px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#104042]">My Transactions</h1>
          <p className="text-gray-600 mt-1">
            View and manage your transaction history
          </p>
        </div>
      </div>

      <EBTable
        data={transactions}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        emptyMessage="No transactions found. Your transaction history will appear here."
        getRowKey={(transaction) =>
          transaction.transaction_Id ||
          transaction.createdAt?.toString() ||
          Math.random().toString()
        }
      />
    </div>
  );
};

export default CustomerTransactionPage;
