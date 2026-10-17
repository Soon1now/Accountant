import { useState } from "react";
import SearchInput from "./SearchInput";
import AddButton from "../shared/ui/AddButton";

export default function ToolBar() {
    const [search, setSearch] = useState('');
    return (
        <aside className="p-4 flex gap-6">
            <SearchInput value={search} onChange={setSearch}/>
            <AddButton text="Добавить"></AddButton>
        </aside>
    );
}
