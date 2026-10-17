import { api } from '../api/axiosIstance'
import type { components } from "../types/api.generated";

export type UserResponse = components['schemas']['UserResponse']
export type UserCreate = components['schemas']['UserCreate']
export type TokenResponse = components['schemas']['Token']

export type FormData = { email: string; password: string }
export const AuthService = {

    login: async (credentials: FormData): Promise<TokenResponse> => {
        const formData = new URLSearchParams()
        formData.append("username", credentials.email);
        formData.append("password", credentials.password);

        const { data } = await api.post<TokenResponse>("/auth/token", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        return data;
    },

    register: async (data: UserCreate): Promise<UserResponse> => {
        const response =  await api.post("/auth/register", data)

        return response.data
    }
}