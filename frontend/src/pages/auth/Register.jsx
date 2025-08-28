import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonFrom from "../common/From";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  // const {toast} = useToast();
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.user) {
        // If registration is successful, you can redirect or show a success message
        toast("Registration successful!");
        // Redirect to login page or home page

        navigate("/auth/login");
      } else {
        toast("User Already Exists With Same Email!", {
          variant: "destructive",
        });
      }
    });
  }
  //  console.log(fromData);
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-500">
            Login
          </Link>
        </p>
      </div>
      <CommonFrom
        fromControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
