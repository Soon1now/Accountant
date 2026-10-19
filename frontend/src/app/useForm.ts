import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function useForm<T>(
    initialForm: T,
    onSubmit: (data: T) => void,
    errorText: string,
) {
    const [form, setForm] = useState<T>(initialForm);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await onSubmit(form);
            navigate('/');
        } catch (err: any) {
            setError(
                err.response?.data?.detail ||
                 errorText 
            );
        } finally {
            setLoading(false);
        }
    };
    return ({
        form,
        error,
        loading,
        handleSubmit,
        handleChange,
        setForm,
    })
}