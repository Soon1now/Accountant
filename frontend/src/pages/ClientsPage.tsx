import { useState } from "react";
import { useClient } from "../entities/clientContext";
import ToolBar from "../features/ToolBar";
import ClientCard from "../shared/ui/ClientCard";
import { Modal } from "../shared/ui/Modal";
import { ClientForm } from "../shared/ui/ClientForm";

export default function ClientPage() {
    const { filteredClients, search, setSearch } = useClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createClient } = useClient();

    const handleCreateClient = (data: any) => {
        createClient(data)
        setIsModalOpen(false);
    }

    return (
        <main className="p-6">
            <div className="flex items-center justify-between px-2 py-1">
                <h1 className="font-medium text-2xl ">Клиенты</h1>
                <ToolBar search={search} setSearch={setSearch} modalState={() => setIsModalOpen(true)}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredClients.map(client => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Добавить нового клиента"
            >
                <ClientForm
                    onSubmitData={handleCreateClient}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </main>
    )
}
