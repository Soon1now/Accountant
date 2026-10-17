import { format, parseISO, intervalToDuration } from "date-fns";

export default function EventCard({ event }) {
    const start = parseISO(event.start_time);
    const end = parseISO(event.end_time);
    const duration = intervalToDuration({ start, end });

    return (
        <li className={`rounded-xl border p-3 transition-all hover:shadow-md ${event.is_completed && "opacity-60 border-gray-200"}`}>
            <div className="flex justify-between items-start">
                <span className="font-medium">
                    {format(start, "HH:mm")} – {format(end, "HH:mm")}
                    <span className="text-gray-400 font-normal">
                        {duration.hours > 0 && `  ${duration.hours} ч`}
                        {duration.minutes > 0 && (duration.hours > 0 ? ' ' : '') + `  ${duration.minutes} мин`}
                    </span>

                </span>
                <span className="text-blue font-medium">{Number(event.price_at_event)} ₽</span>
            </div>
            {event.notes && <p className="text-sm text-gray-500 mt-1">{event.notes}</p>}
            {event.is_completed && <span className="text-xs text-lime bg-blue px-1.5 py-0.5 rounded-full">Выполнено</span>}
        </li>
    );
}