import type { FormData, UserCreate } from "../shared/api/auth";
import useForm from "../app/useForm";

interface RegisterFormProps {
    register: (data: FormData) => void;
}

export default function RegisterForm({
    register
}: RegisterFormProps) {

    const initialForm: UserCreate = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    };
    
    const { form, error, loading, handleChange, handleSubmit } = useForm<UserCreate>(initialForm, register, 'Ошибка при регистрации. Попробуйте снова.');

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Имя
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition"
                        placeholder="Иван"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Фамилия
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition"
                        placeholder="Иванов"
                    />
                </div>
            </div>

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
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
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
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition"
                    placeholder="Минимум 8 символов"
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
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                       text-white text-sm font-medium rounded-xl transition"
            >
                {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
        </form>
    )
}