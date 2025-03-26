import {
  Boxes,
  Heart,
  History,
  LogOut,
  ShoppingCart,
  User,
  User2,
  UserRoundCheck,
  UserRoundPen,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Button } from "../ui/button";
// import { deleteCookie, getCookie } from "cookies-next";

const dropdownLinks = [
  {
    title: "My Profile",
    icon: <User2 />,
    href: "/profile",
  },
];
const adminDropdownLinks = [
  {
    title: "Dashboard",
    icon: <Boxes />,
    href: "/dashboard/pending-blood-drives",
  },
];


const NavAuth = () => {
  const isAdmin = localStorage.getItem("role") === "admin";
  const links = isAdmin ? adminDropdownLinks : dropdownLinks;
  const hasToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div>
      {hasToken ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <p className="cursor-pointer p-3 rounded-full border bg-gray-50 w-fit">
              <User />
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-48 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {links.map((link, index) => (
                <Link key={index} to={link.href}>
                  <DropdownMenuItem>
                    {link.icon}
                    {link.title}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            {hasToken ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  <LogOut className="text-red-500" />
                  Log out
                </DropdownMenuItem>
              </>
            ) : (
              ""
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button
            size="lg"
            className="bg-red-600 cursor-pointer hover:text-red-600 text-white hover:bg-transparent border border-red-600"
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavAuth;
