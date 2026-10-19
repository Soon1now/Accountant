import { api } from './axiosInstance'
import type { components } from "../types/api.generated";

export type PaymentResponse = components['schemas']['PaymentResponse']
export type PaymentCreate = components['schemas']['PaymentCreate']

export const paymentService = {
    getPayments: async (): Promise<PaymentResponse[]> => {
        const response = await api.get<PaymentResponse[]>('/payments');

        return response.data;
    },

    createPayment: async (payment: PaymentCreate): Promise<PaymentResponse> => {
        const response = await api.post<PaymentResponse>('/payments', payment);
        return response.data;
    },

    getPaymenttById: async (paymentId: string): Promise<PaymentResponse> => {
        const response = await api.get<PaymentResponse>(`/payments/${paymentId}`);

        return response.data;
    },
}