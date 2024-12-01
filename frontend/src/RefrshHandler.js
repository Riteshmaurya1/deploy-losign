import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefrshHandler = ({setIsAuthenticated}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated])

  return (
    null
  );
};

export default RefrshHandler;