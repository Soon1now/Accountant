import { api } from './axiosInstance'
import type { components } from "../types/api.generated";

export type ScheduleResponse = components['schemas']['ScheduleEventResponse']
export type ScheduleCreate = components['schemas']['ScheduleEventCreate']
export type ScheduleUpdate = components['schemas']['ScheduleEventUpdate']

export const scheduleService = {
    getScheduleEvents: async (): Promise<ScheduleResponse[]> => {
        const response = await api.get<ScheduleResponse[]>('/schedule');

        return response.data;
    },

    createScheduleEvent: async (schedule: ScheduleCreate): Promise<ScheduleResponse> => {
        const response = await api.post<ScheduleResponse>('/schedule', schedule);
        return response.data;
    },

    getScheduleEventById: async (scheduleId: string): Promise<ScheduleResponse> => {
        const response = await api.get<ScheduleResponse>(`/schedule/${scheduleId}`);

        return response.data;
    },

    updateScheduleEvent: async (serviceId: string, formData: ScheduleUpdate): Promise<ScheduleResponse> => {
        const response = await api.patch<ScheduleResponse>(`/schedule/${serviceId}`, formData);

        return response.data;
    },

    deleteScheduleEvent: async (clientId: string) => {
        await api.delete(`/schedule/${clientId}`);
    },
}