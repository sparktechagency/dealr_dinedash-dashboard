import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import Loading from "../UI/Loading";

function AuthRedirect() {
  const user = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.role?.includes("admin")) {
      navigate(`/admin/dashboard`, {
        replace: true,
      });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, user]);

  // Optionally display a loading indicator
  return <Loading />;
}

export default AuthRedirect;
