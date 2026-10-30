import type { ClientResponse } from "../shared/api/client";
import StatusActive from "../shared/ui/StatusActive";
import { EllipsisVertical } from 'lucide-react';
import { useRef, useState } from "react";
import Menu from "./Menu";
import {useClickOutSide} from '../app/useClickOutside'

interface ClientCardProps {
    client: ClientResponse;
    onEdit: (client: ClientResponse) => void;
    onDelete: (id: string) => void;
}
export default function ClientCard({
    client,
    onEdit,
    onDelete,
}: ClientCardProps) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutSide(menuRef, () => setMenuIsOpen(false));

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-blue font-semibold text-blue">
                    {client.first_name[0]}
                    {client.last_name[0]}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold  text-wrap">
                        {client.first_name}
                    </h3>
                    <h3 className="truncate font-semibold  text-wrap">
                        {client.last_name}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-500">
                        {client.phone}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <StatusActive isActive={client.is_active} />
                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setMenuIsOpen((prev => !prev))}><EllipsisVertical /></button>
                        <Menu
                            menuOpen={menuIsOpen}
                            onEdit={() => {
                                setMenuIsOpen(false);
                                onEdit(client); 
                            }}
                            onDelete={() => {
                                setMenuIsOpen(false);
                                onDelete(client.id);
                            }}
                        />
                    </div>
                </div>
            </div>
            {client.notes && (
                <div className="mt-4 rounded-xl  px-3 text-sm text-slate-600">
                    {client.notes}
                </div>
            )}

            <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Telegram: @{client.telegram_username.replace("@", "")}
            </div>
        </div>
    );
}


