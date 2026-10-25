import { useService } from "../entities/serviceContext";
import ToolBar from "../features/ToolBar";
import ServiceCard from "../shared/ui/ServiceCard";

export default function ServicesPage() {
    const {services} = useService();
    return (
        <main className="p-6">
            <div className="flex items-center justify-between px-2 py-1">
                <h1 className="font-medium text-2xl ">Сервисы</h1>
                <ToolBar />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </main>
    )
}