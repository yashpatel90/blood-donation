import { Loading } from "@/components/shared/Loading";

const PrivateRoute = ({ role = [], children }) => {
  const isAdmin = !!role.includes(localStorage.getItem("role"));
  const hasToken = localStorage.getItem("token");

  if (!hasToken || !isAdmin) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
    return <Loading className="items-center" />;
  }
  return <div className="min-h-screen">{children}</div>;
};

export { PrivateRoute };
