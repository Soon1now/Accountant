import { useState } from "react";
import { useService } from "../entities/serviceContext";
import ToolBar from "../features/ToolBar";
import ServiceCard from "../shared/ui/ServiceCard";
import { Modal } from "../shared/ui/Modal";
import { ServiceForm } from "../features/ServiceForm"

export default function ServicesPage() {
    const { filteredServices, search, setSearch, createService } = useService();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateClient = (data: any) => {
        createService(data)
        setIsModalOpen(false);
    }
    return (
        <main className="p-6">
            <div className="flex items-center justify-between px-2 py-1">
                <h1 className="font-medium text-2xl ">Сервисы</h1>
                <ToolBar
                    search={search}
                    setSearch={setSearch}
                    modalState={() => setIsModalOpen(true)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Добавить новый сервис"
            >
                <ServiceForm
                    onSubmitData={handleCreateClient}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </main>
    )
}