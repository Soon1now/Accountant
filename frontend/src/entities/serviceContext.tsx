import type { components } from "../shared/types/api.generated";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "./authContext";
import { serviceService, type ServiceCreate, type ServiceUpdate } from "../shared/api/service";

type ServiceResponse = components['schemas']['ServiceResponse']

interface ServiceContextType {
    services: ServiceResponse[];
    getServices: () => Promise<ServiceResponse[]>;
    createService: (formData: ServiceCreate) => Promise<ServiceResponse>;
    filteredServices: ServiceResponse[];
    setSearch: (value: string) => void;
    search: string;
    deleteService: (value: string) => void;
    updateService: (value: string, data: ServiceUpdate) => Promise<ServiceResponse>;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export function ServiceProvider({ children }: { children: ReactNode }) {
    const { isAuth } = useAuth();
    const [services, setServices] = useState<ServiceResponse[]>([])
    const [search, setSearch] = useState('');

    const getServices = async (): Promise<ServiceResponse[]> => {
        const data = await serviceService.getServices();
        setServices(data);
        return data;
    };
    const createService = async (formData: ServiceCreate): Promise<ServiceResponse> => {
        const newService = await serviceService.createService(formData);
        setServices((prevServices) => [...prevServices, newService]);
        return newService;
    };
    const deleteService = async (serviceId: string) => {
        await serviceService.deleteService(serviceId);
        setServices((prev) => prev.filter((c) => c.id !== serviceId));
    };

    const updateService = async (serviceId: string, formData: ServiceUpdate): Promise<ServiceResponse> => {
        const updateService = await serviceService.updateService(serviceId, formData);
        setServices((prevService) =>
            prevService.map((c) => (c.id === serviceId ? updateService : c))
        );
        return updateService;
    };

    const filteredServices = useMemo(() =>
        services.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
        ), [search, services]
    );
    useEffect(() => {
        if (isAuth) {
            getServices();
        }
        else {
            setServices([]);
        }
    }, [isAuth])

    return (
        <ServiceContext.Provider
            value={{ services, getServices, createService, filteredServices, setSearch, search, deleteService, updateService }}
        >
            {children}
        </ServiceContext.Provider>
    )
}

export function useService() {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useService must be used within ServiceProvider");
    }
    return context;
}
