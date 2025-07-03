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
    label: "My Loan",
    href: "/dashboard/customer/my-loan",
    icon: Banknote,
  },
  {
    label: "My Transactions",
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
    label: "Customer Transactions",
    href: "/dashboard/admin/customer-transactions",
    icon: Banknote,
  },
  {
    label: "Customer Loans",
    href: "/dashboard/admin/customer-loans",
    icon: Banknote,
  },
  {
    label: "Create Branch",
    href: "/dashboard/admin/create-branch",
    icon: Building,
  },
  {
    label: "Branches",
    href: "/dashboard/admin/branches",
    icon: Building,
  },
];

export const managerRoutes = [
  {
    label: "My Account",
    href: "/dashboard/manager/my-account",
    icon: User,
  },
  {
    label: "Bank Stats",
    href: "/dashboard/manager/bank-stats",
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
    icon: Banknote,
  },
  {
    label: "Customer Loans",
    href: "/dashboard/manager/customer-loans",
    icon: Banknote,
  },
  {
    label: "Branches",
    href: "/dashboard/manager/my-branch",
    icon: Building,
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
    icon: Banknote,
  },
];
