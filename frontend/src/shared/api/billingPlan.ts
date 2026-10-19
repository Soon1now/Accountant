import { api } from './axiosInstance'
import type { components } from "../types/api.generated";

export type PlanResponse = components['schemas']['BillingPlanResponse']
export type PlanCreate = components['schemas']['BillingPlanCreate']
export type PlanUpdate = components['schemas']['BillingPlanUpdate']

export const planService = {
    getPlans: async (): Promise<PlanResponse[]> => {
        const response = await api.get<PlanResponse[]>('/billing_plans');

        return response.data;
    },

    createPlan: async (plan: PlanCreate): Promise<PlanResponse> => {
        const response = await api.post<PlanResponse>('/billing_plans', plan);
        return response.data;
    },

    getPlanById: async (planId: string): Promise<PlanResponse> => {
        const response = await api.get<PlanResponse>(`/billing_plans/${planId}`);

        return response.data;
    },

    updatePlan: async (serviceId: string, formData: PlanUpdate): Promise<PlanResponse> => {
        const response = await api.patch<PlanResponse>(`/billing_plans/${serviceId}`, formData);

        return response.data;
    },

    deletePlan: async (clientId: string) => {
        await api.delete(`/billing_plans/${clientId}`);
    },
}