import { Pencil, Trash } from "lucide-react";

interface MenuProps {
  menuOpen: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Menu({
  onEdit,
  onDelete,
  menuOpen
}: MenuProps) {
  return (
    <>
      {menuOpen && (
        <div className="absolute right-0 top-full z-20 mt-1 w-50 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={onEdit}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            <Pencil className="h-4 w-4" />
            Редактировать
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <Trash className="h-4 w-4" />
            Удалить
          </button>
        </div>
      )}
    </>
  );
}