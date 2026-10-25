import { startOfMonth, startOfWeek, addDays, isSameMonth, isSameDay, isToday, format } from "date-fns";
import { ru } from "date-fns/locale";

export function getMonthMatrix(month: Date): Date[][] {
  const firstMonday = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  return Array.from({ length: 6 }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) =>
      addDays(firstMonday, weekIndex * 7 + dayIndex)
    )
  );
}
type Props = {
  month: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function CalendarGrid({ month, selectedDate, onSelectDate }: Props) {
  const matrix = getMonthMatrix(month);

  return (
    <div>
      <h1 className="font-medium text-2xl text-end mx-5 my-4 capitalize">{format(selectedDate, "LLLL", { locale: ru })}</h1>
      <div className="grid grid-cols-7 text-center text-sm text-gray-400">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {matrix.flat().map((day, i) => {
          const inMonth = isSameMonth(day, month);
          const selected = isSameDay(day, selectedDate);
          return (<>
          <button
              key={i}
              onClick={() => onSelectDate(day)}
              disabled={!inMonth}
              className={`
                h-10 rounded-lg text-sm transition-colors
                ${!inMonth && "text-gray-300"}
                ${isToday(day) && !selected && "font-bold"}
                ${selected && "bg-soft-blue"}
              `}
            >
              {format(day, "d")}
            </button>
            {/* <StatusActive isActive={true} /> */}
          </>            
          );
        })}
      </div>
    </div>
  );
}