import { useState, useEffect } from "react";
import { Building2, Calendar, Calendar1, Droplet, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const navItems = [
    // {
    //   title: "Dashboard",
    //   href: "/dashboard",
    //   icon: <LayoutDashboard className="h-5 w-5" />,
    // },
    {
      title: "All Blood Drives",
      href: "/dashboard/blood-drives",
      icon: <Calendar1 className="h-5 w-5" />,
    },
    {
      title: "Pending Blood Drives",
      href: "/dashboard/pending-blood-drives",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Donation History",
      href: "/dashboard/donation-history",
      icon: <Droplet className="h-5 w-5" />,
    },
    {
      title: "Manage Centers",
      href: "/dashboard/manage-centers",
      icon: <Building2 className="h-5 w-5" />,
    },
    // {
    //   title: "Donors",
    //   href: "/dashboard/donors",
    //   icon: <Users className="h-5 w-5" />,
    // },
    // {
    //   title: "Settings",
    //   href: "#",
    //   icon: <Settings className="h-5 w-5" />,
    // },
  ];

  return (
    <div className="max-h-screen overflow-hidden bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white fixed inset-y-0 z-50 flex w-72 flex-col border-r transition-transform duration-300 ease-in-out lg:static h-screen overflow-hidden",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="border-b px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Droplet className="h-8 w-8 text-red-600" />
            {/* {isSidebarOpen && !isMobile && ( */}
            <p className="ml-2 text-xl font-bold">
              Hope <span className="text-red-500"> Drop</span>
            </p>
            {/* )}  */}
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    location.pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.icon}
                  {(isSidebarOpen || isMobile) && (
                    <span className="flex-1 text-sm font-medium">
                      {item.title}
                    </span>
                  )}
                  {item.badge && (isSidebarOpen || isMobile) && (
                    <Badge variant="destructive" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700",
              !isSidebarOpen && !isMobile && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5" />
            {(isSidebarOpen || isMobile) && (
              <span className="ml-2">Logout</span>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="!h-7 !w-7" />
            </Button>

            {/* <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@hopedrop.org</p>
                </div>
              </div>
            </div> */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
