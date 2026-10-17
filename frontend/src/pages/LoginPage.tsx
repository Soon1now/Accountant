import { useAuth } from "../entities/authContext";
import LoginForm from "../features/LoginForm";
import FormHeader from "../shared/ui/FormHeader";
import LinkAuth from "../shared/ui/LinkAuth";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen font-unbounded flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

        <FormHeader title="Вход" discription="Введите email и пароль, чтобы продолжить" />
        <LoginForm login={login} />

        <LinkAuth type="login" />
      </div>
    </div>
  );
}