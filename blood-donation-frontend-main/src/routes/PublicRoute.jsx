import { Loading } from "@/components/shared/Loading";

const PublicRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("role") === "admin";
  const hasToken = localStorage.getItem("token");

  if (hasToken || isAdmin) {
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
    return <Loading className="items-center" />;
  }
  return <div className="min-h-screen">{children}</div>;
};

export { PublicRoute };
