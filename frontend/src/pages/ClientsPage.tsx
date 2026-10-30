import { useState } from "react";
import { useClient } from "../entities/clientContext";
import ToolBar from "../features/ToolBar";
import ClientCard from "../features/ClientCard";
import { Modal } from "../shared/ui/Modal";
import { ClientForm } from "../features/ClientForm";
import type { ClientCreate, ClientResponse } from "../shared/api/client";

type ModalState =
    | { type: "closed" }
    | { type: "create" }
    | { type: "edit"; client: ClientResponse };

export default function ClientPage() {
    const { filteredClients, search, setSearch, createClient, deleteClient, updateClient } = useClient();

    const [modal, setModal] = useState<ModalState>({ type: "closed" });

    const handleSubmit = async (data: ClientCreate) => {
        if (modal.type === "edit") {
            await updateClient(modal.client.id, data);
        } else {
            await createClient(data);
        }
        setModal({ type: "closed" });
    };

    const handleDeleteClient = (id: string) => {
        if (confirm("Удалить клиента?")) {
            deleteClient(id);
        }
    };

    return (
        <main className="p-6">
            <div className="flex items-center justify-between px-2 py-1">
                <h1 className="font-medium text-2xl">Клиенты</h1>
                <ToolBar
                    search={search}
                    setSearch={setSearch}
                    modalState={() => setModal({ type: "create" })}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredClients.map((client) => (
                    <ClientCard
                        key={client.id}
                        client={client}
                        onEdit={(client) => setModal({ type: "edit", client })}
                        onDelete={handleDeleteClient}
                    />
                ))}
            </div>

            <Modal
                isOpen={modal.type !== "closed"}
                onClose={() => setModal({ type: "closed" })}
                title={
                    modal.type === "edit"
                        ? "Редактировать клиента"
                        : "Добавить нового клиента"
                }
            >
                <ClientForm
                    initialData={modal.type === "edit" ? modal.client : undefined}
                    onSubmitData={handleSubmit}
                    onCancel={() => setModal({ type: "closed" })}
                />
            </Modal>
        </main>
    );
}