import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./authContext";
import { scheduleService, type ScheduleCreate, type ScheduleResponse, type ScheduleUpdate } from "../shared/api/schedule";

interface ScheduleContextType {
  schedule: ScheduleResponse[];
  getSchedule: () => Promise<ScheduleResponse[]>;
  createSchedule: (formData: ScheduleCreate) => Promise<ScheduleResponse>;
  deleteSchedule: (value: string) => void;
  updateSchedule: (value: string, data: ScheduleUpdate) => Promise<ScheduleResponse>;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const { isAuth } = useAuth();
  const [schedule, setSchedule] = useState<ScheduleResponse[]>([]);

  const getSchedule = async (): Promise<ScheduleResponse[]> => {
    const data = await scheduleService.getScheduleEvents();
    setSchedule(data);
    return data;
  };

  const createSchedule = async (formData: ScheduleCreate): Promise<ScheduleResponse> => {
    const newEvent = await scheduleService.createScheduleEvent(formData);
    setSchedule((prevEvent) => [...prevEvent, newEvent]);
    return newEvent;
  };

  const deleteSchedule = async (scheduleId: string) => {
    await scheduleService.deleteScheduleEvent(scheduleId);
    setSchedule((prev) => prev.filter((c) => c.id !== scheduleId));
  };

  const updateSchedule = async (scheduleId: string, formData: ScheduleUpdate): Promise<ScheduleResponse> => {
    const updateEvent = await scheduleService.updateScheduleEvent(scheduleId, formData);
    setSchedule((prev) =>
      prev.map((c) => (c.id === scheduleId ? updateEvent : c))
    );
    return updateEvent;
  };

  useEffect(() => {
    if (isAuth) {
      getSchedule();
    }
    else {
      setSchedule([]);
    }
  }, [isAuth])

  return (
    <ScheduleContext.Provider
      value={{ schedule, getSchedule, createSchedule, deleteSchedule, updateSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within ScheduleProvider");
  }
  return context;
}

