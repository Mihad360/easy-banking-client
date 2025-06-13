import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navRoutes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-5">
          <Image
            src="https://i.ibb.co/GQsQ37kS/Messenger-creation-E9-E425-D7-CA9-C-4507-A947-BCBC8-E5-A58-C2-jpeg.jpg"
            alt="image"
            width={400}
            height={400}
            className="w-16"
          />
          <h1 className="text-black font-bold text-2xl">
            Easy <span className="text-sky-700">Bank</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            {navRoutes.map((route, index) => (
              <Link
                className="relative text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 group"
                key={index}
                href={route.path}
              >
                {route.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Link href="/login">Login</Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
