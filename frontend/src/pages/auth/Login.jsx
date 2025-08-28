
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonFrom from "../common/From";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {

const [formData, setFormData] = useState(initialState);
const dispatch = useDispatch();
const onSubmit = (e) => {
  e.preventDefault();

  dispatch(loginUser(formData)).then((data) => {
    //  console.log("Login response:", data);
     if (data?.payload?.user) {
    toast.success("Login successfully!");
  } else {
    toast.error(data?.payload?.message || "Login failed");
  }
  });
};

 return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Sign your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?
           <Link to="/auth/register" className="text-blue-600 hover:text-blue-500">Sign up</Link>
        </p>
      </div>
     <CommonFrom
  fromControls={loginFormControls}
  buttonText="Sign In"
  formData={formData}
  setFormData={setFormData}
  onSubmit={onSubmit}
/>

    </div>
  );
};

export default Login;
