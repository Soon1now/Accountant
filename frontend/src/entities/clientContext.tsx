import type { components } from "../shared/types/api.generated";

type Client = components['schemas']['ClientResponse']

export const clients: Client[] = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        first_name: 'Анна',
        last_name: 'Иванова',
        phone: '+7 (999) 123-45-67',
        telegram_username: '@anna_ivanova',
        notes: 'Любит капучино',
        is_active: true,
        created_at: '2026-10-12T10:00:00Z',
    },
    {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        first_name: 'Петр',
        last_name: 'Сидоров',
        phone: '+7 (999) 765-43-21',
        telegram_username: '@djjjdo',
        notes: null,
        is_active: false,
        created_at: '2026-09-15T14:30:00Z',
    },
    {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        first_name: 'Петр',
        last_name: 'Сидоров',
        phone: '+7 (999) 765-43-21',
        telegram_username: '@pss[wrpemcp',
        notes: null,
        is_active: false,
        created_at: '2026-09-15T14:30:00Z',
    },
    {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        first_name: 'Петр',
        last_name: 'Сидоров',
        phone: '+7 (999) 765-43-21',
        telegram_username: '@xskei',
        notes: null,
        is_active: false,
        created_at: '2026-09-15T14:30:00Z',
    },
    {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        first_name: 'Петр',
        last_name: 'Сидоров',
        phone: '+7 (999) 765-43-21',
        telegram_username: '@dppvk',
        notes: null,
        is_active: false,
        created_at: '2026-09-15T14:30:00Z',
    },
];