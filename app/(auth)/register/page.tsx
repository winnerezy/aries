import React from "react";
import AuthForm from "../../../components/AuthForm";

export default function Register() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <AuthForm type="sign-up" />
    </div>
  );
}