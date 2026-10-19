import NavItem from "./NavItem";
import { useState } from "react";
import {useAuth} from '../entities/authContext'
const menuItems = [
    { name: "dashboard", label: 'Дашборд', to: '/' },
    { name: "clients", label: 'Клиенты', to: '/clients' },
    { name: "services", label: 'Сервисы', to: '/services' },
    { name: "plans", label: 'Тарифы', to: '/plans' },
    { name: "schedule", label: 'Расписание', to: '/schedule' },
];

export default function NavBar() {
    const [activeItem, setActive] = useState<string>("dashboard")
    const handleClick = (activeItem: string) => {
        setActive(activeItem)
    }
    const {logout} = useAuth();
    return (
        <nav className="flex p-4 space-x-6 items-end">
            {menuItems.map((item) =>
                <NavItem
                    label={item.label}
                    onclick={() => handleClick(item.name)}
                    isActive={activeItem == item.name}
                    toPath={item.to}
                    key={item.to}
                />)}
            <button onClick={logout}>
                выход</button>
        </nav>
    )
}

