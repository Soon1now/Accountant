import type { components } from "../shared/types/api.generated";

type ScheduleEvent = components['schemas']['ScheduleEventResponse']

export const mockEvents: ScheduleEvent[] = [
  {
    id: "11111111-2222-4333-8444-555555550001",
    user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
    client_id: "550e8400-e29b-41d4-a716-446655440000",
    service_id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e004",
    start_time: "2026-10-13T10:00:00.000Z",
    end_time: "2026-10-13T11:00:00.000Z",
    is_completed: true,
    price_at_event: "1800.00",
    notes: "Стрижка с челкой, укладка",
    created_at: "2026-10-10T09:00:00.000Z",
  },
  {
    id: "11111111-2222-4333-8444-555555550002",
    user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
    client_id: "550e8400-e29b-41d4-a716-446655440000",
    service_id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e001",
    start_time: "2026-10-14T12:00:00.000Z",
    end_time: "2026-10-14T13:30:00.000Z",
    is_completed: true,
    price_at_event: "2200.00",
    notes: null,
    created_at: "2026-10-12T15:20:00.000Z",
  },
  {
    id: "11111111-2222-4333-8444-555555550003",
    user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
    client_id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    service_id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e005",
    start_time: "2026-10-15T14:00:00.000Z",
    end_time: "2026-10-15T14:40:00.000Z",
    is_completed: true,
    price_at_event: "900.00",
    notes: "Окрашивание хной",
    created_at: "2026-10-13T11:45:00.000Z",
  },
  {
    id: "11111111-2222-4333-8444-555555550004",
    user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
    client_id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    service_id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e003",
    start_time: "2026-10-15T16:00:00.000Z",
    end_time: "2026-10-15T19:00:00.000Z",
    is_completed: false,
    price_at_event: "5500.00",
    notes: "Сложное окрашивание, airtouch",
    created_at: "2026-10-14T10:10:00.000Z",
  }
];