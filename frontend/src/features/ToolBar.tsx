import SearchInput from "./SearchInput";
import Button from "../shared/ui/Button";

interface ToolBarProps {
    search: string;
    setSearch: (string) => void;
    modalState: () => void;
}
export default function ToolBar({
    search,
    setSearch,
    modalState,
}: ToolBarProps) {
    return (
        <aside className="p-4 flex gap-6">
            <SearchInput value={search} onChange={setSearch} />
            <Button onClick={modalState} text="Добавить"></Button>
        </aside>
    );
}
