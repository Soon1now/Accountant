import type { components } from "../shared/types/api.generated";

type Service = components['schemas']['ServiceResponse']

export const services: Service[] = [
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e001",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Маникюр",
        description: "Классический, комбинированный и аппаратный маникюр.",
        color: "#EC4899",
        is_active: true,
        created_at: "2026-10-01T09:30:00.000Z",
    },
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e002",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Педикюр",
        description: "Уход за стопами, покрытие гель-лаком и обработка ногтей.",
        color: "#8B5CF6",
        is_active: true,
        created_at: "2026-10-01T09:35:00.000Z",
    },
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e003",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Окрашивание волос",
        description: "Однотонное окрашивание, тонирование и сложные техники.",
        color: "#F97316",
        is_active: true,
        created_at: "2026-10-02T10:00:00.000Z",
    },
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e004",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Стрижка",
        description: "Женские, мужские и детские стрижки с укладкой.",
        color: "#3B82F6",
        is_active: true,
        created_at: "2026-10-02T10:20:00.000Z",
    },
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e005",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Оформление бровей",
        description: "Коррекция формы, окрашивание и долговременная укладка.",
        color: "#14B8A6",
        is_active: true,
        created_at: "2026-10-03T11:00:00.000Z",
    },
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e006",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Ламинирование ресниц",
        description: "Подкручивание, окрашивание и уход за натуральными ресницами.",
        color: "#06B6D4",
        is_active: false,
        created_at: "2026-10-03T11:30:00.000Z",
    },
    {
        id: "0f5f85e7-1bb3-4dc1-85e8-218c1bc1e007",
        user_id: "a1b2c3d4-e5f6-47a8-90b1-c2d3e4f5a6b7",
        name: "Массаж",
        description: null,
        color: "#22C55E",
        is_active: false,
        created_at: "2026-10-04T12:00:00.000Z",
    },
] 