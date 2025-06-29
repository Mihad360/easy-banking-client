"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/hooks/debounce.hook";
import { useGetAccountsQuery } from "@/redux/api/accountApi";
import Loading from "@/shared/loading/Loading";
import SecondLoading from "@/shared/loading/SecondLoading";
import { TBankAccount } from "@/types/account.type";

const ManagerManageAccountsPage = () => {
  const [accountType, setAccountType] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const { register, watch, setValue } = useForm();

  const searchTerm = useDebounce(watch("search"));

  const queryParams = [];
  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.push({ name: "searchTerm", value: searchTerm.trim() });
  }
  if (accountType) {
    queryParams.push({ name: "accountType", value: accountType });
  }
  if (status) {
    queryParams.push({ name: "status", value: status });
  }

  const resetFilter = () => {
    setAccountType("");
    setStatus("");
  };

  const {
    data: accounts,
    isLoading,
    isFetching,
  } = useGetAccountsQuery(queryParams.length ? queryParams : undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-3 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#104042" }}
        >
          Manage Accounts
        </h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

            <Input
              {...register("search")}
              placeholder="Search accounts..."
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
              onValueChange={(value) =>
                setAccountType(value ? value : undefined)
              }
            >
              <SelectTrigger className="w-[140px] border-gray-200">
                <SelectValue placeholder="Account Type" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="filter by types" disabled>
                  Filter by Types
                </SelectItem> */}
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setStatus(value ? value : undefined)}
            >
              <SelectTrigger className="w-[120px] border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="all">All Status</SelectItem> */}
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
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

        <div className="text-sm text-gray-600">3 of 3 accounts</div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900">
                Account Details
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Type
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Balance
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Location
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Created
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching && (
              <TableRow>
                <TableCell colSpan={7} className="py-10">
                  <SecondLoading />
                </TableCell>
              </TableRow>
            )}

            {!isFetching && accounts?.data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No accounts found.
                </TableCell>
              </TableRow>
            )}

            {!isFetching &&
              accounts?.data?.map((acc: TBankAccount) => (
                <TableRow key={acc.accountNumber}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {acc.accountHolderName}
                      </div>
                      <div className="text-sm text-gray-500 font-mono">
                        {acc.accountNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="capitalize bg-green-100 text-green-800 hover:bg-green-100">
                      {acc.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      ৳-{acc.balance}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="capitalize">
                      {acc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-900">{acc.city}</div>
                      <div className="text-gray-500">{acc.country}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {acc?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="active">
                        <SelectTrigger className="w-[100px] h-8 text-xs border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-[#104042] hover:text-white transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManagerManageAccountsPage;
