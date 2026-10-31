import { useRef, useState } from "react";
import type { ServiceResponse } from "../shared/api/service";
import StatusActive from "../shared/ui/StatusActive";
import { useClickOutSide } from "../app/useClickOutside";
import { EllipsisVertical } from "lucide-react";
import Menu from "./Menu";
interface ServiceCardProps {
    service: ServiceResponse;
    onEdit: (service: ServiceResponse) => void;
    onDelete: (id: string) => void;
}
export default function ServiceCard({
    service,
    onEdit,
    onDelete
}: ServiceCardProps) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutSide(menuRef, () => setMenuIsOpen(false));


    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg" >
            <div className="flex gap-3 items-start">
                <div className="h-11 w-11 rounded-full bg-indigo-50"></div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-wrap border-l-3 pl-1.5 rounded-xs" style={{ borderColor: service.color }}>
                        {service.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                        {service.description}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <StatusActive isActive={service.is_active} />
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setMenuIsOpen((prev => !prev))}><EllipsisVertical /></button>
                        <Menu
                            menuOpen={menuIsOpen}
                            onEdit={() => {
                                setMenuIsOpen(false);
                                onEdit(service);
                            }}
                            onDelete={() => {
                                setMenuIsOpen(false);
                                onDelete(service.id);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}