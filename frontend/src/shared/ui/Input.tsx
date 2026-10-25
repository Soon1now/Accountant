import { type FieldErrors, type FieldValues, type Path, type RegisterOptions, type UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label: string;
    required?: string;
    placeholder: string;
    nameField: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    patternRule?: { value: RegExp, message: string }
}

export default function Input<T extends FieldValues>({
    label,
    required,
    placeholder,
    nameField,
    register,
    errors,
    patternRule
}: InputProps<T>) {
    const validationRules: RegisterOptions<T, Path<T>> = {};

    if (required) {
        validationRules.required = required;
    }

    if (patternRule) {
        validationRules.pattern = patternRule;
    }
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>
            <input
                {...register(nameField, validationRules)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={placeholder}
            />

            {errors[nameField] && (
                <span className="text-xs text-red-500 mt-1 block">{errors[nameField]?.message as string}</span>
            )}
        </div>
    );
}