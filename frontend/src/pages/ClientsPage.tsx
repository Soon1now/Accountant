import { clients } from "../entities/clientContext";
import ToolBar from "../features/ToolBar";
import ClientCard from "../shared/ui/ClientCard";

export default function ClientPage() {
    return (
        <main className="p-6">
            <div className="flex items-center justify-between px-2 py-1">
                <h1 className="font-medium text-2xl ">Клиенты</h1>
                <ToolBar />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {clients.map(client => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
        </main>
    )
}
