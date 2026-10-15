import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {

    return (
        <div className="h-screen bg-slate-50 text-blue font-regular font-unbounded">
            <Header />
            <Outlet />
        </div>
    );
}