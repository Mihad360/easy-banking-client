import {
  User,
  BarChart2,
  ArrowDownToLine,
  ArrowUpToLine,
  Repeat2,
  Banknote,
  Home,
  Building,
  Users,
} from "lucide-react";

export const customerRoutes = [
  {
    label: "My Account",
    href: "/dashboard/customer/my-account",
    icon: User,
  },
  {
    label: "Account Stats",
    href: "/dashboard/customer/account-stats",
    icon: BarChart2,
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
    label: "Loan",
    href: "/dashboard/customer/loan",
    icon: Banknote,
  },
  {
    label: "Transactions",
    href: "/dashboard/customer/transactions",
    icon: Banknote,
  },
];

export const adminRoutes = [
  {
    label: "My Account",
    href: "/dashboard/admin/my-account",
    icon: User,
  },
  {
    label: "Bank Stats",
    href: "/dashboard/admin/bank-stats",
    icon: BarChart2,
  },
  {
    label: "Bank Details",
    href: "/dashboard/admin/bank-details",
    icon: Home,
  },
  {
    label: "Manage Accounts",
    href: "/dashboard/admin/manage-accounts",
    icon: Users,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/manage-users",
    icon: Users,
  },
  {
    label: "Create Branch",
    href: "/dashboard/admin/create-branch",
    icon: Building,
  },
];

export const managerRoutes = [
  {
    label: "My Account",
    href: "/dashboard/manager/my-account",
    icon: User,
  },
];
