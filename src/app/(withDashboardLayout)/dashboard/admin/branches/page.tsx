/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetBranchesQuery } from "@/redux/api/multipleApi";
import Loading from "@/shared/loading/Loading";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Edit, Eye, Building2, Hash } from "lucide-react";
import Link from "next/link";

const AdminBranchesPage = () => {
  const { data: allBranches, isLoading } = useGetBranchesQuery(undefined);
  const branches = allBranches?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!branches) {
    return (
      <div className="pt-40">
        <p className="text-center text-rose-500 font-medium">
          No branches Available
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants: Variants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#104042] mb-2">
                Branch Management
              </h1>
              <p className="text-gray-600 text-base">
                Manage and monitor all branch locations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                Total Branches: {branches?.length || 0}
              </Badge>
              <Link
                href="/dashboard/admin/create-branch"
                className="bg-[#104042] cursor-pointer hover:bg-[#0d3335] text-white flex items-center gap-2 rounded-xl px-4 py-1 transition-all duration-200"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Add New Branch
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Branches Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {branches?.map((branch: any, index: number) => (
            <motion.div
              key={branch._id || index}
              variants={cardVariants}
              //   whileHover="hover"
              className="h-full"
            >
              <motion.div variants={hoverVariants} className="h-full">
                <Card className="h-full shadow-lg border-0 bg-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                          {branch.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Hash className="w-3 h-3 mr-1" />
                            {branch.code}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Address */}
                    <div className="flex justify-center gap-2">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-[#104042] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Location
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {branch.city}, {branch.state}
                          </p>
                        </div>
                      </div>
                      {/* Contact */}
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#104042] flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Contact
                          </p>
                          <p className="text-sm text-gray-600">
                            {branch.contactNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Balance Summary */}
                    <div className="pt-3 border-t border-gray-100 flex gap-2 justify-center">
                      <div className="bg-[#104042]/5 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Reserved Balance
                        </p>
                        <p className="text-lg font-bold text-[#104042]">
                          {formatCurrency(branch.reserevedBalance)}
                        </p>
                      </div>
                      <div className="bg-[#104042]/5 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Used Balance
                        </p>
                        <p className="text-lg font-bold text-[#104042]">
                          {formatCurrency(branch.usedBalance)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#104042] hover:bg-[#0d3335] text-white"
                        onClick={() => {
                          console.log("Edit branch:", branch._id);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#104042] text-[#104042] hover:bg-[#104042] hover:text-white bg-transparent"
                        onClick={() => {
                          console.log("View branch:", branch._id);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {branches?.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No branches found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first branch location.
            </p>
            <Button className="bg-[#104042] hover:bg-[#0d3335] text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Add First Branch
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminBranchesPage;
