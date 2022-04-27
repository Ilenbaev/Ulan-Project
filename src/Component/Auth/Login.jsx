import React from "react";
import { useAuth } from "../../Context/AuthContextProvider";
import AuthForm from "./AuthForm";

const Login = () => {
  const { loginUser, resetPassword } = useAuth();
  return (
    <div>
      <AuthForm
        title={"Login"}
        btnText={"Login"}
        link={"/register"}
        linkText={"Хотите зарегистрировать аккаунт ?"}
        handleSave={loginUser}
        resetPassword={resetPassword}
      />
    </div>
  );
};

export default Login;
