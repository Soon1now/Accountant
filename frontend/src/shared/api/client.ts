import { api } from './axiosInstance'
import type { components } from "../types/api.generated";

export type ClientResponse = components['schemas']['ClientResponse']
export type ClientCreate = components['schemas']['ClientCreate']
export type ClientUpdate = components['schemas']['ClientUpdate']

export const clientService = {
    getClients: async (): Promise<ClientResponse[]> => {
        const response = await api.get<ClientResponse[]>('/clients');

        return response.data;
    },

    createClient: async (client: ClientCreate): Promise<ClientResponse> => {
        const response = await api.post<ClientResponse>('/clients', client);
        return response.data;
    },

    getClientById: async (clientId: string): Promise<ClientResponse> => {
        const response = await api.get<ClientResponse>(`/clients/${clientId}`);

        return response.data;
    },

    updateClient: async (clientId: string, formData: ClientUpdate): Promise<ClientResponse> => {
        const response = await api.patch<ClientResponse>(`/clients/${clientId}`, formData);

        return response.data;
    },

    deleteClient: async (clientId: string) => {
        await api.delete(`/clients/${clientId}`);
    },
}