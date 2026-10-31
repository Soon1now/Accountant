import { useState } from "react";
import { useService } from "../entities/serviceContext";
import ToolBar from "../features/ToolBar";
import ServiceCard from "../features/ServiceCard";
import { Modal } from "../shared/ui/Modal";
import { ServiceForm } from "../features/ServiceForm"
import type { ServiceCreate, ServiceResponse } from "../shared/api/service";

type ModalState =
    | { type: "closed" }
    | { type: "create" }
    | { type: "edit"; service: ServiceResponse };

export default function ServicesPage() {
    const { filteredServices, search, setSearch, createService, updateService, deleteService } = useService();

    const [modal, setModal] = useState<ModalState>({ type: "closed" });

    const handleSubmit = async (data: ServiceCreate) => {
        if (modal.type === "edit") {
            await updateService(modal.service.id, data);
        } else {
            await createService(data);
        }
        setModal({ type: "closed" });
    };

    const handleDeleteService = (id: string) => {
        if (confirm("Удалить сервис?")) {
            deleteService(id);
        }
    };

    return (
        <main className="p-6">
            <div className="flex items-center justify-between px-2 py-1">
                <h1 className="font-medium text-2xl ">Сервисы</h1>
                <ToolBar
                    search={search}
                    setSearch={setSearch}
                    modalState={() => setModal({ type: "create" })}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} onDelete={handleDeleteService} onEdit={(service) => setModal({ type: "edit", service })}/>
                ))}
            </div>
            <Modal
                isOpen={modal.type !== "closed"}
                onClose={() => setModal({ type: "closed" })}
                title="Добавить новый сервис"
            >
                <ServiceForm
                    initialData={modal.type === "edit" ? modal.service : undefined}
                    onSubmitData={handleSubmit}
                    onCancel={() => setModal({ type: "closed" })}
                />
            </Modal>
        </main>
    )
}