import type { FormData } from "../shared/api/auth";
import useForm from "../app/useForm";

interface LoginFormProps {
    login: (data: FormData) => void;
}

export default function LoginForm({
    login
}: LoginFormProps) {
    const initialForm: FormData = {
        email: "",
        password: "",
    };

    const { form, error, loading, handleChange, handleSubmit } = useForm<FormData>(initialForm, login, 'Неверный логин или пароль. Попробуйте снова.');

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent
                         transition"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Пароль
                </label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent
                         transition"
                    placeholder="••••••••"
                />
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-blue hover:shadow-lg
                       text-white text-sm font-medium rounded-xl transition"
            >
                {loading ? "Вход..." : "Войти"}
            </button>
        </form>
    )
}