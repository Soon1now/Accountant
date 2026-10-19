import { api } from './axiosInstance'
import type { components } from "../types/api.generated";

export type ServiceResponse = components['schemas']['ServiceResponse']
export type ServiceCreate = components['schemas']['ServiceCreate']
export type ServiceUpdate = components['schemas']['ServiceUpdate']

export const serviceService = {
    getServices: async (): Promise<ServiceResponse[]> => {
        const response = await api.get<ServiceResponse[]>('/services');

        return response.data;
    },

    createService: async (service: ServiceCreate): Promise<ServiceResponse> => {
        const response = await api.post<ServiceResponse>('/services', service);
        return response.data;
    },

    getServiceById: async (serviceId: string): Promise<ServiceResponse> => {
        const response = await api.get<ServiceResponse>(`/services/${serviceId}`);

        return response.data;
    },

    updateService: async (serviceId: string, formData: ServiceUpdate): Promise<ServiceResponse> => {
        const response = await api.patch<ServiceResponse>(`/services/${serviceId}`, formData);

        return response.data;
    },

    deleteService: async (clientId: string) => {
        await api.delete(`/services/${clientId}`);
    },
}