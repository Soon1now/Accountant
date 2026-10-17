// pages/SchedulePage.tsx
import { useState } from "react";
import { isSameDay, format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import CalendarGrid from "../shared/ui/CalendarGrid";
import EventCard from "../shared/ui/EventCard";
import { mockEvents } from "../entities/scheduleContext";

export default function SchedulePage() {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);

  const dayEvents = events.filter(e =>
    isSameDay(parseISO(e.start_time), selectedDate)
  );

  return (<>
    <main className="px-8 py-10.5">
      <h1 className="font-medium text-2xl">Расписание</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>

          <CalendarGrid
            month={month}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </section>

        <section className="md:mt-5">
          <h2 className="font-medium text-lg mb-3 capitalize">
            {format(selectedDate, "d MMMM, EEEE", { locale: ru })}
          </h2>

          {dayEvents.length === 0 ? (
            <p className="text-gray-400">Записей нет</p>
          ) : (
            <ul className="space-y-2">
              {dayEvents.map(e => <EventCard key={e.id} event={e} />)}
            </ul>
          )}
        </section>
      </div>

    </main>
  </>

  );
}