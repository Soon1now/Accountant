import { Link } from "react-router-dom";

interface LinkAuthProps {
    type: 'login' | 'register'
}

export default function LinkAuth({
    type,
}: LinkAuthProps) {

    return (
        <p className="mt-6 text-center text-sm text-gray-600">
            {type == 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}

            <Link
                to={type == 'login'? '/register' : '/login'}
                className="text-blue font-medium"
            >
                {type == 'login' ? "Зарегистрироваться" : "Войти"}
            </Link>
        </p>
    )
}