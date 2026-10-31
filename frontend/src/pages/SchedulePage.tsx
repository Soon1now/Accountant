import { useState } from "react";
import { isSameDay, format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import CalendarGrid from "../shared/ui/CalendarGrid";
import EventCard from "../shared/ui/EventCard";
import { useSchedule } from "../entities/scheduleContext";
import Button from "../shared/ui/Button";
import type { ScheduleCreate, ScheduleResponse, ScheduleUpdate } from "../shared/api/schedule";
import { Modal } from "../shared/ui/Modal";
import { ScheduleForm } from "../features/ScheduleForm";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "edit"; schedule: ScheduleResponse };

export default function SchedulePage() {
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { schedule, createSchedule, updateSchedule, deleteSchedule } = useSchedule();
  const [modal, setModal] = useState<ModalState>({ type: "closed" });

  const dayEvents = schedule.filter(e =>
    isSameDay(e.date, selectedDate)
  );

  const handleSubmit = async (data: ScheduleCreate) => {
    // if (modal.type === "edit") {
    //   await updateSchedule(modal.schedule.id, data);
    // } else {
    await createSchedule(data);
    // }
    setModal({ type: "closed" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить событие?")) {
      deleteSchedule(id);
    }
  };
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

        <section className="md:mt-5 ">
          <div className="flex  items-center justify-between mb-3">
            <h2 className="font-medium text-lg mb-3 capitalize">
              {format(selectedDate, "d MMMM, EEEE", { locale: ru })}
            </h2>
            <Button onClick={() => setModal({ type: "create" })} text="Добавить"></Button>
          </div>


          {dayEvents.length === 0 ? (
            <p className="text-gray-400">Записей нет</p>
          ) : (
            <ul className="space-y-2">
              {dayEvents.map(e => <EventCard key={e.id} event={e} />)}
              
            </ul>
          )}
        </section>
      </div>
      <Modal
        isOpen={modal.type !== "closed"}
        onClose={() => setModal({ type: "closed" })}
        title={
          modal.type === "edit"
            ? "Редактировать событие"
            : "Добавить новое событие"
        }
      >
        <ScheduleForm
          initialData={modal.type === "edit" ? modal.schedule : undefined}
          onSubmitData={handleSubmit}
          onCancel={() => setModal({ type: "closed" })}
        />
      </Modal>
    </main >
  </>

  );
}