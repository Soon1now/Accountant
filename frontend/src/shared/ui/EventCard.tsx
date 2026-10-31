import { format, intervalToDuration } from "date-fns";

function combineDateAndTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.slice(0, 10).split("-").map(Number);
  const [hours, minutes, seconds = 0] = timeStr.slice(0, 8).split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

export default function EventCard({ event }) {
  const startAt = combineDateAndTime(event.date, event.start_time);
  let endAt = combineDateAndTime(event.date, event.end_time);

  if (endAt <= startAt) {
    endAt = new Date(endAt.getTime() + 24 * 60 * 60 * 1000);
  }

  const duration = intervalToDuration({ start: startAt, end: endAt });

  const timeRange = `${format(startAt, "HH:mm")} – ${format(endAt, "HH:mm")}`;

  const durationText = [
    duration.hours ? `${duration.hours} ч` : null,
    duration.minutes ? `${duration.minutes} мин` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={`rounded-xl border p-3 transition-all hover:shadow-md ${
        event.is_completed ? "opacity-60 border-gray-200" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="font-medium">
          {timeRange}
          {durationText && (
            <span className="text-gray-400 font-normal"> {durationText}</span>
          )}
        </span>
        <span className="text-blue font-medium">
          {Number(event.price_at_event)} ₽
        </span>
      </div>

      {event.notes && (
        <p className="text-sm text-gray-500 mt-1">{event.notes}</p>
      )}

      {event.is_completed && (
        <span className="text-xs text-lime bg-blue px-1.5 py-0.5 rounded-full">
          Выполнено
        </span>
      )}
    </li>
  );
}