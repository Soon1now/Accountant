import { clientService, type ClientCreate, type ClientResponse, type ClientUpdate } from '../shared/api/client'
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./authContext";

interface ClientContextType {
    clients: ClientResponse[];
    getClients: () => Promise<ClientResponse[]>;
}

const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: ReactNode }) {
    const { isAuth } = useAuth();
    const [clients, setClients] = useState<ClientResponse[]>([])

    const getClients = async (): Promise<ClientResponse[]> => {
        const data = await clientService.getClients();
        setClients(data);
        return data;
    };

    useEffect(() => {
        if (isAuth) {
            getClients();
        }
        else {
            setClients([]);
        }
    }, [isAuth])

    return (
        <ClientContext.Provider
            value={{ clients, getClients }}
        >
            {children}
        </ClientContext.Provider>
    )
}

export function useClient() {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error("useClient must be used within ClientProvider");
    }
    return context;
}
