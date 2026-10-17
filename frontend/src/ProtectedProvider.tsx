import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./entities/authContext";

export default function ProtectedRoute() {
    const { isAuth, isLoad } = useAuth();

    if (isLoad) {
        <div>Загрузка...</div>
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}