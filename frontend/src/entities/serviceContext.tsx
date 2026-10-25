import type { components } from "../shared/types/api.generated";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./authContext";
import { serviceService } from "../shared/api/service";

type ServiceResponse = components['schemas']['ServiceResponse']

interface ServiceContextType {
    services: ServiceResponse[];
    getServices: () => Promise<ServiceResponse[]>;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export function ServiceProvider({ children }: { children: ReactNode }) {
    const { isAuth } = useAuth();
    const [services, setServices] = useState<ServiceResponse[]>([])

    const getServices = async (): Promise<ServiceResponse[]> => {
        const data = await serviceService.getServices();
        setServices(data);
        return data;
    };

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
            value={{services, getServices }}
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
