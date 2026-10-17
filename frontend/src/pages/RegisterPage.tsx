import { useAuth } from "../entities/authContext";
import LinkAuth from "../shared/ui/LinkAuth";
import RegisterForm from "../features/RegisterForm";
import FormHeader from "../shared/ui/FormHeader";

export default function RegisterPage() {
  const { register } = useAuth();
  return (
    <div className="min-h-screen font-unbounded flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        
        <FormHeader title="Регистрация" discription="Создайте аккаунт, чтобы продолжить"/>
        <RegisterForm register={register} />

        <LinkAuth type="register" />
      </div>
    </div>
  );
}