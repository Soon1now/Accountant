
interface SearchInputProps{
    value: string;
    onChange: (value:string) => void;
    placeholder?: string;
}
export default function SearchInput({
    value,
    onChange,
    placeholder = "Поиск клиента по имени "
}:SearchInputProps) {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-100 px-3 py-2 text-xs border border-soft-blue rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue"
            />
        </div>
    )
}