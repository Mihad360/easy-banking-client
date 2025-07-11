import {
  User,
  BarChart2,
  ArrowDownToLine,
  ArrowUpToLine,
  Repeat2,
  Banknote,
  Users,
  MapPin,
  PlusSquare,
  UserCog,
  List,
} from "lucide-react";

export const customerRoutes = [
  {
    label: "Account Stats",
    href: "/dashboard/customer/account-stats",
    icon: BarChart2,
  },
  {
    label: "My Account",
    href: "/dashboard/customer/my-account",
    icon: User,
  },
  {
    label: "Deposit Balance",
    href: "/dashboard/customer/deposit-balance",
    icon: ArrowDownToLine,
  },
  {
    label: "Withdraw Balance",
    href: "/dashboard/customer/withdraw-balance",
    icon: ArrowUpToLine,
  },
  {
    label: "Transfer Balance",
    href: "/dashboard/customer/transfer-balance",
    icon: Repeat2,
  },
  {
    label: "My Loan",
    href: "/dashboard/customer/my-loan",
    icon: Banknote,
  },
  {
    label: "My Transactions",
    href: "/dashboard/customer/transactions",
    icon: List,
  },
];

export const adminRoutes = [
  {
    label: "Bank Stats",
    href: "/dashboard/admin/bank-stats",
    icon: BarChart2,
  },
  {
    label: "My Account",
    href: "/dashboard/admin/my-account",
    icon: User,
  },
  {
    label: "Account Stats",
    href: "/dashboard/admin/account-stats",
    icon: BarChart2,
  },
  {
    label: "Manage Accounts",
    href: "/dashboard/admin/manage-accounts",
    icon: Users,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/manage-users",
    icon: UserCog,
  },
  {
    label: "Customer Transactions",
    href: "/dashboard/admin/customer-transactions",
    icon: List,
  },
  {
    label: "Customer Loans",
    href: "/dashboard/admin/customer-loans",
    icon: Banknote,
  },
  {
    label: "Branches",
    href: "/dashboard/admin/branches",
    icon: MapPin,
  },
  {
    label: "Create Branch",
    href: "/dashboard/admin/create-branch",
    icon: PlusSquare,
  },
];

export const managerRoutes = [
  {
    label: "Bank Stats",
    href: "/dashboard/manager/bank-stats",
    icon: BarChart2,
  },
  {
    label: "My Account",
    href: "/dashboard/manager/my-account",
    icon: User,
  },
  {
    label: "Account Stats",
    href: "/dashboard/manager/account-stats",
    icon: BarChart2,
  },
  {
    label: "Manage Accounts",
    href: "/dashboard/manager/manage-accounts",
    icon: Users,
  },
  {
    label: "Customer Transactions",
    href: "/dashboard/manager/customer-transactions",
    icon: List,
  },
  {
    label: "Customer Loans",
    href: "/dashboard/manager/customer-loans",
    icon: Banknote,
  },
  {
    label: "My Branch",
    href: "/dashboard/manager/my-branch",
    icon: MapPin,
  },
  {
    label: "Deposit Balance",
    href: "/dashboard/manager/deposit-balance",
    icon: ArrowDownToLine,
  },
  {
    label: "Withdraw Balance",
    href: "/dashboard/manager/withdraw-balance",
    icon: ArrowUpToLine,
  },
  {
    label: "Transfer Balance",
    href: "/dashboard/manager/transfer-balance",
    icon: Repeat2,
  },
  {
    label: "My Loan",
    href: "/dashboard/manager/my-loan",
    icon: Banknote,
  },
  {
    label: "My Transactions",
    href: "/dashboard/manager/transactions",
    icon: List,
  },
];
