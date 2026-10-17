import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { AuthService } from "../shared/api/auth";
import type { UserCreate, FormData } from "../shared/api/auth";

interface AuthContextType {
    isAuth: boolean;
    isLoad: boolean;
    login: (data: FormData) => void;
    logout: () => void;
    register: (data: UserCreate) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(() => {
        return !!localStorage.getItem("access_token");
    });
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("accesss_token");
        token && setIsAuth(true);
        setIsLoad(false);
    }, []);
    const login = async (data: FormData) => {
        const { access_token } = await AuthService.login(data);
        localStorage.setItem("access_token", access_token);
        setIsAuth(true);
    }
    const register = async (data: UserCreate) => {
        await AuthService.register(data);
    }
    const logout = () => {
        localStorage.removeItem("access_token");
        setIsAuth(false);
    };
    return (
        <AuthContext.Provider
            value={{ isAuth, isLoad, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

