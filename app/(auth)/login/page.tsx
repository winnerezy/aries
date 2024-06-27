import AuthForm from "../../../components/AuthForm";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <AuthForm type="sign-in" />
    </div>
  );
}