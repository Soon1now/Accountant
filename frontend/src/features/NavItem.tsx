import { Link } from "react-router-dom";

interface NavItemProps {
    label: string;
    onclick: () => void;
    isActive?: boolean;
    toPath: string;
}

export default function NavItem({
    label,
    onclick,
    isActive = false,
    toPath = '/'
}: NavItemProps) {
    return (
        <Link 
        key={toPath}
        to={toPath}
        className={`px-4 py-1.5 text-sm rounded-3xl cursor-pointer
            ${isActive
                ? 'bg-soft-blue text-blue'
                : 'text-slate-600 '
            }`}
            onClick={onclick}
        >
            {label}
        </Link>
    );
}