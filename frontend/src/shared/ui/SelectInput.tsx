import { type FieldErrors, type FieldValues, type Path, type RegisterOptions, type UseFormRegister } from "react-hook-form";
import { type SelectOption } from "../../app/useOptions";

interface SelectInputProps<T extends FieldValues> {
    label: string;
    nameField: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    options: SelectOption[]; 
    placeholder?: string;
    required?: string;
}

export default function SelectInput<T extends FieldValues>({
    label,
    nameField,
    register,
    errors,
    options,
    placeholder = "Выберите из списка...",
    required,
}: SelectInputProps<T>) {
    const validationRules: RegisterOptions<T, Path<T>> = {};

    if (required) {
        validationRules.required = required;
    }

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </label>
            <select
                {...register(nameField, validationRules)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer"
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {errors[nameField] && (
                <span className="text-xs text-red-500 mt-1 block">
                    {errors[nameField]?.message as string}
                </span>
            )}
        </div>
    );
}