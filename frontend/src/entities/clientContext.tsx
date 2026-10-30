import { clientService, type ClientCreate, type ClientResponse, type ClientUpdate } from '../shared/api/client'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "./authContext";

interface ClientContextType {
    clients: ClientResponse[];
    getClients: () => Promise<ClientResponse[]>;
    createClient: (formData: ClientCreate) => Promise<ClientResponse>;
    filteredClients: ClientResponse[];
    setSearch: (value: string) => void;
    search: string;
    deleteClient: (value: string) => void;
    updateClient: (value: string, data: ClientUpdate) => Promise<ClientResponse>;
}

const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: ReactNode }) {
    const { isAuth } = useAuth();
    const [clients, setClients] = useState<ClientResponse[]>([]);
    const [search, setSearch] = useState('');

    const getClients = async (): Promise<ClientResponse[]> => {
        const data = await clientService.getClients();
        setClients(data);
        return data;
    };

    const createClient = async (formData: ClientCreate): Promise<ClientResponse> => {
        const newClient = await clientService.createClient(formData);
        setClients((prevClients) => [...prevClients, newClient]);
        return newClient;
    };

    const deleteClient = async (clientId: string) => {
        await clientService.deleteClient(clientId);
        setClients((prev) => prev.filter((c) => c.id !== clientId));
    };

    const updateClient = async (clientId: string, formData: ClientUpdate): Promise<ClientResponse> => {
        const updateClient = await clientService.updateClient(clientId, formData);
        setClients((prevClients) =>
            prevClients.map((c) => (c.id === clientId ? updateClient : c))
        );
        return updateClient;
    };

    const filteredClients = useMemo(() =>
        clients.filter(c =>
            c.first_name.toLowerCase().includes(search.toLowerCase()) ||
            c.last_name.toLowerCase().includes(search.toLowerCase())
        ), [search, clients]
    );
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
            value={{ clients, getClients, createClient, filteredClients, setSearch, search, deleteClient, updateClient }}
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
