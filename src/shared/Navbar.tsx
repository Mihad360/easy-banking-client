"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  CreditCard,
  User,
  Settings,
  LogOut,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Play,
  UserPen,
  ChartNoAxesCombined,
  SquareUserRound,
  ArrowLeftRight,
  ChartBarStacked,
} from "lucide-react";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";
import { navRoutes } from "@/utils/routes";
import Image from "next/image";
import { removeCookie } from "@/utils/deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-storage";
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null); // Replace with your user type
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const userData = getUser() as JwtPayload;
    if (userData) {
      setUser(userData);
    }
    setLoading(false); // Always after setUser
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleSignOut = async () => {
    await removeCookie("accessToken", "refreshToken");
    removeFromLocalStorage("accessToken");
    window.location.href = "/";
  };

  // Animation-ready wrapper component
  const AnimationWrapper = ({ children, className = "", ...props }: any) => (
    <div className={`transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );

  // Logo component ready for animations
  const LogoSection = () => (
    <AnimationWrapper className="hover:scale-105">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 rounded-md flex items-center justify-center">
              <Image
                src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                width={100}
                height={100}
                alt="image"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">EasyBank</h1>
        </div>
      </Link>
    </AnimationWrapper>
  );

  // Navigation item component ready for animations
  const NavItem = ({ route, index }: { route: any; index: number }) => (
    <AnimationWrapper
      className="relative group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link
        href={route.path}
        key={index}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={`flex items-center gap-1 text-black relative py-1 px-2 ${
          pathname === route.path
            ? "bg-[#104042] rounded-lg text-white font-bold"
            : ""
        }`}
      >
        {hovered === index && (
          <motion.span
            layoutId="hovered-span"
            className="absolute inset-0 w-full h-full rounded-md bg-[#104042]"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        )}
        <span className={`relative z-10 ${hovered === index && "text-white"}`}>
          {route.label}
        </span>
      </Link>
    </AnimationWrapper>
  );

  // Social icon component ready for animations
  const SocialIcon = ({ icon: Icon }: { icon: any }) => (
    <AnimationWrapper className="hover:scale-110 hover:-translate-y-1">
      <div className="w-8 h-8 bg-white/10 hover:bg-[#AEFF1C] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group">
        <Icon className="w-4 h-4 text-white group-hover:text-[#104042]" />
      </div>
    </AnimationWrapper>
  );

  return (
    <motion.nav
      animate={{
        boxShadow: scrolled ? "var(--shadow-aceternity)" : "none",
        width: scrolled ? "90%" : "100%",
        y: scrolled ? 10 : 0,
        backgroundColor: scrolled ? "white" : "transparent",
      }}
      transition={{
        duration: 0.3,
        ease: easeInOut,
      }}
      className="fixed w-full z-50 rounded-2xl mx-auto inset-x-0 top-0 "
    >
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <LogoSection />

          {/* Desktop Navigati on */}
          <div className="hidden lg:flex items-center space-x-2">
            {navRoutes?.map((route, index) => (
              <NavItem key={index} route={route} index={index} />
            ))}
          </div>

          {/* Desktop Auth Section */}
          {loading ? (
            <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
          ) : user ? (
            <div className="relative z-50 hidden lg:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                  >
                    <AnimationWrapper>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-9 h-9 border-2 border-[#AEFF1C]">
                          <AvatarImage
                            src={user.profilePhotoUrl || "/placeholder.svg"}
                            alt={user.name || "User"}
                          />
                          <AvatarFallback className="bg-[#AEFF1C] text-[#104042] font-semibold">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-4 h-4 text-white" />
                      </div>
                    </AnimationWrapper>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-gray-200 text-black shadow-2xl rounded-xl"
                >
                  <DropdownMenuLabel className="font-semibold px-4 py-3">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#0d3636]" />
                  {user.role === "customer" ? (
                    <>
                      <Link href={`/dashboard/${user.role}/account-stats`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartNoAxesCombined className="w-4 h-4 hover:text-black " />
                          My Account Stats
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/${user.role}/my-account`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <SquareUserRound className="w-4 h-4 hover:text-black " />
                          My Account
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/${user.role}/transactions`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ArrowLeftRight className="w-4 h-4 hover:text-black" />
                          My Transactions
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={`/dashboard/${user.role}/bank-stats`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartBarStacked className="w-4 h-4 hover:text-black " />
                          Bank Stats
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/${user.role}/my-account`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <SquareUserRound className="w-4 h-4 hover:text-black " />
                          My Account
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/${user.role}/account-stats`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartNoAxesCombined className="w-4 h-4 hover:text-black" />
                          My Account Stats
                        </DropdownMenuItem>
                      </Link>
                      <Link
                        href={`/dashboard/${user.role}/customer-transactions`}
                      >
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ArrowLeftRight className="w-4 h-4 hover:text-black" />
                          Customer Transations
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-[#0d3636]" />
                  <button
                    onClick={handleSignOut}
                    className="w-full hover:text-red-500 cursor-pointer"
                  >
                    <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md hover:text-red-500 cursor-pointer">
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">Sign Out</span>
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <AnimationWrapper className="hover:scale-105">
                <UserPen />
              </AnimationWrapper>
              <AnimationWrapper>
                <Link
                  href="/login"
                  className="text-white bg-[#104042] font-medium transition-colors duration-300 px-5 tracking-wide  py-2 rounded-md relative group"
                >
                  Login
                  <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#AEFF1C] to-transparent h-[1px]"></span>
                  <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#AEFF1C] to-transparent h-[4px] blur-sm"></span>
                </Link>
              </AnimationWrapper>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-[#104042]">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-[#104042] font-bold">F</span>
                      </div>
                      <div>
                        <h2 className="font-bold text-lg text-white">
                          FinBest
                        </h2>
                        <p className="text-xs text-white/70">
                          Financial Services
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-2">
                      {navRoutes?.map((route, index) => (
                        <AnimationWrapper
                          key={index}
                          className="hover:scale-102"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <Link
                            href={route.path}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/10 text-white hover:text-[#AEFF1C] font-medium transition-all duration-300"
                          >
                            {route.label}
                          </Link>
                        </AnimationWrapper>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Contact Info */}
                  <div className="p-6 border-t border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4 text-[#AEFF1C]" />
                        <span className="text-sm">
                          6391 Elgin St. Celina, 10299
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Phone className="w-4 h-4 text-[#AEFF1C]" />
                        <span className="text-sm font-bold">
                          (629) 555-0129
                        </span>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <SocialIcon icon={Facebook} />
                        <SocialIcon icon={Twitter} />
                        <SocialIcon icon={Linkedin} />
                        <SocialIcon icon={Play} />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="p-6 border-t border-white/10">
                    {!user ? (
                      <div className="space-y-3">
                        <AnimationWrapper className="hover:scale-102">
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button
                              variant="outline"
                              className="w-full border-white text-white hover:bg-white hover:text-[#104042]"
                            >
                              Login
                            </Button>
                          </Link>
                        </AnimationWrapper>
                        <AnimationWrapper className="hover:scale-102">
                          <Link href="/signup" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-[#AEFF1C] hover:bg-[#AEFF1C]/90 text-[#104042] font-bold">
                              Get Started
                            </Button>
                          </Link>
                        </AnimationWrapper>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                          <Avatar className="w-10 h-10 border-2 border-[#AEFF1C]">
                            <AvatarImage
                              src={user?.profilePhotoUrl || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-[#AEFF1C] text-[#104042]">
                              {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-white">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-white/70">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white hover:bg-white/10"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white hover:bg-white/10"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            My Cards
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white hover:bg-white/10"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:bg-red-500/20"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
