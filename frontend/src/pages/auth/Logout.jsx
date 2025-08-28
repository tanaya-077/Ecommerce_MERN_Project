import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
    });
  }, [dispatch, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
