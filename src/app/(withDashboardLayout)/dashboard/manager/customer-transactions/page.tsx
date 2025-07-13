"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Download, Search, X } from "lucide-react";
import {
  useDownloadTransactionMutation,
  useGetTransactionsQuery,
} from "@/redux/api/transactionApi";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TTransaction } from "../../customer/transactions/page";
import Loading from "@/shared/loading/Loading";
import { ActionConfig, ColumnDef, EBTable } from "@/shared/table/EBTable";
import SecondLoading from "@/shared/loading/SecondLoading";
import { useDebounce } from "@/hooks/debounce.hook";
import { toast } from "sonner";

const ManagerCustomerTransactionPage = () => {
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<
    string | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [downloadTransaction] = useDownloadTransactionMutation();
  const { register, watch, setValue } = useForm();
  const searchTerm = useDebounce(watch("search"));

  const handleDownload = async (transaction: TTransaction) => {
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

  const queryParams = [];
  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.push({ name: "searchTerm", value: searchTerm.trim() });
  }
  if (transactionTypeFilter) {
    queryParams.push({ name: "transactionType", value: transactionTypeFilter });
  }
  if (statusFilter) {
    queryParams.push({ name: "status", value: statusFilter });
  }

  const resetFilter = () => {
    setTransactionTypeFilter(undefined);
    setStatusFilter(undefined);
    setValue("search", "");
  };

  const {
    data: allTransactions,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery(queryParams.length ? queryParams : undefined);

  const transactions: TTransaction[] = allTransactions?.data || [];

  const columns: ColumnDef<TTransaction>[] = [
    {
      key: "transaction_Id",
      header: "Transaction ID",
      className: "text-black",
      render: (item) => (
        <>
          <h1>{item.transaction_Id}</h1>
        </>
      ),
    },
    {
      key: "transactionType",
      header: "Type",
      render: (item) => (
        <Badge className="capitalize bg-blue-100 text-blue-800 hover:bg-blue-100">
          {item.transactionType}
        </Badge>
      ),
    },
    {
      key: "transaction_account",
      header: "Transaction Account",
      className: "text-gray-900",
      render: (item) => (
        <>
          <>
            <h1>{item.account ? item.account : `From: ${item.fromAccount}`}</h1>
            <p>{item.toAccount && `To: ${item.toAccount}`}</p>
          </>
        </>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (item) => <div className=" text-gray-900">৳{item.amount}</div>,
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        const badgeVariant:
          | "default"
          | "secondary"
          | "destructive"
          | "outline" = "default";
        let badgeColorClass = "";
        switch (item.status) {
          case "completed":
            badgeColorClass = "bg-green-100 text-green-800 hover:bg-green-100";
            break;
          case "pending":
            badgeColorClass =
              "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            break;
          case "failed":
            badgeColorClass = "bg-red-100 text-red-800 hover:bg-red-100";
            break;
          default:
            badgeColorClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
            break;
        }
        return (
          <Badge
            variant={badgeVariant}
            className={`capitalize ${badgeColorClass}`}
          >
            {item.status}
          </Badge>
        );
      },
    },
    {
      key: "userEmail",
      header: "User Email",
      render: (item) => (
        <div className="text-xs text-gray-500">
          {item?.user?.email || "N/A"}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item) => (
        <div className="text-xs text-gray-600">
          {item.createdAt
            ? format(new Date(item.createdAt), "MMM dd, yyyy")
            : "N/A"}
        </div>
      ),
    },
  ];

  const actions: ActionConfig<TTransaction>[] = [
    {
      type: "button",
      icon: <Download className="h-4 w-4" />,
      onClick: (item) => {
        handleDownload(item);
      },
      hoverClassName: "hover:bg-[#104042] hover:text-white",
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-3 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#104042" }}
        >
          Manage Customer Transactions
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...register("search")}
              placeholder="Search transactions..."
              className="pl-10 pr-8 border-gray-200 focus:border-[#104042] focus:ring-[#104042]"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer hover:text-red-500"
                onClick={() => setValue("search", "")}
              />
            )}
          </div>
          <div className="flex gap-2">
            <Select
              value={transactionTypeFilter}
              onValueChange={(value) =>
                setTransactionTypeFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[160px] border-gray-200">
                <SelectValue placeholder="Types filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[120px] border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-rose-500 cursor-pointer"
              onClick={resetFilter}
            >
              <X />
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-600">
          {transactions.length} of{" "}
          {allTransactions?.meta?.total || transactions.length} transactions
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <EBTable
          data={transactions}
          columns={columns}
          actions={actions}
          isLoading={isFetching}
          emptyMessage="No transactions found."
          loadingComponent={<SecondLoading />}
          getRowKey={(item) => item._id}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default ManagerCustomerTransactionPage;
