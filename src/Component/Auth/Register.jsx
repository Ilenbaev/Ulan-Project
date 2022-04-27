import React from "react";
import { useAuth } from "../../Context/AuthContextProvider";
import AuthForm from "./AuthForm";

const Register = () => {
  const { registerUser } = useAuth();
  return (
    <div>
      <AuthForm
        title={"Register"}
        btnText={"Register"}
        link={"/login"}
        linkText={"Already have an account? Login!"}
        handleSave={registerUser}
      />
    </div>
  );
};

export default Register;
