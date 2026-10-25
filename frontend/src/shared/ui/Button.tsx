import type { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: 'light' | 'dark';
}

export default function Button({
    text,
    variant = 'dark',
    className = "",
    ...rest
}: ButtonProps) {
    return (
        <button className={`${variant === 'dark' ? `bg-blue text-white hover:bg-blue-900` : `text-slate-700 hover:bg-slate-50`} text-sm p-2 rounded-2xl ${className}`}
            {...rest}>
            {text}
        </button>
    );
};