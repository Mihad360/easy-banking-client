"use client";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/api/adminApi";
import type { User } from "@/types/global.type";
import { Users } from "lucide-react";
import { AnimatedButton } from "@/utils/manageUserMotions/animatedButton";
import { RoleSelector } from "@/utils/manageUserMotions/roleSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const ManageUsers = () => {
  const { data: users } = useGetUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const userData = users?.data;

  const handleRoleChange = async (userId: string, newRole: string) => {
    console.log(`Changing role for user ${userId} to ${newRole}`);
    try {
      const data = {
        id: userId,
        userRole: { role: newRole.toString() },
      };
      const res = await updateUserRole(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { duration: 3000 });
      } else {
        toast.error("Role Update failed", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
    // Implement role change logic here
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRemoveUser = (userId: string) => {
    console.log(`Removing user ${userId}`);
    // Implement user removal logic here
  };

  return (
    <div className="space-y-5 p-5">
      {/* Main Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-xl bg-gray-200">
          <CardHeader className="">
            <CardTitle className="text-2xl font-bold gap-2 text-center">
              <p className="flex items-center justify-center gap-2 text-[#104042]">
                <Users className="h-5 w-5" />
                Manage Users
              </p>
              <div className="w-20 h-1 bg-[#104042] mx-auto mt-3 rounded-full"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className=" bg-[#104042]">
                <TableRow className=" hover:bg-[#104042] ">
                  <TableHead className="pl-5 text-white font-medium">
                    Photo
                  </TableHead>
                  <TableHead className=" text-white font-medium">
                    Name
                  </TableHead>
                  <TableHead className=" text-white font-medium">
                    Email & Phone Number
                  </TableHead>
                  <TableHead className=" text-white font-medium">
                    Role
                  </TableHead>
                  <TableHead className=" text-white font-medium">
                    Status
                  </TableHead>
                  <TableHead className=" text-white font-medium">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData?.map((user: User) => (
                  <TableRow key={user._id} className="hover:bg-gray-200">
                    <TableCell className="font-medium pl-5">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user?.profilePhotoUrl} />
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-base font-bold">{`${user.name.firstName} ${user.name.lastName}`}</TableCell>
                    <TableCell className="flex flex-col gap-2">
                      <span className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5855eb] px-2 py-1 text-white font-medium rounded-2xl w-fit">
                        {user.email}
                      </span>
                      <span>{user.phoneNumber}</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`${
                          user.isDeleted
                            ? "bg-rose-500 px-2 py-1 text-white font-medium rounded-2xl"
                            : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5855eb] px-2 py-1 text-white font-medium rounded-2xl"
                        }`}
                      >
                        {user.isDeleted ? "Inactive" : "Active"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <RoleSelector
                        user={user}
                        onRoleChange={handleRoleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <AnimatedButton className="cursor-pointer">
                        Remove
                      </AnimatedButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
